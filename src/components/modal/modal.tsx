import React, { useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // No Android, fixar o body funciona melhor com position em vez de apenas overflow hidden
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Função para lidar com o foco dos inputs no Android/iOS
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      // Verifica se o elemento focado é um input ou textarea
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        setTimeout(() => {
          target.scrollIntoView({
            behavior: "smooth",
            block: "center", // Centraliza o input na área visível
          });
        }, 200); // Pequeno delay para o teclado do Android terminar de subir
      }
    };

    const container = modalRef.current;
    container.addEventListener("focusin", handleFocusIn);

    return () => {
      container.removeEventListener("focusin", handleFocusIn);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center h-[100dvh] w-screen overflow-y-auto p-4"
    >
      {/* Background escuro */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* O modal */}
      <div
        className="relative z-10 bg-white p-6 rounded-xl w-[90%] max-w-2xl 
                      min-h-[350px] max-h-full overflow-y-auto shadow-xl md:h-[500px]"
      >
        {children}
      </div>
    </div>
  );
}
