import express from "express";
import cors from "cors";
import morgan from "morgan";
// Use the pure-JS Magika class (browser build) which uses @tensorflow/tfjs.
// We bypass the package.json exports map (which forces tfjs-node in Node.js)
// by importing the CJS file directly via absolute path.
import { createRequire } from "module";
import { join as pathJoin } from "path";
const require = createRequire(import.meta.url);
const magikaPath = pathJoin(process.cwd(), "node_modules", "magika", "dist", "cjs", "magika.js");
const { Magika } = require(magikaPath);
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFile } from "fs/promises";

import { uploadMiddleware } from "./middleware/upload.js";
import { createRoutes } from "./routes/detect.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

async function bootstrap() {
  // ── Initialize Magika model (one-time load) ──────────────────────────
  console.log("⏳ Loading Magika model…");
  const magika = await Magika.create();
  console.log("✅ Magika model loaded successfully!");

  // ── Express app ──────────────────────────────────────────────────────
  const app = express();

  // Middleware
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Serve static landing page
  app.use(express.static(join(__dirname, "..", "public")));

  // API Routes
  app.use("/api", createRoutes(magika));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "magika-api",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  // 404 handler
  app.use((_req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
  });

  // Global error handler
  app.use((err, _req, res, _next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error", message: err.message });
  });

  app.listen(PORT, HOST, () => {
    console.log(`\n🚀 Magika API running at http://${HOST === "0.0.0.0" ? "localhost" : HOST}:${PORT}`);
    console.log(`📖 API Docs:   http://localhost:${PORT}`);
    console.log(`❤️  Health:     http://localhost:${PORT}/api/health\n`);
  });
}

bootstrap().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
