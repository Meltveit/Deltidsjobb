# Deltidsjobb - Jobbportal for Deltidsjobber

En moderne Next.js plattform for å legge ut og søke etter deltidsjobber i Norge.

## Funksjoner

✨ **For Jobbsøkere:**
- Søk og filtrer etter stillinger
- Filter etter by, sektor, og tags
- SEO-optimaliserte stillingsannonser
- Direkte kontakt med bedrifter

💼 **For Bedrifter:**
- 3-stegs wizard for å legge ut stillinger
- Velg opptil 6 tags for stillingen
- 650 kr for 60 dagers publisering
- Dashboard for å administrere stillinger
- Stripe betalingsintegrasjon (mock i dev-modus)

🎨 **Design:**
- Premium dark mode med glassmorphism
- Responsive design
- Smooth animasjoner
- Tailwind CSS

## Teknologi Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Autentisering:** NextAuth.js
- **Database:** MongoDB
- **Betaling:** Stripe (mock i dev)

## Kom i gang

### 1. Installer avhengigheter

Dependencies er allerede installert. Hvis du trenger å reinstallere:

\`\`\`bash
npm install
\`\`\`

### 2. Sett opp miljøvariabler

Kopier `.env.local.example` til `.env.local`:

\`\`\`bash
copy .env.local.example .env.local
\`\`\`

Deretter rediger `.env.local` med dine verdier:

\`\`\`env
# MongoDB - Opprett gratis database på https://www.mongodb.com/cloud/atlas
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/deltidsjobb?retryWrites=true&w=majority

# NextAuth - Generer secret med: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Stripe - Hent keys fra https://stripe.com/
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
\`\`\`

### 3. Start utviklingsserver

\`\`\`bash
npm run dev
\`\`\`

Åpne [http://localhost:3000](http://localhost:3000) i nettleseren.

## MongoDB Atlas Oppsett

1. Gå til [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Opprett en gratis konto
3. Lag et nytt cluster (M0 FREE tier)
4. Klikk "Connect" og velg "Connect your application"
5. Kopier connection string til `.env.local`
6. Erstatt `<username>` og `<password>` med dine database credentials

## Stripe Oppsett (Valgfritt for testing)

1. Opprett konto på [Stripe](https://stripe.com)
2. Gå til Developers → API keys
3. Kopier Publishable key og Secret key til `.env.local`

**Merk:** I dev-modus brukes mock betalinger, så Stripe setup er ikke påkrevd for testing.

## Prosjektstruktur

\`\`\`
Deltidsjobb/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── auth/            # Autentisering
│   │   ├── jobs/            # Jobb-relaterte endpoints
│   │   └── payment/         # Betaling
│   ├── auth/                # Auth pages (signin/signup)
│   ├── dashboard/           # Bedriftsdashboard
│   ├── jobb/[slug]/         # Job detail pages
│   ├── legg-ut-stilling/    # Job posting wizard
│   ├── betaling/            # Payment pages
│   ├── layout.js            # Root layout
│   ├── page.js              # Homepage
│   ├── globals.css          # Global styles
│   ├── sitemap.js           # SEO sitemap
│   └── robots.js            # SEO robots.txt
├── components/              # React components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── JobCard.jsx
│   ├── SearchBar.jsx
│   ├── StepWizard.jsx
│   └── SessionProvider.jsx
├── lib/                     # Utilities and models
│   ├── models/             # Database models
│   │   ├── User.js
│   │   └── Job.js
│   ├── mongodb.js          # Database connection
│   ├── constants.js        # App constants
│   └── utils.js            # Helper functions
├── package.json
├── tailwind.config.js
└── next.config.js
\`\`\`

## Bruk

### For Bedrifter

1. **Opprett konto** - Registrer bedriften din
2. **Legg ut stilling** - Fyll ut 3-stegs wizard
3. **Betal** - 650 kr for 60 dager (mock i dev)
4. **Administrer** - Rediger eller slett stillinger i dashboard

### For Jobbsøkere

1. **Søk** - Bruk søkefeltet på hjemmesiden
2. **Filtrer** - Etter by, sektor, eller tags
3. **Les** - Klikk på stillinger for detaljer
4. **Søk** - Send søknad via e-post

## SEO Optimalisering

✅ JSON-LD Structured Data (JobPosting schema)  
✅ Dynamic meta tags for alle sider  
✅ Open Graph tags  
✅ SEO-friendly URLs med slugs  
✅ Dynamic sitemap.xml  
✅ Robots.txt configuration  

## Betalingsintegrasjon

### Mock Betaling (Development)

I utviklingsmodus bruker appen mock betalinger. Når du klikker "Betal", aktiveres stillingen umiddelbart uten ekte betaling.

### Ekte Stripe (Production)

For produksjon, integrer ekte Stripe Checkout:

1. Oppdater `app/betaling/[jobId]/page.js`
2. Implementer Stripe Checkout session
3. Sett opp webhook for betalingsbekreftelse

## Deployment

### Vercel (Anbefalt)

1. Push koden til GitHub
2. Importer prosjektet på [Vercel](https://vercel.com)
3. Legg til environment variables
4. Deploy

### Andre platformer

Appen kan deployes til enhver Node.js hosting platform som støtter Next.js 14.

## Lisens

Privat prosjekt.

## Kontakt

For spørsmål eller support, kontakt [din@epost.no](mailto:din@epost.no)
