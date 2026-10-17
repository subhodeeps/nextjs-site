// src/app/blog/_posts/<slug>/section-ids.ts
//
// Names used as HTML ids in a post, so that a part of it can be linked to, as
// in /blog/<slug>#article-content. `as const` fixes the values so TypeScript
// knows them exactly.
export const SECTION_IDS = {
    ARTICLE_CONTENT: 'article-content',
} as const
