"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import { ItemCategoria } from "@/types/itemCategories.types";
import { useRouter } from "next/navigation";
import { useBuscarPorDescricao } from "@/lib/hooks/useBuscarPorDescricao";

export const TopNavBarPage = ({
  categories,
}: {
  categories: ItemCategoria[];
}) => {
  const router = useRouter();
  const [txtFiltro, setTextFiltro] = useState("");

  const realizarPesquisa = () => {
    console.log("realizarPesquisa");
    if (txtFiltro.trim() != "") router.push(`/?busca=${txtFiltro}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") realizarPesquisa();
  };

  const handleMouseClick = () => {
    realizarPesquisa();
  };

  const { resetFiltroBusca, setResetFiltroBusca } = useBuscarPorDescricao();
  useEffect(() => {
    console.log("txtfiltro" + txtFiltro);
    if (resetFiltroBusca == true) {
      setTextFiltro("");
      setResetFiltroBusca(false);
      console.log("limpou txt");
    }
  }, [resetFiltroBusca]);

  return (
    <nav className=" sticky top-0 bg-white z-20">
      <div
        className="
          flex flex-col md:flex-row         
          relative max-w-frame mx-auto
          items-center md:items-center
          justify-between md:justify-start
          pt-3 md:py-6 px-4 xl:px-0
        "
      >
        {/* Logo e menu mobile */}
        <div className="flex items-center">
          <div className="block md:hidden mr-3">
            <ResTopNavbar
              data={[
                {
                  id: 1,
                  label: "Categorias",
                  type: "MenuList",
                  children: categories,
                },
                {
                  id: 3,
                  type: "MenuItem",
                  label: "Novidades",
                  url: "/shop?categoria=Novidades",
                  children: [],
                },
              ]}
            />
          </div>
          <Link href="/" className="mr-3 md:mr-20  md:w-[300px]  ">
            <img src="/images/logo-pgn-ini.svg" alt="" />
          </Link>
          <div className="block md:hidden">
            <CartBtn />
          </div>
        </div>

        {/* Menu dos dispositivos large */}
        <NavigationMenu className="text-2xl hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            <MenuList data={categories} label={"Categorias"} />
            <MenuItem label={"Novidades"} url={"/shop?categoria=Novidades"} />
          </NavigationMenuList>
        </NavigationMenu>
        <div className="w-full justify-items-center mb-2 md:justify-items-start">
          {/* InputGroup de busca - único, responsivo */}
          <InputGroup
            className="
            w-[90%]                   
            md:w-[98%]    
            bg-[#F0F0F0] rounded-md flex
          "
          >
            <InputGroup.Input
              type="search"
              name="search"
              placeholder="Buscar produtos..."
              className="bg-transparent placeholder:text-black/40"
              value={txtFiltro}
              onChange={(e) => setTextFiltro(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <InputGroup.Text>
              <img
                src="/icons/search-black.svg"
                height={20}
                width={20}
                alt="search"
                className="min-w-5 min-h-5"
                onClick={handleMouseClick}
              />
            </InputGroup.Text>
          </InputGroup>
        </div>

        <div className="hidden sm:flex ">
          <CartBtn />
        </div>
      </div>
    </nav>
  );
};
