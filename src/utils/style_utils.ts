export function composeClassNames(
  ...args: (string | null | undefined)[]
): string {
  return args.filter((c) => c).join(" ");
}
