// src/app/blog/posts/rsync-file-transfer/section-ids.ts
//
// Names used as HTML ids in this post, so that a part of it can be linked to, as
// in /blog/rsync-file-transfer#article-content. `as const` fixes the values so TypeScript
// knows them exactly.
export const SECTION_IDS = {
    ARTICLE_CONTENT: 'article-content',
} as const;
