# Site audit — 23 November 2026

## What was checked

- Production build and local HTTP crawl of the generated sitemap: 74 public URLs returned 200, each with a self-canonical URL and without a `noindex` tag.
- Rendered links from those public pages: 76 unique internal paths returned 200 locally.
- Legacy blog URL redirects returned 308 to their intended canonical pages.
- Local `ads.txt` and `robots.txt` returned 200; the ads.txt publisher ID matched the AdSense client ID in the application source.
- Published blog registry: 42 articles; all published slugs are unique and all published banners and related article links resolve.

These checks cover the local production build. The execution environment could not connect to the deployed domain, so production response codes and AdSense account status remain unverified.

## Issues found and changes made

1. A footer guide link went through a legacy redirect and had misleading anchor text. It now points directly to the canonical article. Generic social-network homepages were removed from the footer.
2. The root metadata supplied the homepage canonical and sharing image to unrelated pages. Homepage-only metadata now lives on the homepage. Public pages in the sitemap have their own canonical URLs.
3. Structured data contained an unverified 4.9/5 rating and a search action without a working search URL. These were removed. The global FAQ markup was removed because its claims were not tied to the rendered page.
4. The About page presented stock photos and unsupported named professional credentials as reviewers. It now explains the content process without claiming a review that cannot be documented. Unsupported audience and ATS guarantees were reduced elsewhere.
5. The high-impression historical topics “two page resume” and “action verbs for resume” received clearer, more useful copy. An article that claimed invented ATS lab results was rewritten as a practical file-check guide. Several unsupported statistics and first-hand claims in other articles were removed.
6. PDF-versus-Word and data-science articles received topic-specific cover images. Other article images were matched to their subject where suitable.
7. The blog checker now verifies published image assets, related articles, and literal internal links. The AI publishing scripts now reject duplicate slugs, avoid named fictional authors, and instruct the generator not to invent research or credentials.

## Content still needing editorial review

- There are **61 source article files but only 42 published articles**. Nineteen files are outside the registry; several repeat published topics. They are not in the blog index or sitemap and should not be counted as published pages.
- Review the remaining AI-generated articles for claims about employer systems, invented percentages, unsupported “expert” language, and repeated advice. Start with posts 24, 26, 27, 28, 29, 30, 32, 41, 43, 45, and 46. Automated checks cannot prove factual accuracy.
- The older articles 4–18 have short body copy and sparse links. Expand those that answer an actual user question with original examples, a clear explanation, and evidence where needed; avoid keyword stuffing.
- The 14 October 2026 Search Console export is historical. It shows search interest in two-page resumes, action verbs, and resume summary generation. Use a fresh Search Console report before deciding the next topics or claiming current search volume.

## AdSense and Google checks requiring account access

- The source contains an AdSense script and a matching ads.txt publisher ID. Approval is **unknown**. Check **AdSense → Sites** for the site's actual approval and ads.txt status. Only Google can grant approval.
- The site has a basic cookie banner, but the code audit did not find a Google-certified TCF CMP. If personalized ads are served to visitors in the EEA, UK, or Switzerland, configure an approved CMP in AdSense before relying on that banner for ad consent.
- For Google indexing, review **Search Console → Pages** and inspect representative URLs after deployment. The local crawl establishes crawlability of generated pages, not that Google has indexed them.
- The local workspace is missing `public/videos/promotion.mp4` because of a pre-existing user deletion. The file remains tracked in Git and was not included in this change. A deployment from this commit should continue to include it; deleting it in a later commit would break the homepage demo video.

## References

- [Google Search: helpful, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google Search: structured-data quality guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google AdSense: site readiness](https://support.google.com/adsense/answer/12176698)
- [Google AdSense: site status](https://support.google.com/adsense/answer/12170222)
- [Google AdSense: consent management requirements](https://support.google.com/adsense/answer/13554116)
