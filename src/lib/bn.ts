const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBn(input: string | number): string {
  const str = typeof input === "number" ? input.toString() : input;

  return str.replace(/[0-9]/g, (digit) => BN_DIGITS[Number(digit)]);
}

export function bnMoney(value: number): string {
  const formatted = value.toLocaleString("en-IN");
  return toBn(formatted);
}

export function bnPercent(value: number): string {
  const abs = Math.abs(value).toFixed(1);
  return `${toBn(abs)}%`;
}

export function bnPrice(value: number): string {
  return `${bnMoney(value)} টাকা`;
}
