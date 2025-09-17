export const FILM_TABS = ['Overview', 'Details', 'Reviews'] as const;
export type FilmTab = (typeof FILM_TABS)[number];
