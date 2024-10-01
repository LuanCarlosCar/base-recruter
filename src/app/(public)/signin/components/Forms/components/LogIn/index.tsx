"use client";

import { logInUser } from "@/services/log-in";
import { Archivo } from "next/font/google";
import { useRouter } from "next/navigation";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { toast } from "react-toastify";

const archivo = Archivo({
  weight: ["500", "600"],
  subsets: ["latin"],
  display: "swap",
});

interface Props {
  setIsRegisterUser: Dispatch<SetStateAction<boolean>>;
}

export default function LogIn({ setIsRegisterUser }: Props) {
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const formData = {
      email: form.get("email") as string,
      password: form.get("password") as string,
    };

    try {
      const response = await logInUser(formData);

      document.cookie = `token=${response.token}; path=/; max-age=3600; Secure; SameSite=Strict`;

      router.push("/home");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`text-black1 ${archivo.className} font-medium  min-w-[25rem] max-w-[25rem]`}
    >
      <p className=" text-xl font-semibold">Bem-vindo de volta</p>
      <p className=" text-sizebasel mb-10">Faça login na sua conta</p>

      <div className="mb-5">
        <label className="font-normal block mb-2">E-mail</label>
        <input
          className=" h-[3.125rem] bg-[#F7FAFC] p-4 w-[100%] border-solid border border-[#E8E8E8] rounded"
          type="email"
          name="email"
          placeholder="Digite seu email"
          required
        />
      </div>

      <div className="mb-6">
        <label className="font-normal block mb-2">Senha</label>

        <input
          className="h-[3.125rem] bg-[#F7FAFC] p-4 w-[100%] border-solid border border-[#E8E8E8] rounded"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          <label className=" text-base font-medium">Lembrar de mim </label>
        </div>

        <label className="text-blueSegund text-base font-medium">
          Esqueceu sua senha?
        </label>
      </div>

      <div className="mt-10">
        <button
          type="submit"
          className=" leading-none h-[3.25rem] text-center text-lg p-4 text-white w-[100%]  bg-blueSegund font-semibold mb-6  rounded hover:text-blueSegund border hover:bg-white hover:border-blueSegund transition duration-300 ease-in-out"
        >
          Entrar na conta
        </button>
        <button
          onClick={() => setIsRegisterUser(true)}
          className=" leading-none h-[3.25rem] text-center text-lg p-4 text-white w-[100%] bg-[#1A202C] font-semibold rounded border hover:text-[#1A202C] hover:bg-white hover:border-[#1A202C] transition duration-300 ease-in-out"
        >
          Criar conta
        </button>
      </div>
    </form>
  );
}
