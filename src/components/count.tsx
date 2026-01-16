import { AnimateNumber } from "@/components/motion";

export function Count({ count }: { count: number }) {
  return (
    <AnimateNumber
      className="text-2xl font-bold font-mono tracking-wider flex items-baseline gap-2 [&_.number-section-post]:text-sm [&_.number-section-post]:text-slate-400 [&_.number-section-post]:mt-auto [&_.number-section-post]:ms-2"
      suffix="times"
    >
      {count}
    </AnimateNumber>
  );
}
