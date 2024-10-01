import Image from "next/image";
import profilePic from "../../assets/imgs/tec-recruter.jpg";
import Forms from "./components/Forms";

export default function signin() {
  return (
    <div className="max-h-screen min-h-screen flex bg-white">
      <section className="min-w-[50vw] max-w-[50vw] max-lg:hidden">
        <Image
          src={profilePic}
          alt="Image drawing of stick figures looking at the computer"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </section>

      <section className="min-w-[50vw] max-w-[50vw]  max-lg:min-w-[100vw]  max-lg:max-w-[100vw] flex justify-center items-center bg-blueOne">
        <Forms />
      </section>
    </div>
  );
}
