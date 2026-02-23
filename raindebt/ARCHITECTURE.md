# RainDebt Architecture

## 1. Project Overview

RainDebt is a climate monitoring platform designed for rural properties in Brazil. It uses satellite-derived precipitation data to calculate the Standardized Precipitation Index (SPI), enabling detection of drought and excess rainfall events. The platform targets Brazil's rural credit and crop insurance market, providing property owners with real-time climate intelligence and automated technical reporting.

Key capabilities:
- Real-time SPI monitoring per registered property
- Dual-source climate data ingestion (NASA POWER primary, Open-Meteo fallback)
- Automated daily data collection via n8n workflows
- Event detection and classification (drought, excess rainfall)
- Multi-language support (pt-BR, en-US, es-LA)
- Row-level security ensuring data isolation per user

---

## 2. Tech Stack

| Layer              | Technology                                           |
|--------------------|------------------------------------------------------|
| Framework          | Expo SDK 54, React Native 0.84                       |
| Styling            | NativeWind v4 (TailwindCSS 3.4 for React Native)    |
| Navigation         | Expo Router v4 (file-based routing)                  |
| Backend / Auth     | Supabase (Auth + PostgreSQL + Row-Level Security)    |
| Language           | TypeScript (strict mode)                             |
| Charts             | react-native-chart-kit, react-native-svg             |
| Maps               | react-native-maps                                    |
| Icons              | lucide-react-native                                  |
| Fonts              | @expo-google-fonts/inter (400, 500, 600, 700)        |
| Automation         | n8n (self-hosted workflow engine)                     |
| APIs               | NASA POWER (AG community), Open-Meteo Archive        |

---

## 3. Directory Structure

```
raindebt/
├── app/                          # Expo Router screens (file-based routing)
│   ├── _layout.tsx               # Root layout: AuthProvider, I18nProvider, fonts
│   ├── index.tsx                 # Entry redirect (auth check)
│   ├── (auth)/                   # Auth group (unauthenticated)
│   │   ├── _layout.tsx           # Auth stack layout
│   │   ├── login.tsx             # Login screen
│   │   └── register.tsx          # Registration screen
│   └── (app)/                    # App group (authenticated)
│       ├── _layout.tsx           # App stack layout with auth guard
│       ├── (tabs)/               # Bottom tab navigator
│       │   ├── _layout.tsx       # Tab bar configuration
│       │   ├── index.tsx         # Dashboard (property list + alerts)
│       │   ├── add-property.tsx  # Add property form with map picker
│       │   └── settings.tsx      # Settings (locale, profile, sign out)
│       └── property/
│           ├── _layout.tsx       # Property detail stack
│           └── [id].tsx          # Property detail (SPI, charts, events, map)
├── components/
│   ├── auth/                     # Auth form components
│   ├── dashboard/
│   │   ├── AlertBanner.tsx       # Horizontal scroll of critical SPI alerts
│   │   └── PropertyCard.tsx      # Property summary card with SPI badge
│   ├── map/
│   │   ├── PropertyMapPicker.tsx # Coordinate input + GPS for add-property
│   │   └── PropertyMapView.tsx   # Read-only map for property detail
│   ├── property/
│   │   ├── ClimateDataCard.tsx   # Temperature, humidity, precipitation card
│   │   ├── EventHistoryItem.tsx  # Single event row
│   │   ├── EventHistoryList.tsx  # SectionList grouped by active/past events
│   │   ├── PrecipitationChart.tsx# 90-day precipitation bar chart
│   │   └── SPIGauge.tsx          # Visual SPI gauge with color coding
│   └── ui/                       # Reusable UI primitives
├── contexts/
│   ├── AuthContext.tsx            # Authentication state and methods
│   └── I18nContext.tsx            # Locale state and translation function
├── hooks/                        # Custom React hooks
├── i18n/
│   ├── index.ts                  # Locale detection, translation factory
│   ├── en-US.ts                  # English translations
│   ├── es-LA.ts                  # Spanish translations
│   └── pt-BR.ts                  # Portuguese (Brazil) translations
├── lib/
│   ├── api/
│   │   ├── climate-data.ts       # Orchestrator: NASA POWER -> Open-Meteo fallback
│   │   ├── nasa-power.ts         # NASA POWER daily point API client
│   │   └── open-meteo.ts         # Open-Meteo historical archive API client
│   ├── calculations/
│   │   ├── gamma.ts              # Gamma function, CDF, MLE parameter fitting
│   │   ├── spi.ts                # SPI calculation (full + simplified)
│   │   └── statistics.ts         # mean, variance, logMean, inverse normal CDF
│   ├── services/
│   │   ├── auth.service.ts       # Sign in, sign up, sign out, session management
│   │   ├── climate.service.ts    # Fetch, store, and process climate data
│   │   ├── event.service.ts      # Event detection, querying, acknowledgement
│   │   └── property.service.ts   # CRUD operations for properties
│   ├── supabase.ts               # Supabase client initialization
│   └── utils/
│       ├── constants.ts          # API URLs, SPI thresholds, defaults
│       ├── date.ts               # Date formatting utilities
│       ├── location.ts           # GPS and coordinate utilities
│       └── spi-classification.ts # SPI value -> category/color/severity mapping
├── n8n/
│   └── daily-climate-collection.json  # n8n workflow definition
├── supabase/
│   └── migrations/
│       ├── 00001_create_users_table.sql
│       ├── 00002_create_properties_table.sql
│       ├── 00003_create_climate_records_table.sql
│       ├── 00004_create_climate_events_table.sql
│       ├── 00005_create_technical_reports_table.sql
│       └── 00006_create_rls_policies.sql
├── theme/                        # Design tokens and color palette
├── types/
│   ├── climate.ts                # API response types, SPI types
│   ├── database.ts               # DB row types, Database interface
│   ├── i18n.ts                   # Locale and translation function types
│   └── navigation.ts             # Route parameter types
├── App.tsx                       # Expo entry point
├── index.ts                      # registerRootComponent
├── app.json                      # Expo configuration
├── babel.config.js               # Babel with expo + nativewind presets
├── metro.config.js               # Metro bundler config
├── tailwind.config.js            # TailwindCSS / NativeWind theme config
├── tsconfig.json                 # TypeScript strict configuration
├── global.css                    # TailwindCSS directives
├── package.json
└── .env.example                  # Environment variable template
```

---

## 4. Architecture Layers

```
┌──────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
│                                                              │
│   Screens (app/)          Components (components/)           │
│   ┌──────────────┐        ┌────────────────────────┐        │
│   │ (auth)/      │        │ auth/    dashboard/     │        │
│   │  login       │        │ map/     property/      │        │
│   │  register    │        │ ui/                     │        │
│   ├──────────────┤        └────────────────────────┘        │
│   │ (app)/       │                                           │
│   │  dashboard   │        Contexts (contexts/)               │
│   │  add-property│        ┌────────────────────────┐        │
│   │  settings    │        │ AuthContext             │        │
│   │  property/[id]│       │ I18nContext             │        │
│   └──────────────┘        └────────────────────────┘        │
├──────────────────────────────────────────────────────────────┤
│                     SERVICE LAYER                            │
│                                                              │
│   ┌───────────────┬───────────────┬───────────────────┐     │
│   │ auth.service  │ property.svc  │ climate.service    │     │
│   │ signIn/Up/Out │ CRUD          │ fetch + store +    │     │
│   │ session mgmt  │ soft delete   │ SPI calculation    │     │
│   ├───────────────┴───────────────┼───────────────────┤     │
│   │ event.service                 │ spi-classification │     │
│   │ detect, query, acknowledge    │ classify, color    │     │
│   └───────────────────────────────┴───────────────────┘     │
├──────────────────────────────────────────────────────────────┤
│                     API LAYER                                │
│                                                              │
│   ┌─────────────────────────────────────────────────┐       │
│   │ climate-data.ts (orchestrator)                   │       │
│   │                                                  │       │
│   │   ┌──────────────┐    ┌───────────────────┐     │       │
│   │   │ NASA POWER   │--->│ Open-Meteo        │     │       │
│   │   │ (primary)    │fail│ (fallback)        │     │       │
│   │   └──────────────┘    └───────────────────┘     │       │
│   └─────────────────────────────────────────────────┘       │
├──────────────────────────────────────────────────────────────┤
│                   CORE ENGINE (calculations/)                │
│                                                              │
│   ┌────────────────┬────────────────┬──────────────────┐    │
│   │ spi.ts         │ gamma.ts       │ statistics.ts    │    │
│   │ calculateSPI   │ gammaFunction  │ mean, variance   │    │
│   │ simplified SPI │ gammaCDF       │ logMean          │    │
│   │ accumulation   │ fitGammaParams │ inverseNormalCDF │    │
│   └────────────────┴────────────────┴──────────────────┘    │
├──────────────────────────────────────────────────────────────┤
│                     DATA LAYER                               │
│                                                              │
│   ┌─────────────────────────────────────────────────┐       │
│   │ Supabase (PostgreSQL + Auth + RLS)               │       │
│   │                                                  │       │
│   │  users -> properties -> climate_records          │       │
│   │                      -> climate_events           │       │
│   │           users     -> technical_reports         │       │
│   └─────────────────────────────────────────────────┘       │
└──────────────────────────────────────────────────────────────┘
```

---

## 5. Database Schema

### Entity-Relationship Diagram

```
┌──────────────┐       ┌──────────────────┐       ┌──────────────────┐
│  auth.users  │       │   public.users   │       │   properties     │
│──────────────│       │──────────────────│       │──────────────────│
│ id (PK)      │──1:1──│ id (PK, FK)      │──1:N──│ id (PK)          │
│ email        │       │ full_name        │       │ user_id (FK)     │
│ ...          │       │ email (UNIQUE)   │       │ name             │
└──────────────┘       │ phone            │       │ latitude         │
                       │ document_number  │       │ longitude        │
                       │ preferred_language│      │ area_hectares    │
                       │ created_at       │       │ municipality     │
                       │ updated_at       │       │ state, country   │
                       └──────────────────┘       │ current_spi      │
                                                  │ current_spi_cat  │
                                                  │ last_data_fetch  │
                       ┌──────────────────┐       │ is_active        │
                       │ climate_records  │       │ created/updated  │
                       │──────────────────│       └────────┬─────────┘
                       │ id (PK)          │                │
                       │ property_id (FK) │───────N:1──────┤
                       │ record_date      │                │
                       │ precipitation_mm │       ┌────────┴─────────┐
                       │ temperature_*    │       │ climate_events   │
                       │ relative_humidity│       │──────────────────│
                       │ spi_value        │       │ id (PK)          │
                       │ data_source      │       │ property_id (FK) │
                       │ created_at       │       │ event_type       │
                       └──────────────────┘       │ severity         │
                                                  │ start_date       │
                       ┌──────────────────┐       │ end_date         │
                       │ technical_reports│       │ spi_value        │
                       │──────────────────│       │ description      │
                       │ id (PK)          │       │ is_active        │
                       │ property_id (FK) │──N:1──│ acknowledged     │
                       │ user_id (FK)     │       │ created/updated  │
                       │ title            │       └──────────────────┘
                       │ report_period_*  │
                       │ status           │
                       │ file_url         │
                       │ spi_summary (JSON)│
                       │ metadata (JSON)  │
                       │ generated_at     │
                       │ created/updated  │
                       └──────────────────┘
```

### Table Details

**users** -- Extends `auth.users` with application profile data. Linked via UUID FK with `ON DELETE CASCADE`. Trigger auto-creates a profile row on Supabase auth signup.

**properties** -- Each property has GPS coordinates (latitude/longitude with range constraints), an optional area in hectares, and cached SPI values. Soft-delete via `is_active` flag. Indexed on `user_id`, coordinates, and active status.

**climate_records** -- Daily climate observations per property. Supports upsert on `(property_id, record_date)`. Sources: `nasa_power`, `open_meteo`, or `manual`.

**climate_events** -- Detected drought or excess rainfall events. Types: `moderate_drought`, `severe_drought`, `extreme_drought`, `excess_rainfall`, `dry_spell`, `heavy_rainfall`. Severity levels: `low`, `medium`, `high`, `critical`.

**technical_reports** -- Generated PDF reports for insurance/credit purposes. Status lifecycle: `pending` -> `generating` -> `completed` | `failed`.

### Row-Level Security (RLS) Policies

All five tables have RLS enabled. The policy model follows these rules:

| Table             | authenticated role                      | service_role         |
|-------------------|-----------------------------------------|----------------------|
| users             | SELECT/UPDATE/INSERT own row (uid = id) | N/A                  |
| properties        | Full CRUD on own rows (user_id = uid)   | N/A                  |
| climate_records   | SELECT/INSERT own property records      | ALL (bypass RLS)     |
| climate_events    | SELECT/UPDATE own property events       | ALL (bypass RLS)     |
| technical_reports | SELECT/INSERT own reports               | ALL (bypass RLS)     |

The `service_role` bypass is critical for the n8n automation workflow, which writes climate records and events using the Supabase service key.

---

## 6. SPI Calculation Pipeline

The Standardized Precipitation Index (SPI) transforms precipitation data into a normalized distribution, enabling comparison across different climates and time periods.

### Full SPI Calculation

```
Monthly Precipitation Series
         │
         v
┌────────────────────────┐
│ 1. Accumulate          │   Sum precipitation over the chosen
│    Precipitation       │   time scale (1, 3, 6, or 12 months)
│    (sliding window)    │
└──────────┬─────────────┘
           v
┌────────────────────────┐
│ 2. Separate Zeros      │   q = count(zeros) / total
│    from Non-Zero       │   Handles mixed distribution
│    Values              │   (zero-inflated data)
└──────────┬─────────────┘
           v
┌────────────────────────┐   Thom's Approximation:
│ 3. Fit Gamma           │   A = ln(mean) - mean(ln(x))
│    Distribution        │   alpha = (1/(4A)) * (1 + sqrt(1 + 4A/3))
│    via MLE             │   beta  = mean / alpha
└──────────┬─────────────┘
           v
┌────────────────────────┐
│ 4. Compute CDF         │   H(x) = q + (1-q) * G(x)
│    (Mixed Distribution)│   where G(x) = regularized incomplete
│                        │   gamma function P(alpha, x/beta)
└──────────┬─────────────┘
           v
┌────────────────────────┐   Abramowitz & Stegun rational
│ 5. Inverse Normal CDF  │   approximation converts
│    (Probability -> Z)  │   probability to z-score
└──────────┬─────────────┘
           v
       SPI Value
```

### Simplified SPI (Short Records)

For datasets with fewer than 30 months of accumulation, a z-score approach is used:

```
SPI = (current_precip - mean) / standard_deviation
```

This requires a minimum of 10 observations.

### SPI Classification Thresholds

| SPI Range         | Category         | Severity | Color   |
|-------------------|------------------|----------|---------|
| >= 2.0            | Extremely Wet    | high     | #2980B9 |
| 1.5 to 2.0       | Very Wet         | medium   | #3498DB |
| 1.0 to 1.5       | Moderately Wet   | low      | #5DADE2 |
| -1.0 to 1.0      | Near Normal      | none     | #4A9B6F |
| -1.5 to -1.0     | Moderately Dry   | medium   | #E8A020 |
| -2.0 to -1.5     | Severely Dry     | high     | #E67E22 |
| <= -2.0           | Extremely Dry    | critical | #C0392B |

---

## 7. API Data Flow

### Climate Data Ingestion Pipeline

```
┌─────────────────┐
│   Property      │  latitude, longitude
│   Coordinates   │
└────────┬────────┘
         v
┌─────────────────┐     success     ┌─────────────────┐
│  NASA POWER API │────────────────>│  Transform to   │
│  (AG community) │                 │  DailyClimate   │
│  PRECTOTCORR,   │                 │  Data[]         │
│  T2M, T2M_MAX,  │     failure     └────────┬────────┘
│  T2M_MIN, RH2M  │──────┐                   │
└─────────────────┘      v                    │
                  ┌─────────────────┐         │
                  │  Open-Meteo API │         │
                  │  (Archive)      │─────────┤
                  │  precip_sum,    │         │
                  │  temp_2m_*      │         │
                  └─────────────────┘         │
                                              v
                                    ┌─────────────────┐
                                    │  Upsert to      │
                                    │  climate_records│
                                    │  (Supabase)     │
                                    └────────┬────────┘
                                             v
                                    ┌─────────────────┐
                                    │  Calculate SPI  │
                                    │  (simplified or │
                                    │   full gamma)   │
                                    └────────┬────────┘
                                             v
                                    ┌─────────────────┐
                                    │  Update property│
                                    │  current_spi &  │
                                    │  spi_category   │
                                    └────────┬────────┘
                                             v
                                    ┌─────────────────┐
                                    │  Detect Events  │
                                    │  (if SPI exceeds│
                                    │   thresholds)   │
                                    └────────┬────────┘
                                             v
                                    ┌─────────────────┐
                                    │  Create/Update  │
                                    │  climate_events │
                                    └─────────────────┘
```

### NASA POWER API Details

- Endpoint: `https://power.larc.nasa.gov/api/temporal/daily/point`
- Community: `AG` (Agroclimatology)
- Parameters: `PRECTOTCORR` (precipitation), `T2M` (avg temp), `T2M_MAX`, `T2M_MIN`, `RH2M` (humidity)
- Missing value sentinel: `-999`
- Response format: JSON with `YYYYMMDD` date keys

### Open-Meteo Fallback

- Endpoint: `https://archive-api.open-meteo.com/v1/archive`
- Daily fields: `precipitation_sum`, `temperature_2m_mean`, `temperature_2m_max`, `temperature_2m_min`
- Timezone: `America/Sao_Paulo`
- Note: Does not provide humidity data

---

## 8. Screen Navigation Map

```
app/
├── _layout.tsx ─── RootLayout (I18nProvider > AuthProvider > Stack)
│
├── index.tsx ─── Entry point: redirects to (auth) or (app)
│
├── (auth)/ ─── Unauthenticated routes
│   ├── _layout.tsx ─── Auth Stack
│   ├── login.tsx ─── Email/password login
│   └── register.tsx ─── Registration with name + email + password
│
└── (app)/ ─── Authenticated routes (auth guard in _layout.tsx)
    ├── _layout.tsx ─── App Stack (redirects to auth if no session)
    │
    ├── (tabs)/ ─── Bottom Tab Navigator
    │   ├── _layout.tsx ─── Tab bar config (Dashboard, Add, Settings)
    │   ├── index.tsx ─── Dashboard
    │   │                  - Greeting with user name
    │   │                  - AlertBanner (horizontal scroll of alerts)
    │   │                  - Property list (PropertyCard per property)
    │   │                  - Pull-to-refresh
    │   │
    │   ├── add-property.tsx ─── Add Property
    │   │                       - Name, area, municipality, state fields
    │   │                       - PropertyMapPicker (GPS + manual coords)
    │   │
    │   └── settings.tsx ─── Settings
    │                       - Locale selector (PT-BR / EN-US / ES-LA)
    │                       - Profile information
    │                       - Sign out button
    │
    └── property/
        ├── _layout.tsx ─── Property Stack
        └── [id].tsx ─── Property Detail
                        - SPIGauge (visual gauge with color)
                        - ClimateDataCard (temp, humidity, precip)
                        - PrecipitationChart (90-day bar chart)
                        - EventHistoryList (active/past sections)
                        - PropertyMapView (read-only map)
```

### Navigation Flow

```
App Launch
    │
    v
Root Layout (load fonts, providers)
    │
    v
index.tsx (check auth)
    │
    ├── No session ──> (auth)/login
    │                      │
    │                      ├── Login success ──> (app)/(tabs)/
    │                      └── "Register" ──> (auth)/register
    │                                             │
    │                                             └── Register success ──> (app)/(tabs)/
    │
    └── Has session ──> (app)/(tabs)/
                            │
                            ├── Dashboard tab ──> Tap property ──> property/[id]
                            ├── Add Property tab
                            └── Settings tab ──> Sign out ──> (auth)/login
```

---

## 9. n8n Workflow Architecture

The `daily-climate-collection.json` defines an automated pipeline that runs daily at 06:00 UTC.

### Pipeline Stages

```
┌──────────────┐    ┌──────────────────┐    ┌───────────────────┐
│ Schedule     │    │ Fetch Active     │    │ Split Into        │
│ Trigger      │───>│ Properties       │───>│ Batches           │
│ (cron 0 6)   │    │ (Supabase REST)  │    │ (1 per property)  │
└──────────────┘    └──────────────────┘    └─────────┬─────────┘
                                                      │
                    ┌─────────────────────────────────┘
                    v
         ┌──────────────────┐    ┌──────────────────┐
         │ NASA POWER API   │───>│ Transform         │
         │ (per property    │    │ Response to       │
         │  lat/lon)        │    │ climate_records   │
         └──────────────────┘    └────────┬──────────┘
                                          │
         ┌──────────────────┐    ┌────────v──────────┐
         │ Open-Meteo API   │    │ Upsert Records    │
         │ (fallback if     │───>│ to Supabase       │
         │  NASA fails)     │    │ (service_role key) │
         └──────────────────┘    └────────┬──────────┘
                                          │
                                 ┌────────v──────────┐
                                 │ Calculate SPI     │
                                 │ (JavaScript node) │
                                 └────────┬──────────┘
                                          │
                                 ┌────────v──────────┐
                                 │ Update Property   │
                                 │ current_spi &     │
                                 │ spi_category      │
                                 └────────┬──────────┘
                                          │
                                 ┌────────v──────────┐
                                 │ Detect Events     │
                                 │ (threshold check) │
                                 └────────┬──────────┘
                                          │
                                 ┌────────v──────────┐
                                 │ Create Climate    │
                                 │ Events if needed  │
                                 └──────────────────┘
```

### Key Configuration

- **Authentication**: Uses Supabase `service_role` key via HTTP headers, bypassing RLS
- **Error handling**: NASA POWER failure triggers Open-Meteo fallback transparently
- **Idempotency**: Climate records use upsert on `(property_id, record_date)` composite key
- **Variables**: `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are stored as n8n environment variables

---

## 10. i18n System

### Architecture

```
┌──────────────────┐     ┌───────────────────┐     ┌─────────────────┐
│ I18nContext       │     │ i18n/index.ts     │     │ Translation     │
│                  │     │                   │     │ Files           │
│ locale (state)   │────>│ getDeviceLocale() │     │                 │
│ t() function     │     │ createTranslation │────>│ en-US.ts        │
│ setLocale()      │     │ Function()        │     │ pt-BR.ts        │
└──────────────────┘     └───────────────────┘     │ es-LA.ts        │
                                                   └─────────────────┘
```

### Locale Detection Priority

1. User's saved preference (if set in settings)
2. Device locale detection:
   - iOS: `SettingsManager.settings.AppleLocale` or `AppleLanguages[0]`
   - Android: `I18nManager.localeIdentifier`
   - Web: `navigator.language`
3. Fallback: `en-US`

### Translation Function

The `t(key, params?)` function resolves dot-notation keys against the current locale's flat translation dictionary. If a key is missing from the active locale, it falls back to `en-US`. Template parameters use `{{param}}` syntax:

```typescript
t("dashboard.greeting", { name: "Daniel" })
// "Hello, Daniel!" (en-US)
// "Ola, Daniel!" (pt-BR)
```

### Supported Languages

| Code  | Language               | Coverage |
|-------|------------------------|----------|
| pt-BR | Portuguese (Brazil)    | Full     |
| en-US | English (US)           | Full     |
| es-LA | Spanish (Latin America)| Full     |

---

## 11. Security

### Authentication Flow

```
┌───────────┐    ┌──────────────┐    ┌──────────────┐
│  User     │    │  Supabase    │    │  PostgreSQL  │
│  (App)    │    │  Auth        │    │  (RLS)       │
└─────┬─────┘    └──────┬───────┘    └──────┬───────┘
      │                 │                    │
      │  signUp(email,  │                    │
      │  password, name)│                    │
      │────────────────>│                    │
      │                 │  INSERT auth.users │
      │                 │───────────────────>│
      │                 │                    │
      │                 │  TRIGGER:          │
      │                 │  handle_new_user() │
      │                 │  INSERT public.users
      │                 │<───────────────────│
      │  JWT token      │                    │
      │<────────────────│                    │
      │                 │                    │
      │  API request    │                    │
      │  (Bearer JWT)   │                    │
      │────────────────>│  auth.uid()        │
      │                 │───────────────────>│
      │                 │  RLS policy check  │
      │                 │  (user_id = uid)   │
      │  Filtered data  │<───────────────────│
      │<────────────────│                    │
```

### RLS Policy Design

- **User isolation**: Every query is filtered by `auth.uid()`, ensuring users can only access their own data
- **Ownership chain**: `properties.user_id -> auth.uid()` for direct tables; subqueries like `property_id IN (SELECT id FROM properties WHERE user_id = auth.uid())` for related tables
- **Service role bypass**: The `service_role` key (used by n8n automation) has full access (`USING (true) WITH CHECK (true)`) to write climate records and events without user context
- **Auto-provisioning**: A database trigger on `auth.users` INSERT automatically creates a corresponding `public.users` profile row using `SECURITY DEFINER`

### Environment Variables

Required environment variables (see `.env.example`):

| Variable               | Purpose                                    |
|------------------------|--------------------------------------------|
| EXPO_PUBLIC_SUPABASE_URL    | Supabase project URL                  |
| EXPO_PUBLIC_SUPABASE_ANON_KEY | Supabase anonymous/public key       |
| SUPABASE_SERVICE_KEY   | Service role key (n8n only, never in app)  |
