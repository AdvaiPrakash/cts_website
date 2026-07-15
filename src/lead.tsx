"use client";

import React, { createContext, useContext, useState } from "react";

interface LeadContextType {
  isOpen: boolean;
  openLeadModal: () => void;
  closeLeadModal: () => void;
  isEnrollOpen: boolean;
  enrollCourseId: string;
  openEnrollModal: (courseId?: string) => void;
  closeEnrollModal: () => void;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [enrollCourseId, setEnrollCourseId] = useState("");

  const openLeadModal = () => setIsOpen(true);
  const closeLeadModal = () => setIsOpen(false);

  const openEnrollModal = (courseId?: string) => {
    setEnrollCourseId(courseId || "");
    setIsEnrollOpen(true);
  };
  const closeEnrollModal = () => {
    setIsEnrollOpen(false);
    setEnrollCourseId("");
  };

  return (
    <LeadContext.Provider
      value={{
        isOpen,
        openLeadModal,
        closeLeadModal,
        isEnrollOpen,
        enrollCourseId,
        openEnrollModal,
        closeEnrollModal,
      }}
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
