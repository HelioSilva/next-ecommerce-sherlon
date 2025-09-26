import { serviceGetCategories } from "@/lib/services/products.service";
import { TopNavBarPage } from "./Page";
import { ItemCategoria } from "@/types/itemCategories.types";
import { toCapitalCase } from "@/lib/utils";

const TopNavbar = async () => {
  const categorias = await serviceGetCategories();

  const getCategorias = (): ItemCategoria[] => {
    return categorias.map((cat, index) => ({
      id: index,
      label: toCapitalCase(cat),
      url: `/shop?categoria=${cat.toLowerCase().replace(/\s+/g, "-")}`,
      description: "",
    }));
  };

  return <TopNavBarPage categories={getCategorias()} />;
};

export default TopNavbar;
