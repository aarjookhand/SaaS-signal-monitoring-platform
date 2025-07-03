# SaaS-signal-monitoring-platform


A mini full-stack SaaS application for signal visualization and analysis.

This tool allows users to log in, explore 1000 randomly generated signals, view their time-domain graphs, analyze the dominant frequency between 10–20 Hz, and see individual sine components for each signal — all in real-time.

---

## 🚀 Features

- **Authentication**: Secure login with JWT token
- **Signal Browser**: View list of all signals
- **Full Signal Viewer**: Graphical display of complete waveform
- **Real-Time Analysis**: Computes dominant frequency (10–20 Hz) and its amplitude
- **Sine Components Viewer**: Separate graph for 1–3 underlying sine waves
- **Protected Routes**: All signal routes are secured

---

## 🧱 Tech Stack

- **Frontend**: React + TypeScript + Recharts
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL
- **Auth**: JWT-based token auth
- **Containerized**: Docker + Docker Compose

---

## 📦 Installation

### 🔧 Requirements

- Docker
- Docker Compose

---

### ⚙️ Run the project

```bash
# Clone the repo
git clone https://github.com/your-username/signal-saas.git
cd signal-saas

# Switch to the dev branch
git checkout dev
git pull origin dev

# Start all services
docker-compose up --build
