export const FUNDS = [
  { value: "tithe", label: "Tithe" },
  { value: "offering", label: "Offering" },
  { value: "building", label: "Building Fund" },
  { value: "missions", label: "Missions" },
  { value: "other", label: "Other" },
] as const;

export type FundValue = (typeof FUNDS)[number]["value"];

export function fundLabel(value: string): string {
  return FUNDS.find((fund) => fund.value === value)?.label ?? value;
}
