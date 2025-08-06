# 🧾 Flowceipt

**AI-powered invoice extraction and payment system.**  
Monorepo powered by `pnpm` — clean, fast, and modular.

---

## 📁 Project Structure

```
Flowceipt/
│
├── package.json            # Root workspace
├── pnpm-workspace.yaml     # Workspace configuration
│
├── Client/                 # Frontend (Vite + React)
│   ├── package.json
│   └── ...
│
└── Server/                 # Backend (Express + Stripe + OCR)
    ├── package.json
    └── ...
```

---

## 📦 Tech Stack

### 🖥️ Client

- **Vite** + **React**
- **Tailwind CSS**
- File upload & preview

### 🛠️ Server

- **Express.js**
- **Stripe API** (payments)
- **Tesseract.js** or **Google Vision API** (OCR)

---

## 🛠️ Setup Instructions

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

### 🧰 Install Dependencies

From the **root directory**:

```bash
pnpm install
```

This installs dependencies for both `Client` and `Server`.

---

## 🚀 Development Scripts

From root:

```bash
pnpm dev:client     # Starts frontend (Vite dev server)
pnpm dev:server     # Starts backend (nodemon with ts)
```

From individual directories:

```bash
cd Client && pnpm dev
cd Server && pnpm dev
```

---

## 🧪 Build Scripts

```bash
pnpm build:client   # Builds the Vite frontend
pnpm build:server   # Compiles the TypeScript backend
```

---

## 🚀 Deployment

- **Client** → [Vercel](https://vercel.com/) or any vite-compatible host
- **Server** → [Render](https://render.com/) or any Node.js-compatible host

Each can be deployed **independently** from its own subdirectory.

---

## ⚙️ Scripts Summary (in root `package.json`)

```json
{
  "scripts": {
    "dev:client": "pnpm --filter Client dev",
    "dev:server": "pnpm --filter Server dev",
    "build:client": "pnpm --filter Client build",
    "build:server": "pnpm --filter Server build"
  }
}
```
