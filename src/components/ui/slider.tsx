"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn, formatarPreco } from "@/lib/utils";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  min: number;
  max: number;
  step?: number;
  value: [number, number]; // 🔥 sempre controlado
  onValueChange: (values: [number, number]) => void;
  label?: string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    { className, min, max, step = 1, value, onValueChange, label, ...props },
    ref
  ) => {
    return (
      <div className="w-full relative">
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex w-full touch-none select-none items-center",
            className
          )}
          min={min}
          max={max}
          step={step}
          value={value}
          onValueChange={(newValues) =>
            onValueChange([newValues[0], newValues[1]])
          }
          {...props}
        >
          <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
            <SliderPrimitive.Range className="absolute h-full bg-[#685048]" />
          </SliderPrimitive.Track>

          {/* Label Thumb 1 */}
          <div
            className="absolute -translate-x-1/2 -bottom-8 text-xs font-medium px-2 py-1 rounded z-10"
            style={{
              left: `${((value[0] - min) / (max - min)) * 100}%`,
            }}
          >
            {`${formatarPreco(value[0])}`}
          </div>
          <SliderPrimitive.Thumb className="relative block h-4 w-4 rounded-full border border-[#685048] bg-[#685048] shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />

          {/* Label Thumb 2 */}
          <div
            className="absolute -translate-x-1/2 -bottom-8 text-xs font-medium px-2 py-11 rounded z-10"
            style={{
              left: `${((value[1] - min) / (max - min)) * 100}%`,
            }}
          >
            {`${formatarPreco(value[1])}`}
          </div>
          <SliderPrimitive.Thumb className="relative block h-4 w-4 rounded-full border border-[#685048] bg-[#685048] shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
        </SliderPrimitive.Root>
        {/* <p>Valor mínimo: XX</p>
        <p>Valor mínimo: XX</p> */}
      </div>
    );
  }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
