"use client";

import React, { createContext, useContext, useState } from "react";

interface LeadContextType {
  isOpen: boolean;
  openLeadModal: () => void;
  closeLeadModal: () => void;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openLeadModal = () => setIsOpen(true);
  const closeLeadModal = () => setIsOpen(false);

  return (
    <LeadContext.Provider
      value={{ isOpen, openLeadModal, closeLeadModal }}
    >
      {children}
    </LeadContext.Provider>
  );
}

export function useLead() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error("useLead must be used within a LeadProvider");
  }
  return context;
}
