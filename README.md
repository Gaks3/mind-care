# MindCare 🧠

**MindCare** adalah platform kesehatan mental modern yang menawarkan konsultasi
berbasis AI, artikel dari psikolog, dan booking jadwal dengan psikolog.

## 🌟 Fitur Utama

- 🔐 **Autentikasi** dengan Better Auth
- 📅 **Booking Jadwal** dengan Psikolog
- 🤖 **Konsultasi AI** didukung oleh Scikit-Learn
- 📖 **Artikel Kesehatan Mental** yang dibuat oleh Psikolog
- 🧘 **Tes Kesehatan mental** tanpa model AI
- 🧩 **Dashboard Pengguna & Psikolog**

## 🛠 Teknologi yang Digunakan

- **Frontend**: [Next.js](https://nextjs.org/) (App Router)
- **Backend**: [Hono.js](https://hono.dev/) (API)
- **Database**: PostgreSQL +
  [Prisma ORM](https://www.prisma.io/?utm_source=docs)
- **Autentikasi**: [Better Auth](https://www.better-auth.com/)
- **Model AI**: Python (Scikit-learn) melalui Flask API
- **Package Manager**: [pnpm](https://pnpm.io/)

## 🚀 Get Started

Ikuti langkah-langkah berikut untuk menyiapkan dan menjalankan proyek secara
lokal.

### Prasyarat

- Node.js (v18 atau lebih tinggi)
- pnpm
- PostgreSQL
- Python (untuk model AI)

### Instalasi

1. **Clone Repositori**

```bash
  git clone https://github.com/arkhanardana/mindcare-model.git
  cd mindcare-model
```

2. **Copy file .env.example**

```bash
  cp .env.example .env
```

3. **Configure Environment Variables**

```env
  DATABASE_URL=your_database_url_here
  BETTER_AUTH_SECRET=your_generated_secret_here
  BETTER_AUTH_URL=http://localhost:3000
```

4. **Install dependencies**

```bash
  pnpm install
```

5. **Generate Prisma Client**

```bash
  pnpm prisma generate
```

6. **Clone repositori Model AI**

    Clone [disini](https://github.com/arkhanardana/mindcare-model), ikuti instruksi di
    repositori tersebut untuk instalasi dan running server Model AI

7. **Run the server**

```bash
  pnpm dev
```

8. **Open the browser**

    Buka [http://localhost:3000](http://localhost:3000) di browser.
