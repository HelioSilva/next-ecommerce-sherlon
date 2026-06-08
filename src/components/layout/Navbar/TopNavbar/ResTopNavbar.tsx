import React, { useEffect, useState } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { NavMenu } from "../navbar.types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { nameStore } from "@/const/name";
import Modal from "@/components/modal/modal";
import LoginForm from "@/components/login/loginForm";

const ResTopNavbar = ({ data }: { data: NavMenu }) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild className="cursor-pointer">
        <img
          src="/icons/menu.svg"
          height={100}
          width={100}
          alt="menu"
          className="max-w-[22px] max-h-[22px]"
        />
      </SheetTrigger>

      <SheetContent side="left" className="">
        <SheetHeader className="mb-10 ">
          <SheetTitle asChild>
            <SheetClose asChild>
              <Link
                href="/"
                className={cn([integralCF.className, "text-2xl "])}
              >
                {nameStore}
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        <div className="h-[90%] flex flex-col justify-between overflow-y-auto ">
          <div className="flex flex-col items-start ">
            {data.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <SheetClose asChild>
                    <Link href={item.url ?? "/"} className="mb-4">
                      {item.label}
                    </Link>
                  </SheetClose>
                )}

                {item.type === "MenuList" && (
                  <div className="mb-4 w-full ">
                    <Accordion type="single" collapsible>
                      <AccordionItem
                        value={item.label}
                        className="border-none "
                      >
                        <AccordionTrigger className="text-left p-0 py-0.5 font-normal text-base ">
                          {item.label}
                        </AccordionTrigger>

                        <AccordionContent className="p-4 pb-0 border-l flex flex-col ">
                          {item.children.map((itemChild, idx) => (
                            <SheetClose
                              key={itemChild.id}
                              asChild
                              className="w-fit py-2 text-base"
                            >
                              <Link href={itemChild.url ?? "/"}>
                                {itemChild.label}
                              </Link>
                            </SheetClose>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <button
            onClick={() => {
              // setSheetOpen(false);
              setTimeout(() => {
                setModalOpen(true); // abre modal depois
              }, 150);
            }}
            className="bg-[#685048] text-white w-full py-1 rounded text-center"
          >
            Admin
          </button>

          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <LoginForm
              onSuccess={() => {
                setModalOpen(false); // fecha modal
                setSheetOpen(false); // garante fechado
                // router.push("/admin");
              }}
            />
          </Modal>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResTopNavbar;
