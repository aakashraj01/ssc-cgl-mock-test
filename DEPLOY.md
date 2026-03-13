# Deployment Guide — SSC CGL Mock Quiz App

## Quick Setup

### 1. MongoDB Atlas (Free)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a free account
2. Create a **free M0 cluster** (512MB, shared)
3. Create a database user (username/password)
4. In **Network Access**, add `0.0.0.0/0` to allow all IPs (needed for Vercel)
5. Click **Connect** → **Drivers** → Copy the connection string
6. Replace `<password>` in the string with your actual password
7. Add `/quizapp` before the `?` in the URI (database name)

Example:
```
mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/quizapp?retryWrites=true&w=majority
```

### 2. Deploy to Vercel
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the GitHub repo
3. Add environment variable: `MONGODB_URI` = your connection string from step 1
4. Deploy!

### 3. Seed the Database
After deployment, run this command once:
```bash
curl -X POST https://your-app.vercel.app/api/seed
```
This loads all 100 questions into MongoDB.

### 4. Take the Quiz!
Visit your deployed URL and start the exam.

## Local Development
```bash
# Copy env file and add your MongoDB URI
cp .env.local.example .env.local

# Install and run
npm install
npm run dev
```

## Tech Stack
- **Next.js 16** (App Router + API Routes)
- **MongoDB Atlas** (Free tier)
- **Tailwind CSS + shadcn/ui**
- **Vercel** (Free hosting)
