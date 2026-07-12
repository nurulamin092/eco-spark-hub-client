import { LogoItem } from "./LogoItem";

const LOGOS = [
  {
    name: "GitHub",
    description: "Open Source Collaboration",
  },
  {
    name: "Google",
    description: "Technology Innovation",
  },
  {
    name: "Microsoft",
    description: "AI & Cloud Solutions",
  },
  {
    name: "Tesla",
    description: "Clean Energy",
  },
  {
    name: "WWF",
    description: "Nature Conservation",
  },
  {
    name: "UNICEF",
    description: "Global Impact",
  },
];

export function LogoCloud() {
  return (
    <section className=" relative pt-10 pb-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Heading */}
        <div className="animate-fade-in-up mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Trusted Worldwide
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Trusted by Innovators Worldwide
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Thousands of creators, environmental enthusiasts, researchers, and
            organizations collaborate on EcoSpark Hub to build a more
            sustainable future.
          </p>
        </div>

        {/* Logo Grid */}
        <div className="animate-fade-in-up delay-200 flex flex-wrap items-center justify-center gap-6 lg:gap-8">
          {LOGOS.map((logo) => (
            <LogoItem
              key={logo.name}
              label={logo.name}
              description={logo.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
