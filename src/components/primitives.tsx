import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: {
      mystic: "from-[#A67CA3] to-[#D8A9D9]",      // Venus accent to highlight
      starlight: "from-[#FFD64D] to-[#FFFCEF]",   // Gold to cream
      cosmic: "from-[#725373] to-[#402B3E]",      // Plum to surface
      passion: "from-[#B91355] to-[#D8A9D9]",      // Punchy CTA gradient
    },
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl leading-9",
      lg: "text-4xl lg:text-6xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: ["mystic", "starlight", "cosmic", "passion"],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});
