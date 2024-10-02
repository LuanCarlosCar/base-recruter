"use client";
import { createEnterprise, getEnterprises } from "@/services/enterprise";
import { createUser } from "@/services/user";
import { CustomError, OptionType } from "@/types/common";
import { Archivo } from "next/font/google";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";

const archivo = Archivo({
  weight: ["500", "600"],

  subsets: ["latin"],
  display: "swap",
});

interface Props {
  setIsRegisterUser: Dispatch<SetStateAction<boolean>>;
}

export default function Register({ setIsRegisterUser }: Props) {
  const [optionEnterprise, setOptionEnterprise] = useState<OptionType>(
    {} as OptionType
  );
  const [optionsEnterprise, setOptionsEnterprise] = useState<
    { label: string; value: string }[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const res = await getEnterprises();

    const normalizedRes = res.map((item) => ({
      label: item.empresa,
      value: item.id,
    }));

    setOptionsEnterprise(normalizedRes);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!optionEnterprise?.label) {
      return toast.error("Selecione uma empresa!");
    }
    const form = new FormData(e.currentTarget);

    const formData = {
      email: form.get("email") as string,
      password: form.get("password") as string,
      nome: form.get("nome") as string,
      sobrenome: form.get("sobrenome") as string,
      idEmpresa: optionEnterprise.value as string,
    };

    try {
      const response = await createUser(formData);

      document.cookie = `token=${response.token}; path=/; max-age=3600; Secure; SameSite=Strict`;

      router.push("/home");
    } catch (error) {
      toast.error((error as CustomError).message);
    }
  }
  async function handleSelectEnterprise(newOption: OptionType | null) {
    if (newOption?.__isNew__) {
      try {
        const res = await createEnterprise({ empresa: newOption.label });

        setOptionsEnterprise([
          ...optionsEnterprise,
          {
            label: newOption.label,
            value: res.id,
          },
        ]);

        setOptionEnterprise({
          label: newOption.label,
          value: res.id,
        });
        return;
      } catch (error) {
        toast.error((error as CustomError).message);
      }
    }
    setOptionEnterprise(newOption || ({} as OptionType));
  }
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,

      height: "3.25rem",
    }),
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`text-black1 ${archivo.className} font-medium min-w-[25rem] max-w-[25rem] `}
    >
      <p className=" text-xl font-semibold">Bem-vindo</p>
      <p className=" text-sizebasel mb-10">Crie sua conta e aproveite!</p>

      <div className="mb-5">
        <label className="font-normal block mb-2">Nome</label>
        <input
          className=" h-[3.125rem] bg-[#F7FAFC] p-3 w-[100%] border-solid border border-[#E8E8E8] rounded"
          type="text"
          name="nome"
          placeholder="Digite seu nome"
          required
        />
      </div>

      <div className="mb-5">
        <label className="font-normal block mb-2">Sobrenome</label>
        <input
          className=" h-[3.125rem] bg-[#F7FAFC] p-3 w-[100%] border-solid border border-[#E8E8E8] rounded"
          type="text"
          name="sobrenome"
          placeholder="Digite seu sobrenome"
          required
        />
      </div>

      <div className="mb-5">
        <label className="font-normal block mb-2">E-mail</label>
        <input
          className=" h-[3.125rem] bg-[#F7FAFC] p-3 w-[100%] border-solid border border-[#E8E8E8] rounded"
          type="email"
          name="email"
          placeholder="Digite seu email"
          required
        />
      </div>

      <div className="mb-5">
        <label className="font-normal block mb-2">Empresa</label>

        <CreatableSelect
          isClearable
          options={optionsEnterprise}
          styles={customStyles}
          value={optionEnterprise}
          onChange={handleSelectEnterprise}
          placeholder="Selecione ou crie a empresa"
        />
      </div>

      <div className="mb-6">
        <label className="font-normal block mb-2">Senha</label>

        <input
          className="h-[3.125rem] bg-[#F7FAFC] p-3 w-[100%] border-solid border border-[#E8E8E8] rounded"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          required
        />
      </div>

      <div className="mt-10">
        <button
          type="submit"
          className=" leading-none h-[3.25rem] text-center text-lg p-3 text-white w-[100%]  bg-blueSegund font-semibold mb-6 rounded border hover:text-blueSegund hover:bg-white hover:border-blueSegund transition duration-300 ease-in-out"
        >
          Cadastrar
        </button>
        <button
          onClick={() => setIsRegisterUser(false)}
          className=" leading-none h-[3.25rem] text-center text-lg p-3 text-white w-[100%] bg-[#1A202C] font-semibold rounded border hover:text-[#1A202C] hover:bg-white hover:border-[#1A202C] transition duration-300 ease-in-out"
        >
          Entre com conta existente
        </button>
      </div>
    </form>
  );
}
