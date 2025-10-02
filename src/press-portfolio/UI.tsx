import React from "react";
import { cn } from "./vendor";

export function Chip({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                active ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900" :
                    "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            )}
        >
            {children}
        </button>
    );
}

export function Button({ variant = "solid", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "soft" | "ghost" }) {
    return (
        <button
            {...props}
            className={cn(
                "inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60",
                variant === "solid" && "bg-indigo-600 text-white hover:bg-indigo-700",
                variant === "soft" && "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
                variant === "ghost" && "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
                className
            )}
        />
    );
}

export function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div {...props} className={cn("rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900", className)} />
}