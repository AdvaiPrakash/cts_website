"use client";

import React from "react";

interface Header<T> {
  key: keyof T | "actions";
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface ResponsiveTableProps<T> {
  headers: Header<T>[];
  data: T[];
  primaryKey: keyof T;
  actions?: (item: T) => React.ReactNode;
}

export function ResponsiveTable<T>({ headers, data, primaryKey, actions }: ResponsiveTableProps<T>) {
  return (
    <div className="w-full">
      {/* DESKTOP TABLE VIEW (md+) */}
      <div className="hidden md:block overflow-x-auto border border-border-subtle rounded-xl bg-white shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-border-subtle bg-black/[0.01]">
              {headers.map((header, idx) => (
                <th 
                  key={idx} 
                  className="px-6 py-4 font-bold uppercase tracking-wider text-text-page/40"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle/50 text-text-page/80">
            {data.map((item, rowIdx) => (
              <tr 
                key={String(item[primaryKey]) || rowIdx}
                className="hover:bg-black/[0.005] transition-colors"
              >
                {headers.map((header, colIdx) => {
                  if (header.key === "actions") {
                    return (
                      <td key={colIdx} className="px-6 py-4 shrink-0">
                        <div className="flex items-center gap-2">
                          {actions ? actions(item) : null}
                        </div>
                      </td>
                    );
                  }
                  
                  return (
                    <td key={colIdx} className="px-6 py-4 font-medium max-w-xs truncate">
                      {header.render ? header.render(item) : String(item[header.key] || "")}
                    </td>
                  );
                })}
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={headers.length} className="px-6 py-12 text-center text-text-page/40 font-semibold">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE STACKED CARDS VIEW (<md) */}
      <div className="md:hidden space-y-4">
        {data.map((item, rowIdx) => (
          <div 
            key={String(item[primaryKey]) || rowIdx}
            className="p-5 bg-white border border-border-subtle rounded-xl shadow-sm text-left space-y-3"
          >
            {/* Primary Key / Card Title */}
            <div className="border-b border-border-subtle/50 pb-2">
              <h4 className="font-serif text-sm font-semibold text-text-page leading-snug">
                {String(item[primaryKey])}
              </h4>
            </div>

            {/* List key-value pairs */}
            <div className="space-y-1.5 text-[11px] font-semibold text-text-page/70">
              {headers.map((header, colIdx) => {
                if (header.key === primaryKey || header.key === "actions") return null;

                return (
                  <div key={colIdx} className="flex justify-between gap-4">
                    <span className="text-text-page/40 uppercase tracking-wider">{header.label}:</span>
                    <span className="text-right truncate max-w-[150px] font-medium text-text-page">
                      {header.render ? header.render(item) : String(item[header.key] || "")}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Mobile Actions Footer */}
            {actions && (
              <div className="pt-3 border-t border-border-subtle/50 flex items-center justify-end gap-2">
                {actions(item)}
              </div>
            )}
          </div>
        ))}

        {data.length === 0 && (
          <div className="p-12 text-center border border-dashed border-border-subtle rounded-xl text-text-page/40 font-semibold bg-white">
            No records found.
          </div>
        )}
      </div>
    </div>
  );
}
