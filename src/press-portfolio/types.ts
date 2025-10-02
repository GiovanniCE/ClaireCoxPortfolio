export type Article = {
    id: string;
    title: string;
    outlet: string;
    url: string; // link to the article
    date: string; // ISO date (YYYY-MM-DD)
    byline: string; // author display name
    role?: string; // optional role (e.g., Opinions Editor)
    image?: string; // optional hero image url
    excerpt?: string; // optional short description
    tags?: string[];
};

export type Byline = { displayName: string; profileUrl: string };