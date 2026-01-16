import { percentTowards } from "@/utils";
import { useMemo } from "react";

export function Progress({ count, total }: { count: bigint; total: bigint }) {
  const { value, formatted } = useMemo(() => percentTowards(count, total), [count, total]);

  return (
    <div className="w-full bg-slate-200/10  rounded-full p-1 flex justify-between items-center relative">
      <span
        className="absolute inset-0 bg-slate-200/10 rounded-l-full"
        style={{ width: `${value > 0 ? value : 2.5}%` }}
      />
      <span className="text-xs px-3 text-slate-400">{formatted}</span>
    </div>
  );
}
