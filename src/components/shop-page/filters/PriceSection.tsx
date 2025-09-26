import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { useBuscarPorDescricao } from "@/lib/hooks/useBuscarPorDescricao";

const PriceSection = () => {
  const [valor, setValor] = useState<[number, number]>([0, 10000]);
  const { setVlorMax, setVlorMin, resetFiltroPreco, setResetFiltroPreco } =
    useBuscarPorDescricao();

  const handleChangeValues = (values: number[]) => {
    setValor([values[0], values[1]]);
    setVlorMin(values[0]);
    setVlorMax(values[1]);
  };

  useEffect(() => {
    if (resetFiltroPreco) {
      setValor([0, 10000]);
      setResetFiltroPreco(false);
    }
  }, [resetFiltroPreco]);

  return (
    <Accordion type="single" collapsible defaultValue="filter-price">
      <AccordionItem value="filter-price" className="border-none">
        <AccordionTrigger className="text-[#685048] font-bold text-xl hover:no-underline p-0 py-0.5">
          Preço
        </AccordionTrigger>
        <AccordionContent className="pt-4" contentClassName="overflow-visible">
          <Slider
            defaultValue={[0, 10000]}
            min={0}
            max={10000}
            step={50}
            label="R$"
            color="#685048"
            value={valor}
            onValueChange={handleChangeValues}
          />
          <div className="mb-3" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSection;
