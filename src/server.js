import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

const PORT = process.env.PORT || 3000;

app.use("/auth", authRoutes);

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () =>
        console.log(`User service running on port ${PORT}`)
    );
};

startServer();
