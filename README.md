Smart Resume Maker is a Next.js resume builder with PostgreSQL, Prisma, Google AI tools, and optional live Google reporting.

## Live SEO and conversion reporting

The admin dashboard reads current Search Console and GA4 API reports. Without credentials it shows **Setup required**; the old CSV export is never presented as live data. Reports cover the most recent 28 complete days, ending three days ago to avoid partial reporting data. The dashboard shows when each report was fetched.

1. Create a Google Cloud service account, enable the **Search Console API** and **Google Analytics Data API**, and download its JSON key. Keep the key private.
2. Add the service account email as a user on the exact Search Console property you will query. Set `GSC_SITE_URL` to that property's identifier, for example `sc-domain:smartresumemaker.com` or `https://www.smartresumemaker.com/`.
3. In GA4 property access management, grant the same service account **Viewer** access. Set `GA4_PROPERTY_ID` to the numeric property ID (not the web stream ID).
4. Create or select the GA4 web data stream for this website and set `NEXT_PUBLIC_GA4_MEASUREMENT_ID` to its `G-...` measurement ID.
5. Set `GOOGLE_SERVICE_ACCOUNT_JSON` to the complete service account JSON in Vercel's server environment variables. Set the other three variables there too, then redeploy. Do not commit the key or place it in a `NEXT_PUBLIC_` variable.

GA4 loads only after the visitor accepts optional cookies. The `builder_opened` event is sent once per browser tab session when the builder is opened; `resume_downloaded` is sent after a successful PDF save. No resume text, email, or other personal data is sent with these events. Visitors can change consent with **Cookie settings**. Event counts will remain empty until GA4 receives real, consented traffic. They are not a same-user conversion rate.

OpenSEO is an optional external ChatGPT integration for research; this project's admin dashboard uses Google's official APIs directly and does not depend on it. Vercel Analytics and Speed Insights remain in place; no paid Vercel feature is required.

## Password reset email

The **Forgot password?** link uses one-use, 30-minute reset links for email/password accounts. Google-only accounts continue to sign in with Google, and admin accounts cannot reset a password through this flow. Responses do not reveal whether an address has an account, and requests are limited to one per address every five minutes.

1. In [Resend](https://resend.com/), add and verify a sending domain you control. Create an API key with **Sending access** for that domain.
2. In the Vercel project's **Production** environment, add `RESEND_API_KEY` as a private secret and `PASSWORD_RESET_FROM_EMAIL` as a sender on the verified domain, such as `Smart Resume Maker <no-reply@smartresumemaker.com>`. Keep `NEXTAUTH_URL` set to the public HTTPS site origin.
3. Redeploy after saving the variables. Test with a non-admin email/password account that you control. If mail is not configured, the reset page returns a clear setup-unavailable error rather than claiming an email was sent.

The raw reset token is never stored in the database; only its SHA-256 hash is stored in the existing `VerificationToken` table. The link uses a URL fragment so the token is not sent in the page request. Do not put the Resend API key in Git or a `NEXT_PUBLIC_` variable.

## Getting Started

Create `.env.local` with the required database and authentication variables for local development. Add the four Google reporting variables listed above only when you have authorized Google API access. Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
