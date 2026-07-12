import { memo } from "react";

type LogoItemProps = {
  label: string;
  description: string;
};

function LogoItemComponent({ label, description }: LogoItemProps) {
  return (
    <div
      className="
    glass
    group
    flex
    h-28
    w-44
    flex-col
    items-center
    justify-center
    rounded-3xl
    border
    border-border/60
    px-6
    py-6
    backdrop-blur-md
   hover:shadow-premium
    transition-all
    duration-300
    hover:-translate-y-2
    hover:scale-[1.02]
    hover:border-primary/50
  "
    >
      <h3
        className="
      text-lg
      font-bold
      transition-colors
      duration-300
      group-hover:text-primary
    "
      >
        {label}
      </h3>

      <p className="mt-2 text-center text-sm text-muted-foreground/80">
        {description}
      </p>
    </div>
  );
}

export const LogoItem = memo(LogoItemComponent);
