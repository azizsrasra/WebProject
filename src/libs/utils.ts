// Merges class names safely
export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}
