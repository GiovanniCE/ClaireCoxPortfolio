// File: src/press-portfolio/FiltersBar.tsx
import { Search, SortAsc } from "lucide-react";

export function FiltersBar({
                               query, setQuery, sort, setSort,
                           }: {
    query: string;
    setQuery: (v: string) => void;
    sort: "newest" | "oldest";
    setSort: (v: "newest" | "oldest") => void;
}) {
    return (
        <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col md:flex-row items-center gap-3">
            <div className="relative w-full md:max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by title, outlet, tag…"
                    className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2.5 text-sm shadow-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
                <select
                    className="w-[180px] rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-900"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
                >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                </select>
            </div>
        </div>
    );
}
