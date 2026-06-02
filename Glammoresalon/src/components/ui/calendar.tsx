"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <div className="calendar-wrapper" style={{ padding: "10px", background: "#0b0b0b", border: "1px solid rgba(212, 175, 55, 0.2)", borderRadius: "16px", display: "inline-block", width: "100%" }}>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={className}
        classNames={{
          ...classNames,
        }}
        {...props}
      />
      <style>{`
        .rdp {
          --rdp-cell-size: 38px;
          --rdp-accent-color: #d4af37;
          --rdp-background-color: rgba(212, 175, 55, 0.15);
          margin: 0 auto;
          color: white;
          font-family: inherit;
        }
        .rdp-months {
          justify-content: center;
        }
        .rdp-day_selected,
        .rdp-day_selected:hover {
          background-color: var(--rdp-accent-color) !important;
          color: black !important;
          font-weight: 700;
          border-radius: 50%;
        }
        .rdp-day:hover:not(.rdp-day_selected) {
          background-color: var(--rdp-background-color) !important;
          color: #d4af37 !important;
          border-radius: 50%;
        }
        .rdp-button {
          color: white;
        }
        .rdp-button:hover {
          color: #d4af37;
        }
        .rdp-nav_button {
          color: white;
          background: transparent;
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 8px;
        }
        .rdp-nav_button:hover {
          background: rgba(212, 175, 55, 0.1);
          color: #d4af37;
        }
        .rdp-head_cell {
          color: #888;
          font-weight: 600;
          font-size: 13px;
        }
        .rdp-caption_label {
          font-weight: 700;
          color: #d4af37;
          font-size: 16px;
        }
        .rdp-caption_dropdowns,
        .rdp-dropdowns {
          display: flex;
          gap: 8px;
          justify-content: center;
          align-items: center;
          margin-bottom: 12px;
          width: 100%;
        }
        .rdp-dropdown {
          background: #050505;
          color: white;
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 6px;
          padding: 6px 12px;
          font-size: 14px;
          font-weight: 500;
          font-family: inherit;
          outline: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .rdp-dropdown:hover {
          border-color: #d4af37;
          background: rgba(212, 175, 55, 0.05);
        }
        .rdp-dropdown option {
          background: #0b0b0b;
          color: white;
        }
      `}</style>
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
