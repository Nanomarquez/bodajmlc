"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { HostSlug } from "@/lib/config";
import { getHostCouple, getOrderedCouples } from "@/lib/couples";

const HostContext = createContext<HostSlug>(null);

export function HostProvider({
  host,
  children,
}: {
  host: HostSlug;
  children: ReactNode;
}) {
  return <HostContext.Provider value={host}>{children}</HostContext.Provider>;
}

export function useHost(): HostSlug {
  return useContext(HostContext);
}

export function useOrderedCouples() {
  return getOrderedCouples(useHost());
}

export function useHostCouple() {
  return getHostCouple(useHost());
}
