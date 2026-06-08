"use client";

import { useState } from "react";
import Modal from "../../components/modal/modal";
import LoginForm from "../..//components/login/loginForm";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Fazer login</button>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <LoginForm onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  );
}
