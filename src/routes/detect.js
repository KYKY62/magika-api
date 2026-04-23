import { Router } from "express";
import { uploadMiddleware } from "../middleware/upload.js";
import { formatPrediction } from "../utils/mime-map.js";

/**
 * Create detection routes bound to a pre-loaded Magika instance.
 * @param {import("magika").Magika} magika
 */
export function createRoutes(magika) {
  const router = Router();

  // ────────────────────────────────────────────────────────────────────
  // POST /api/detect/file
  // Upload one or more files via multipart form-data (field name: "file")
  // ────────────────────────────────────────────────────────────────────
  router.post("/detect/file", uploadMiddleware.array("file", 10), async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No file(s) uploaded. Use field name 'file'." });
      }

      const results = await Promise.all(
        req.files.map(async (file) => {
          const result = await magika.identifyBytes(new Uint8Array(file.buffer));
          return {
            fileName: file.originalname,
            fileSize: file.size,
            detection: formatPrediction(result),
          };
        })
      );

      res.json({
        success: true,
        count: results.length,
        results,
      });
    } catch (err) {
      console.error("detect/file error:", err);
      res.status(500).json({ error: "Detection failed", message: err.message });
    }
  });

  // ────────────────────────────────────────────────────────────────────
  // POST /api/detect/bytes
  // Send raw bytes as base64-encoded JSON body
  // Body: { "bytes": "<base64 string>", "fileName": "optional.txt" }
  // ────────────────────────────────────────────────────────────────────
  router.post("/detect/bytes", async (req, res) => {
    try {
      const { bytes, fileName } = req.body;

      if (!bytes) {
        return res.status(400).json({ error: "Missing 'bytes' field (base64-encoded)." });
      }

      const buffer = Buffer.from(bytes, "base64");
      const result = await magika.identifyBytes(new Uint8Array(buffer));

      res.json({
        success: true,
        fileName: fileName || null,
        fileSize: buffer.length,
        detection: formatPrediction(result),
      });
    } catch (err) {
      console.error("detect/bytes error:", err);
      res.status(500).json({ error: "Detection failed", message: err.message });
    }
  });

  // ────────────────────────────────────────────────────────────────────
  // POST /api/detect/url
  // Fetch a remote URL and detect its file type
  // Body: { "url": "https://example.com/image.png" }
  // ────────────────────────────────────────────────────────────────────
  router.post("/detect/url", async (req, res) => {
    try {
      const { url } = req.body;

      if (!url) {
        return res.status(400).json({ error: "Missing 'url' field." });
      }

      const response = await fetch(url);
      if (!response.ok) {
        return res.status(400).json({ error: `Failed to fetch URL: ${response.statusText}` });
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const result = await magika.identifyBytes(buffer);

      res.json({
        success: true,
        url,
        fileSize: buffer.length,
        detection: formatPrediction(result),
      });
    } catch (err) {
      console.error("detect/url error:", err);
      res.status(500).json({ error: "Detection failed", message: err.message });
    }
  });

  return router;
}
