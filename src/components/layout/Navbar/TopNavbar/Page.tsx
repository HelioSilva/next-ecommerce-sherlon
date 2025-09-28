"use client";

import Link from "next/link";
import React, { useState } from "react";
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

export const TopNavBarPage = ({
  categories,
}: {
  categories: ItemCategoria[];
}) => {
  const router = useRouter();
  const [txtFiltro, setTextFiltro] = useState("");

  const realizarPesquisa = () => {
    if (txtFiltro.trim() != "") router.push(`/?busca=${txtFiltro}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") realizarPesquisa();
  };

  const handleMouseClick = () => {
    realizarPesquisa();
  };

  return (
    <nav className=" sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center ">
          <div className="block md:hidden mr-3 ">
            {/* Menu dos dispositivos móveis */}
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
        </div>
        {/* Menu dos dispositivos large */}
        <NavigationMenu className="text-2xl hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            <MenuList data={categories} label={"Categorias"} />
            <MenuItem label={"Novidades"} url={"/shop?categoria=Novidades"} />
          </NavigationMenuList>
        </NavigationMenu>
        <InputGroup className=" hidden md:flex bg-[#F0F0F0] mr-3 lg:mr-10">
          <InputGroup.Text>
            <Image
              priority
              src="/icons/search.svg"
              height={20}
              width={20}
              alt="search"
              className="min-w-5 min-h-5"
              onClick={handleMouseClick}
            />
          </InputGroup.Text>
          <InputGroup.Input
            type="search"
            name="search"
            placeholder="Buscar produtos..."
            className="bg-transparent placeholder:text-black/40"
            onChange={(e) => setTextFiltro(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </InputGroup>
        <div className="flex items-center ">
          <Link href="/search" className="block md:hidden mr-[14px] p-1">
            <Image
              priority
              src="/icons/search-black.svg"
              height={100}
              width={100}
              alt="search"
              className="max-w-[22px] max-h-[22px]"
            />
          </Link>
          <CartBtn />
          {/* <Link href="/#signin" className="p-1">
            <Image
              priority
              src="/icons/user.svg"
              height={100}
              width={100}
              alt="user"
              className="max-w-[22px] max-h-[22px]"
            />
          </Link> */}
        </div>
      </div>
    </nav>
  );
};
