"use client";

import { useState } from "react";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Forms() {
  const [isRegisterUser, setIsRegisterUser] = useState(false);

  function getForm() {
    if (isRegisterUser) {
      return <Register setIsRegisterUser={setIsRegisterUser} />;
    }

    return <LogIn setIsRegisterUser={setIsRegisterUser} />;
  }

  return (
    <>
      {getForm()}
      <ToastContainer />
    </>
  );
}
