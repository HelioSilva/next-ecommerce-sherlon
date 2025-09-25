"use client";

import { cn, toCapitalCase } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { NavMenu } from "../navbar.types";
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
import { nameStore } from "@/const/name";
import { useCategories } from "@/lib/hooks/useCategories";
import { useBuscarPorDescricao } from "@/lib/hooks/useBuscarPorDescricao";

type ItemCategoria = {
  id: number;
  label: string;
  url: string;
  description: string;
};

const TopNavbar = () => {
  const { setDescricao } = useBuscarPorDescricao();
  const { categorias } = useCategories();

  const getCategorias = (): ItemCategoria[] => {
    return categorias.map((cat, index) => ({
      id: index,
      label: toCapitalCase(cat),
      url: `/shop?categoria=${cat.toLowerCase().replace(/\s+/g, "-")}`,
      description: "",
    }));
  };

  return (
    <nav className=" sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center ">
          <div className="block md:hidden mr-3 ">
            {/* <ResTopNavbar data={data} /> */}
          </div>
          <Link href="/" className="mr-3 md:mr-20  md:w-[300px]  ">
            <img src="/images/logo-pgn-ini.svg" alt="" />
          </Link>
        </div>
        <NavigationMenu className="text-2xl hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            <MenuList data={getCategorias()} label={"Categorias"} />
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
            />
          </InputGroup.Text>
          <InputGroup.Input
            type="search"
            name="search"
            placeholder="Buscar produtos..."
            className="bg-transparent placeholder:text-black/40"
            onChange={(e) => setDescricao(e.target.value)}
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

export default TopNavbar;
