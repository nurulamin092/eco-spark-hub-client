type Props = {
  title: string;
  description: string;
};

export function SectionHeader({ title, description }: Props) {
  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>

      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
