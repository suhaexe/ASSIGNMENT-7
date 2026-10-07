export function getBnDate(): string {
  const now = new Date();
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
  ];
  return `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
}


export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function getChangeColor(change: number) {
  if (change > 0) return "text-red-600 bg-red-50 border-red-100";
  if (change < 0) return "text-green-600 bg-green-50 border-green-100";
  return "text-gray-500 bg-gray-50 border-gray-100";
}

export function getChangeArrow(change: number) {
  if (change > 0) return "▲";
  if (change < 0) return "▼";
  return "—";
}