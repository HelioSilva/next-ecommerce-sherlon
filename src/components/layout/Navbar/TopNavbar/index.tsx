import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
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

const data: NavMenu = [
  {
    id: 1,
    label: "Loja",
    type: "MenuList",
    children: [
      {
        id: 10,
        label: "Acessórios",
        url: "/shop#acessorios",
        description:
          "Complete seu visual com acessórios exclusivos que destacam sua personalidade e estilo.",
      },
      {
        id: 11,
        label: "Anéis",
        url: "/shop#aneis",
        description:
          "Descubra anéis sofisticados para eternizar momentos especiais e valorizar cada detalhe.",
      },
      {
        id: 12,
        label: "Berloques",
        url: "/shop#berloques",
        description:
          "Personalize sua pulseira com berloques únicos que contam a sua história.",
      },
      {
        id: 13,
        label: "Braceletes",
        url: "/shop#braceletes",
        description:
          "Braceletes modernos e elegantes para complementar qualquer ocasião.",
      },
      {
        id: 14,
        label: "Brincos",
        url: "/shop#brincos",
        description:
          "Brincos delicados e marcantes para realçar sua beleza todos os dias.",
      },
      {
        id: 15,
        label: "Conjuntos",
        url: "/shop#conjuntos",
        description:
          "Conjuntos harmoniosos para presentear ou renovar seu porta-joias com muito charme.",
      },
      {
        id: 16,
        label: "Correntes",
        url: "/shop#correntes",
        description:
          "Correntes versáteis e estilosas para compor looks autênticos e sofisticados.",
      },
    ],
  },
  // {
  //   id: 2,
  //   type: "MenuItem",
  //   label: "On Sale",
  //   url: "/shop#on-sale",
  //   children: [],
  // },
  {
    id: 3,
    type: "MenuItem",
    label: "Novidades",
    url: "/shop#novidades",
    children: [],
  },
  // {
  //   id: 4,
  //   type: "MenuItem",
  //   label: "Brands",
  //   url: "/shop#brands",
  //   children: [],
  // },
];

const TopNavbar = () => {
  return (
    <nav className=" sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center ">
          <div className="block md:hidden mr-3 ">
            <ResTopNavbar data={data} />
          </div>
          <p className="mr-3 md:mr-20  md:w-[300px]  ">
            <img src="logo-pgn-ini.svg" alt="" />
          </p>
          {/* <Link
            href="/"
            className={cn([
              integralCF.className,
              "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-20",
            ])}
          >
            {nameStore}
          </Link> */}
        </div>
        <NavigationMenu className=" text-2xl hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            {data.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <MenuItem label={item.label} url={item.url} />
                )}
                {item.type === "MenuList" && (
                  <MenuList data={item.children} label={item.label} />
                )}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <InputGroup className="hidden md:flex bg-[#F0F0F0] mr-3 lg:mr-10">
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
          />
        </InputGroup>
        <div className="flex items-center">
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
          <Link href="/#signin" className="p-1">
            <Image
              priority
              src="/icons/user.svg"
              height={100}
              width={100}
              alt="user"
              className="max-w-[22px] max-h-[22px]"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
