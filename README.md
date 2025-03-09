# Mind Care

## Setup

### Copy file .env.example to .env

```sh
cp .env.example .env
```

### Configuration database url and beter auth secret

Generate better auth secret on [this link](https://www.better-auth.com/docs/installation).

### Install all dependencies

```sh
pnpm install
```

### Generate Prisma client

```sh
pnpm prisma generate
```

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
