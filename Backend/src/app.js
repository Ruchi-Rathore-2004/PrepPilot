const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())

const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://preppilot-igij.onrender.com",
  "http://localhost:5173",
  "http://localhost:3000"
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, server-to-server requests)
    if (!origin) return callback(null, true);
    
    // Check if origin matches allowed list or any .onrender.com domain
    if (allowedOrigins.includes(origin) || origin.endsWith(".onrender.com")) {
      return callback(null, origin);
    }
    
    return callback(new Error("CORS origin not allowed: " + origin));
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

module.exports = app