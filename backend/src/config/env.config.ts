export const configuration = () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  supabase: {
    url: process.env.SUPABASE_URL || 'https://xyzcompany.supabase.co',
    anonKey: process.env.SUPABASE_ANON_KEY || 'dummy_anon_key',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_service_role_key',
    jwtSecret: process.env.SUPABASE_JWT_SECRET || 'super_secret_jwt_key_lux_marketplace_2026',
  },
  r2: {
    accountId: process.env.R2_ACCOUNT_ID || 'dummy_r2_account_id',
    accessKeyId: process.env.R2_ACCESS_KEY_ID || 'dummy_r2_access_key',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || 'dummy_r2_secret_key',
    bucketName: process.env.R2_BUCKET_NAME || 'luxury-marketplace-assets',
    publicDomain: process.env.R2_PUBLIC_DOMAIN || 'https://assets.luxurymarketplace.global',
  },
  payments: {
    razorpay: {
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
      keySecret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_secret_placeholder',
    },
    paypal: {
      clientId: process.env.PAYPAL_CLIENT_ID || 'paypal_sandbox_client_id',
      clientSecret: process.env.PAYPAL_CLIENT_SECRET || 'paypal_sandbox_client_secret',
      mode: process.env.PAYPAL_MODE || 'sandbox',
    },
  },
});
