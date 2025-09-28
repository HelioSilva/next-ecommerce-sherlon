import { Frown } from "lucide-react";

export const ProductNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
      <Frown className="w-12 h-12 mb-3 text-gray-400" />
      <p className="text-lg font-medium">{"Nenhum produto encontrado"}</p>
      <p className="text-sm text-gray-400">
        Tente ajustar o filtro ou buscar outro termo.
      </p>
    </div>
  );
};
