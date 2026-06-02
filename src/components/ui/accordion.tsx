"use client";

import * as React from "react";

interface AccordionContextType {
  value: string[];
  onValueChange: (val: string) => void;
}

const AccordionContext = React.createContext<AccordionContextType | null>(null);

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string[];
  multiple?: boolean;
  children: React.ReactNode;
}

export function Accordion({
  defaultValue = [],
  multiple = false,
  children,
  className,
  ...props
}: AccordionProps) {
  const [value, setValue] = React.useState<string[]>(defaultValue);

  const handleValueChange = (itemValue: string) => {
    if (multiple) {
      if (value.includes(itemValue)) {
        setValue(value.filter((val) => val !== itemValue));
      } else {
        setValue([...value, itemValue]);
      }
    } else {
      if (value.includes(itemValue)) {
        setValue([]);
      } else {
        setValue([itemValue]);
      }
    }
  };

  return (
    <AccordionContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className={className} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemContextType {
  value: string;
}

const AccordionItemContext = React.createContext<AccordionItemContextType | null>(null);

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export function AccordionItem({
  value,
  children,
  className,
  ...props
}: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className={className} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function AccordionTrigger({
  children,
  className,
  ...props
}: AccordionTriggerProps) {
  const accordionContext = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);

  if (!accordionContext || !itemContext) {
    throw new Error("AccordionTrigger must be used inside Accordion and AccordionItem");
  }

  const isOpen = accordionContext.value.includes(itemContext.value);

  return (
    <button
      type="button"
      className={className}
      onClick={() => accordionContext.onValueChange(itemContext.value)}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "transparent",
        border: "none",
        color: "white",
        textAlign: "left",
        cursor: "pointer",
        outline: "none"
      }}
      aria-expanded={isOpen}
      {...props}
    >
      {children}
      <span
        className="accordion-trigger-icon"
        style={{
          color: "#d4af37",
          fontSize: "24px",
          transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          display: "inline-block",
          transformOrigin: "center"
        }}
      >
        +
      </span>
    </button>
  );
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AccordionContent({
  children,
  className,
  ...props
}: AccordionContentProps) {
  const accordionContext = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);

  if (!accordionContext || !itemContext) {
    throw new Error("AccordionContent must be used inside Accordion and AccordionItem");
  }

  const isOpen = accordionContext.value.includes(itemContext.value);

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        transition: "grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: isOpen ? 1 : 0,
        overflow: "hidden"
      }}
      aria-hidden={!isOpen}
      {...props}
    >
      <div style={{ minHeight: "0" }}>
        {children}
      </div>
    </div>
  );
}
