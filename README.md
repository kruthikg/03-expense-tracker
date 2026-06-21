# Expense Tracker

A full stack expense tracker where you can log in, add your expenses, and see
where your money goes with simple charts.

🔗 **Live demo:** https://03-expense-tracker-dun.vercel.app/

## Tech
- **Frontend:** React, TypeScript, Vite, Chart.js
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JSON Web Tokens (JWT)

## Project structure
```
client/   the React frontend
server/   the Express + MongoDB backend
```

## Running locally

You need two terminals — one for the server and one for the client.

**Server**
```bash
cd server
npm install
cp .env.example .env   # then fill in the values
npm run dev
```
Runs on http://localhost:5000

**Client**
```bash
cd client
npm install
npm run dev
```
Runs on http://localhost:5173

## Deployment
- **Frontend:** Vercel (import the repo, root directory `client`)
- **Backend:** Render (root directory `server`, start command `npm start`)
- **Database:** MongoDB Atlas (free cluster)

Set `VITE_API_URL` on Vercel to the deployed server URL, and add `MONGO_URI`
and `JWT_SECRET` as environment variables on Render.
