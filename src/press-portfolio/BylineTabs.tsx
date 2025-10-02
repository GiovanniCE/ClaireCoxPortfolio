import { Link2, User2 } from "lucide-react";
import type {Byline} from "./types";
import { Button } from "./UI";

export function BylineTabs({
                               primary, alias, active, onChange
                           }: {
    primary: Byline; alias: Byline; active: "all" | string; onChange: (v: "all" | string) => void
}) {
    return (
        <div className="mx-auto max-w-6xl px-4 pt-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant={active === "all" ? "solid" : "soft"} onClick={() => onChange("all")}><User2 className="h-4 w-4"/> All</Button>
                    <Button variant={active === primary.displayName ? "solid" : "soft"} onClick={() => onChange(primary.displayName)}><User2 className="h-4 w-4"/> {primary.displayName}</Button>
                    <Button variant={active === alias.displayName ? "solid" : "soft"} onClick={() => onChange(alias.displayName)}><Link2 className="h-4 w-4"/> {alias.displayName}</Button>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <a className="text-slate-700 underline-offset-4 hover:underline dark:text-slate-200" href={primary.profileUrl} target="_blank" rel="noreferrer">Primary profile</a>
                    <span className="text-slate-400">·</span>
                    <a className="text-slate-700 underline-offset-4 hover:underline dark:text-slate-200" href={alias.profileUrl} target="_blank" rel="noreferrer">Alternate profile</a>
                </div>
            </div>
        </div>
    );
}