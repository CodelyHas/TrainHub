import "dotenv/config";
import express from "express";
import cors from "cors"

import scheduleRoutes from "./routes/scheduleRoutes.ts"
import passengerRoutes from "./routes/passengerRoutes.ts"
import reservationRoutes from "./routes/reservationRoutes.ts"
import authRoutes from "./routes/authRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";
import dashboardRoutes from "./routes/dashboardRoutes.ts";
import reportRoutes from "./routes/reportRoutes.ts";

const app = express();

console.log("Server file started"); 
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.get("/", (_req, res) => {
    res.send("API running...")
});

//inserts train schedule data in the database on submit
app.use("/schedules", scheduleRoutes);
app.use("/passengers", passengerRoutes);
app.use("/reservations", reservationRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/reports", reportRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});