// File: src/press-portfolio/ArticleCard.tsx
import { Calendar, Newspaper } from "lucide-react";
import type {Article} from "./types";
import { Card } from "./UI";
import {formatDate, makeCardPlaceholder,} from "./utils";

export function ArticleCard({ article, onOpen }: { article: Article; onOpen: (a: Article) => void }) {
    const img = article.image && article.image.trim().length > 0
        ? article.image
        : makeCardPlaceholder(article.title, 'caption');
    return (
        <Card className="h-full overflow-hidden">
            <div className="aspect-[16/9] w-full overflow-hidden">
                <img src={img} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Newspaper className="h-3.5 w-3.5" />
                    <span>{article.outlet}</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold leading-tight text-slate-900 dark:text-white">
                    <button onClick={() => onOpen(article)} className="text-left underline-offset-4 hover:text-indigo-700 hover:underline">
                        {article.title}
                    </button>
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" /> {formatDate(article.date)}</span>
                </div>
            </div>
        </Card>
    );
}