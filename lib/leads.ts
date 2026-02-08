export type LeadKind = "audit" | "call" | string;

export interface Lead {
  id: string;
  kind: LeadKind;
  name: string;
  email: string;
  website?: string;
  message: string;
  createdAtMs: number;
}

export function isLead(v: unknown): v is Lead {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.kind === "string" &&
    typeof o.name === "string" &&
    typeof o.email === "string" &&
    typeof o.message === "string" &&
    typeof o.createdAtMs === "number"
  );
}
