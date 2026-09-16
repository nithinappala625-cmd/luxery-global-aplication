# MAISON DU LUXE — GLOBAL LUXURY MARKETPLACE

An elite international marketplace for exceptional pre-owned luxury assets: Fine Jewellery & Diamonds, Luxury Watches, Luxury & Exotic Cars, and Yachts & Marine.

---

## Technical Stack Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       FLUTTER MOBILE APP                    │
│   Material 3 "Quiet Luxury" Design System (Light & Dark)    │
│   Riverpod State Management • GoRouter • Tabular Currency   │
└───────────────▲─────────────────────────────▲───────────────┘
                │                             │
    REST / JSON │ Authorization     Presigned │ Direct Upload
                │                             │ (No Server Proxy)
┌───────────────▼─────────────┐ ┌─────────────▼───────────────┐
│        NESTJS BACKEND       │ │       CLOUDFLARE R2         │
│   Modular Micro-Domain Arch │ │    S3-Compatible Object     │
│   Payment Abstraction Layer │ │    Storage (Originals,      │
│   (Razorpay & PayPal)       │ │    Optimized, Thumbnails)   │
└───────────────▲─────────────┘ └─────────────────────────────┘
                │
                │ Row-Level Security (RLS)
                ▼
┌─────────────────────────────┐
│     SUPABASE POSTGRESQL     │
│   Profiles, Listings, Specs │
│   Auctions, Unlocks, Ledger │
└─────────────────────────────┘
```

### 1. Mobile Application (Flutter & Dart)
- **Design System**: Quiet Luxury / Private Club aesthetic.
- **Palette**:
  - Deep Forest Green (`#123C32`) & Very Dark Green (`#09241E`)
  - Pure Black (`#0B0B0B`) & Charcoal (`#242424`)
  - Soft Ivory (`#F7F5EF`) & Pure White (`#FFFFFF`)
  - Subtle Champagne / Brushed Gold (`#C5A880`)
  - Hairline Borders (`#DAD8D0` / `#2E2E2E`)
- **Typography**: Playfair Display (editorial serif) paired with Manrope / Inter (modern UI sans-serif) and tabular numerals.
- **Navigation Shell**: 5 core tabs: **HOME**, **DISCOVER**, **AUCTIONS**, **SELL**, **PROFILE**.

### 2. Backend Architecture (NestJS & TypeScript)
- **Modular Domains**:
  - `auth` & `supabase`: JWT validation & RBAC (buyer, seller, dealer, auction_house, admin).
  - `media`: Cloudflare R2 presigned PUT/GET URLs and upload confirmations.
  - `categories`: Dynamic category and subcategory hierarchy with spec schemas.
  - `listings`: Discovery search, multi-currency filtering, 10-step consignment review lifecycle.
  - `payments`: Polymorphic abstraction layer supporting **Razorpay** and **PayPal**.
  - `contact-unlocks`: Secure custodian contact reveals upon fee authorization.
  - `auctions`: Curated external bidding room redirects and accredited auction house profiles.
  - `admin`: Curatorial review board for consignment approvals/rejections and KPI metrics.

### 3. Database (Supabase PostgreSQL)
- **Migrations & Schemas**: Located in `database/01_schema.sql`, `database/02_seed.sql`, and `database/03_seed_listings.sql`.
- **Row Level Security (RLS)**: Public read for verified listings; owner-only write; admin super-privilege.

---

## Cloudflare R2 Secure Media Flow

```
Flutter App                  NestJS Backend                  Cloudflare R2
     │                             │                               │
     │── 1. Request Presigned URL ─>│                               │
     │      (MIME, size, entityId) │                               │
     │                             │── 2. S3Client.getSignedUrl() ─>│
     │<── 3. Returns Signed PUT ───│                               │
     │                             │                               │
     │─────────────── 4. Direct Upload PUT (binary) ───────────────>│
     │                                                             │
     │── 5. Confirm Upload ───────>│                               │
     │      (r2Key, publicUrl)     │── 6. Write to listing_images ─> Supabase DB
```

---

## Payment Abstraction Architecture

`PaymentService` implements the `PaymentProvider` interface:
```typescript
interface PaymentProvider {
  readonly providerName: 'razorpay' | 'paypal';
  createPayment(options: CreatePaymentOptions): Promise<PaymentOrderResult>;
  verifyPayment(options: VerifyPaymentOptions): Promise<VerifyPaymentResult>;
  refundPayment(options: RefundOptions): Promise<{ refundId: string; status: string }>;
  getPaymentStatus(paymentId: string): Promise<string>;
}
```
Zero secrets are exposed to the mobile application. All signatures (`HMAC-SHA256`) and gateway credentials are held securely in the NestJS environment.

---

## Running the Project

### 1. Backend
```bash
cd backend
npm install
npm run build
npm test
npm run start:dev
```
- API Endpoint: `http://localhost:3000/api/v1`
- Swagger UI Documentation: `http://localhost:3000/api/docs`

### 2. Mobile App (Flutter)
```bash
cd mobile_app
flutter pub get
flutter test
flutter run
```

### 3. Database Setup (Supabase)
Execute the SQL files in order inside the Supabase SQL Editor:
1. `database/01_schema.sql`
2. `database/02_seed.sql`
3. `database/03_seed_listings.sql`
