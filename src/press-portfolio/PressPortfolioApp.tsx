import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { articles as RAW, CLAIRE, CICI } from "./articles";
import type {Article} from "./types";
import { FiltersBar } from "./FiltersBar";
import { BylineTabs } from "./BylineTabs";
import { ArticleCard } from "./ArticleCard.tsx";
import { ArticleModal } from "./ArticleModal";

export default function PressPortfolioApp() {
    const [query, setQuery] = useState("");
    const [byline, setByline] = useState<"all" | string>("all");
    const [sort, setSort] = useState<"newest" | "oldest">("newest");
    const [open, setOpen] = useState<Article | null>(null);

    const articles = useMemo(() => {
        let list = RAW.slice();
        if (byline !== "all") list = list.filter(a => a.byline === byline);
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(a => (
                a.title.toLowerCase().includes(q) ||
                a.outlet.toLowerCase().includes(q) ||
                (a.tags || []).some(t => t.toLowerCase().includes(q))
            ));
        }
        list.sort((a, b) => sort === "newest" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date));
        return list;
    }, [RAW, byline, query, sort]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 dark:from-slate-950 dark:to-slate-950 dark:text-slate-100">
            {/* Hero */}
            <header className="relative">
                <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(99,102,241,0.10),transparent),radial-gradient(800px_400px_at_90%_-20%,rgba(236,72,153,0.10),transparent)]" />
                <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
                    <h1 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">Articles Portfolio</h1>
                    <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600 dark:text-slate-300">Claire Cox - Opinions Editor and Broadcast Co-Host</p>
                </div>
            </header>

            {/* Tabs + Filters */}
            <BylineTabs primary={CLAIRE} alias={CICI} active={byline} onChange={setByline} />
            <section className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
                <FiltersBar query={query} setQuery={setQuery} sort={sort} setSort={setSort} />
            </section>

            {/* Grid */}
            <main className="mx-auto max-w-6xl px-4 py-10">
                {articles.length === 0 ? (
                    <p className="text-center text-slate-500 dark:text-slate-400">No articles match your search.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <AnimatePresence>
                            {articles.map(a => (
                                <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                    <ArticleCard article={a} onOpen={setOpen} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </main>

            <ArticleModal article={open} onClose={() => setOpen(null)} />

            <footer className="border-t border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>© {new Date().getFullYear()} {CLAIRE.displayName}</div>
                    <div className="flex items-center gap-3">
                        <a href={CLAIRE.profileUrl} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">Primary byline</a>
                        <span>·</span>
                        <a href={CICI.profileUrl} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">Alternate byline</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}