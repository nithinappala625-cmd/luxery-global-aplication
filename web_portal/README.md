# Maison Du Luxe - Web Showcase & Curator Super Admin Portal

This is the Vercel-ready Web Showcase, Google OAuth Callback Handler, and Curatorial Board Super Admin Portal for **Maison Du Luxe** (Global Curated Luxury Marketplace).

---

## 🚀 Instant Vercel Deployment

Deploy with one command via Vercel CLI:

```bash
cd web_portal
npx vercel
```

Or connect the GitHub repository (`https://github.com/npgroupspvtltd-hash/global-luxery-market-application`) directly in the [Vercel Dashboard](https://vercel.com/new), set Root Directory to `web_portal`, and click **Deploy**.

---

## 🔑 Supabase Google OAuth Configuration

Once deployed on Vercel (e.g. `https://maison-du-luxe.vercel.app`):

1. Go to your **Supabase Dashboard** -> **Authentication** -> **URL Configuration**.
2. Set **Site URL** to:
   ```
   https://<your-vercel-domain>.vercel.app
   ```
3. In **Redirect URLs**, add:
   ```
   https://<your-vercel-domain>.vercel.app/auth/callback
   ```
4. In **Authentication** -> **Providers** -> **Google**:
   - Enable Google provider.
   - Paste your Google OAuth Client ID and Secret.
   - Set Authorized redirect URI in Google Cloud Console:
     `https://hbosjierbvruugtkkxad.supabase.co/auth/v1/callback`

---

## 📁 Portal Routes

- `/` (`index.html`): Editorial Web Landing Page & Showcase featuring the 4 luxury verticals (Fine Jewellery, Watches, Supercars, Yachts) with INR crore valuations, trust pillars, and mobile app download badges.
- `/auth/callback` (`auth/callback.html`): Supabase Google OAuth Redirect Handler. Exchanges tokens and offers seamless deep linking to the mobile app (`maison-du-luxe://auth/callback`).
- `/admin` (`admin.html`): Super Admin & Curatorial Board Control Room with 24-hour audit review queues, Cloudflare R2 bucket health, and asset valuation management.
