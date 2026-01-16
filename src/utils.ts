export function factorialBig(n: bigint) {
  let f = 1n;
  for (let i = 2n; i <= n; i++) f *= i;
  return f;
}

export function percentTowards(current: bigint, total: bigint, decimals = 4) {
  const scale = 10n ** BigInt(decimals);
  const scaled = (current * 100n * scale) / total; // integer percent * scale

  const whole = scaled / scale;
  const frac = (scaled % scale).toString().padStart(decimals, "0");
  const value = Number(scaled) / Number(scale);
  const formatted = `${whole}.${frac}%`;
  return { value, formatted };
}

export function formatNumber(n: bigint) {
  const s = n.toString();
  const sign = s.startsWith("-") ? "-" : "";
  const digits = sign ? s.slice(1) : s;
  return sign + digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",").trim();
}
