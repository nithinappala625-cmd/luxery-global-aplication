class Environment {
  Environment._();

  // NestJS Backend API Endpoint (10.0.2.2 for Android Emulator, localhost for iOS/desktop)
  static const String apiBaseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'http://10.0.2.2:3000/api/v1',
  );

  // Supabase Public Keys (safe for client application)
  static const String supabaseUrl = String.fromEnvironment(
    'SUPABASE_URL',
    defaultValue: 'https://hbosjierbvruugtkkxad.supabase.co',
  );

  static const String supabaseAnonKey = String.fromEnvironment(
    'SUPABASE_ANON_KEY',
    defaultValue: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhib3NqaWVyYnZydXVndGtreGFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1Mzk5ODUsImV4cCI6MjEwNTExNTk4NX0.ITJD1xx2znhBPh65pOciEUjz_6N-5rbu9wsaXTAleYU',
  );

  // Notice: Absolutely NO private storage credentials (R2 Access/Secret Keys)
  // and NO payment secret keys are stored in the Flutter mobile application.
}
