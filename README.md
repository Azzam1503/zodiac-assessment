# 📊 Data Visualizer

A full-stack data visualization tool built with **React**, **Cube.js**, **PostgreSQL**, and **Chart.js**. This project enables visual representation of your data using interactive charts like bar, line, pie, and more.

---

## 🧱 Stack Overview

- **Frontend**: React + Vite + Chart.js + Tailwind CSS
- **Backend**: Cube.js
- **Database**: PostgreSQL (used for ingesting CSV data)

---

## ⚙️ Setup Instructions

### 1. Clone the Project

```bash
git clone https://github.com/your-username/data-visualizer.git
cd data-visualizer
```

## 🗄️ Backend Setup (Cube.js)

### Step 1: Create and Configure Cube.js Backend

```bash
npx cubejs-cli create cube-backend -d postgres
cd cube-backend
```

### Step 3: Set Up `.env` in Cube.js Backend

Create a `.env` file in the `cube-backend` folder with the following content:

```env
CUBEJS_DB_TYPE=postgres
CUBEJS_DB_HOST=localhost
CUBEJS_DB_PORT=5432
CUBEJS_DB_NAME=your_database_name
CUBEJS_DB_USER=your_database_user
CUBEJS_DB_PASS=your_database_password
CUBEJS_API_SECRET=YOUR_CUBEJS_SECRET
CUBEJS_EXTERNAL_DEFAULT=true
CUBEJS_SCHEDULED_REFRESH_DEFAULT=true
CUBEJS_DEV_MODE=true
CUBEJS_SCHEMA_PATH=model
```

### Step 4: Run the backend
```bash
npm run dev
```

***

## 💻 Frontend Setup (React + Chart.js)
### Step 1: Navigate to Frontend

```bash
cd react-fronted
```

### Steo 2: Install Dependencies
```bash
npm install
```
### Steo 2: Add environment variables
Avialable on Cube.js Playground Also.
```env
VITE_CUBE_API_URL = YOUR_CUBE_API_URL
VITE_CUBE_API_TOKEN = YOUR_CUBE_API_TOKEN
VITE_CUBE_QUERY = {"measures":["Orders.count"],"timeDimensions":[{"dimension":"Orders.createdAt","granularity":"day"}],"filters":[]}
VITE_CUBE_PIVOT_CONFIG = {
VITE_CHART_TYPE = CHART_TYPE
VITE_CUBE_API_USE_WEBSOCKETS = false
VITE_CUBE_API_USE_SUBSCRIPTION = false
```

### Step 4: Run the frontend 
```bash
npm run dev
```

***
## 🗃️ Database Setup (PostgreSQL)
1. Make sure PostgreSQL is installed and running.
2. Create a database named your_database_name.
3. Ingest your CSV or dataset using any preferred method (psql, GUI tools, or scripts).
4. Define a corresponding schema in Cube.js schema/ folder or create with the cube.js playground.

