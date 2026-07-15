"use client";

import { useState, useEffect } from "react";
import { ResponsiveTable } from "@/components/admin/ResponsiveTable";
import { deleteLeadAction } from "@/app/admin/actions";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: string;
  createdAt: string;
}

export default function EnquiriesListPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLeads(data);
        }
      })
      .catch((err) => console.error("Error loading enquiries:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await deleteLeadAction(id);
      if (res.success) {
        setLeads((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(res.error || "Failed to delete enquiry");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred");
    }
  };

  const headers = [
    {
      key: "name" as keyof Lead,
      label: "Client Name",
      render: (item: Lead) => (
        <span className="font-semibold text-text-page">
          {item.name}
        </span>
      ),
    },
    {
      key: "email" as keyof Lead,
      label: "Email Address",
      render: (item: Lead) => (
        <a href={`mailto:${item.email}`} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
          {item.email}
        </a>
      ),
    },
    {
      key: "phone" as keyof Lead,
      label: "Phone Number",
      render: (item: Lead) => (
        <span className="text-xs text-text-page/60">{item.phone || "—"}</span>
      ),
    },
    {
      key: "source" as keyof Lead,
      label: "Enquiry Source",
      render: (item: Lead) => {
        let badgeColor = "bg-neutral-100 text-neutral-800 border-neutral-200 dark:bg-neutral-800/40 dark:text-neutral-400 dark:border-neutral-700/50";
        let displaySource = item.source;

        if (item.source.toLowerCase().includes("contact")) {
          badgeColor = "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/10 dark:text-blue-400 dark:border-blue-800/30";
          displaySource = "Contact Page";
        } else if (item.source.toLowerCase().includes("modal")) {
          badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/10 dark:text-emerald-400 dark:border-emerald-800/30";
          displaySource = "Consultation CTA";
        } else if (item.source.toLowerCase().includes("course") || item.source.toLowerCase().includes("feature")) {
          badgeColor = "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/10 dark:text-purple-400 dark:border-purple-800/30";
          displaySource = `Course: ${item.source.split(":").pop() || item.source}`;
        }

        return (
          <span className={`inline-block px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}>
            {displaySource}
          </span>
        );
      },
    },
    {
      key: "createdAt" as keyof Lead,
      label: "Submitted Date",
      render: (item: Lead) => (
        <span className="text-xs text-text-page/60">
          {new Date(item.createdAt).toLocaleString()}
        </span>
      ),
    },
    {
      key: "actions" as const,
      label: "Actions",
    },
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-text-page">
            Client Enquiries
          </h2>
          <p className="text-xs text-text-page/60 font-sans mt-1">
            View and manage course enrollment inquiries and contact form entries.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : leads.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border-subtle rounded-xl bg-white">
          <p className="text-sm text-text-page/50 font-semibold">No inquiries received yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-border-subtle rounded-xl shadow-sm overflow-hidden">
          <ResponsiveTable<Lead>
            headers={headers}
            data={leads}
            primaryKey="name"
            actions={(item) => (
              <button
                onClick={() => handleDelete(item.id)}
                className="px-2.5 py-1.5 rounded bg-red-500/10 hover:bg-red-500/15 text-[10px] font-bold uppercase tracking-wider text-red-600 transition-colors cursor-pointer border-none"
              >
                Delete
              </button>
            )}
          />
        </div>
      )}
    </div>
  );
}
