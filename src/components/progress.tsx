import { percentTowards } from "@/utils";
import { useMemo } from "react";

export function Progress({
  count,
  total,
  presence,
}: {
  count: bigint;
  total: bigint;
  presence?: number;
}) {
  const { value, formatted } = useMemo(() => percentTowards(count, total), [count, total]);

  return (
    <div className="w-full bg-slate-200/10  rounded-full p-1 flex justify-between items-center relative">
      <span
        className="absolute inset-0 bg-slate-200/10 rounded-l-full"
        style={{ width: `${value > 0 ? value : 2.5}%` }}
      />
      <span className="text-xs px-3 text-slate-400 relative">{formatted}</span>
      {presence !== undefined && (
        <span className="text-xs px-3 text-slate-400 relative flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {presence <= 1
            ? "No other clickers"
            : `${presence - 1} other clicker${presence - 1 === 1 ? "" : "s"}`}
        </span>
      )}
    </div>
  );
}
