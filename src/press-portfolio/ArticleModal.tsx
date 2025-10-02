import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Check, Copy, ExternalLink, Tag, User2, X } from "lucide-react";
import type {Article} from "./types";
import { Button } from "./UI";
import { formatDate, makeCardPlaceholder } from "./utils";

export function ArticleModal({ article, onClose }: { article: Article | null; onClose: () => void }) {
    const [copied, setCopied] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    useEffect(() => { if (article && ref.current) ref.current.focus(); }, [article]);

    async function copyLink() {
        if (!article) return;
        try {
            await navigator.clipboard.writeText(article.url || window.location.href);
            setCopied(true); setTimeout(() => setCopied(false), 1200);
        } catch {}
    }

    return (
        <AnimatePresence>
            {article && (
                <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="absolute inset-0 bg-black/50" onClick={onClose} />
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        tabIndex={-1}
                        ref={ref}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 30, opacity: 0 }}
                        className="absolute inset-x-0 top-12 mx-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl outline-none dark:bg-slate-900"
                    >
                        <div className="aspect-[16/9] w-full">
                            <img src={(article.image && article.image.trim()) ? article.image : makeCardPlaceholder(article.title)} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div className="p-6">
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{article.title}</h3>
                                <button onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800" aria-label="Close">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="inline-flex items-center gap-1"><User2 className="h-4 w-4" /> {article.byline}{article.role ? `, ${article.role}` : ""}</span>
                                    <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" /> {formatDate(article.date)}</span>
                                </div>
                            </div>
                            {article.excerpt && (
                                <p className="mt-3 text-slate-700 dark:text-slate-200">{article.excerpt}</p>
                            )}
                            {!!article.tags?.length && (
                                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
                                    {article.tags.map(t => (
                                        <span key={t} className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 dark:border-slate-700 dark:bg-slate-800"> <Tag className="h-3.5 w-3.5"/> {t}</span>
                                    ))}
                                </div>
                            )}
                            <div className="mt-6 flex items-center justify-between">
                                <a href={article.url || "#"} target="_blank" rel="noreferrer">
                                    <Button className=""><ExternalLink className="h-4 w-4"/> Read full story</Button>
                                </a>
                                <div className="flex items-center gap-2">
                                    <Button variant="soft" onClick={copyLink}>{copied ? <><Check className="h-4 w-4"/> Copied</> : <><Copy className="h-4 w-4"/> Copy link</>}</Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}