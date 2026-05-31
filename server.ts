import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Body parser with size limits for scanner simulation (mock camera captures)
app.use(express.json({ limit: "15mb" }));

// Lazy initializer for Gemini Client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set in environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY_FOR_PREVIEW",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. API: Analyze Inventory and Sales data
app.post("/api/gemini/analyze", async (req, res) => {
  try {
    const { items, query } = req.body;
    const ai = getGeminiClient();

    const systemPrompt = `Anda adalah Nexora Smart AI, konsultan operasional bisnis dan analis inventory ahli untuk aplikasi "Inventory Nexora AI". 
Tugas Anda adalah menganalisis data inventaris, tingkat stok, penjualan multi-marketplace, dan memberikan analisis strategi operasional yang mendalam dalam Bahasa Indonesia.
Berikan saran praktis, prediksi barang terlaris, rekomendasi restock (reorder points), dan efisiensi pengemasan. 
Jawablah dengan gaya profesional, optimis, mudah dipahami, dan berikan solusi konkret untuk meningkatkan efisiensi operasional bisnis (ingat bahwa Nexora AI meningkatkan efisiensi hingga 380%). 
Gunakan Markdown untuk format jawaban Anda agar indah dibaca di UI.`;

    const inventoryContext = JSON.stringify(items || []);
    const prompt = query 
      ? `Pertanyaan Pengguna: "${query}"\n\nData inventaris saat ini:\n${inventoryContext}`
      : `Lakukan analisis kesehatan operasional lengkap berdasarkan data inventaris saat ini:\n${inventoryContext}\n\nBerikan: 
1. Ringkasan Status Persediaan (Overstock vs Low Stock)
2. Rekomendasi Restock Segera dengan batas waktu logistik
3. Analisis Kinerja Penjualan Multi-Marketplace (Simulated)
4. Tips Optimasi Operasional Nexora untuk mencapai efisiensi 380%`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Analyze Error:", error);
    res.status(500).json({ error: error.message || "Gagal melakukan analisis AI." });
  }
});

// 2. API: Smart Scan Simulator - AI Product Extraction
app.post("/api/gemini/scan", async (req, res) => {
  try {
    const { imageBase64, barcode } = req.body;
    const ai = getGeminiClient();

    const systemPrompt = `Anda adalah "Nexora Smart Scan Engine" didukung AI. 
Tugas Anda adalah mengidentifikasi barcode, kode SKU, atau gambar barang yang discan, mengekstrak informasi detail produk, dan mengemasnya dalam format JSON terstruktur lengkap dengan nama produk, perkiraan kategori, deskripsi komersial, harga saran, berat, dan dimensi kemasan yang direkomendasikan untuk logistik.
Bahasa respon: Bahasa Indonesia.`;

    let contents: any[] = [];
    let promptString = "";

    if (imageBase64) {
      // Image scanning support
      contents.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64
        }
      });
      promptString = `Analisis gambar produk yang discan ini. Ekstrak deskripsi barang, berikan estimasi stok, nama produk yang tepat untuk marketplace (Tokopedia/Shopee), kode produk acak SKU, dan tips pengemasan optimal agar hemat ongkir.`;
    } else {
      promptString = `Simulasikan pencarian cerdas berbasis AI untuk Barcode/SKU: ${barcode || "8991234567890"}. Berikan detail produk fiktif yang sangat realistis (seperti makanan ringan, alat elektronik rumah tangga, kosmetik, atau fashion lokal) beserta deskripsi, harga eceran, kategori, berat, dan instruksi logistik pengemasan yang efisien.`;
    }

    contents.push({ text: promptString });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT" as any,
          properties: {
            success: { type: "BOOLEAN" as any },
            productName: { type: "STRING" as any, description: "Nama produk yang komersial" },
            category: { type: "STRING" as any, description: "Kategori produk (misal: Elektronik, Fashion, F&B, Kosmetik)" },
            sku: { type: "STRING" as any, description: "Format SKU unik seperti NEX-XXXX" },
            description: { type: "STRING" as any, description: "Deskripsi singkat dan menarik untuk marketplace" },
            estimatedPrice: { type: "NUMBER" as any, description: "Harga ritel yang disarankan dalam Rupiah" },
            dimensions: { type: "STRING" as any, description: "Dimensi kemasan yang disarankan (contoh: 12x10x5 cm)" },
            handlingNotes: { type: "STRING" as any, description: "Instruksi pengemasan khusus (contoh: Fragile, butuh bubble wrap tebal)" }
          },
          required: ["productName", "category", "sku", "description", "estimatedPrice", "dimensions", "handlingNotes"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini Scan Error:", error);
    res.status(500).json({ error: error.message || "Gagal melakukan pemindaian cerdas." });
  }
});

// Setup Vite & Static Files Hosting
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Inventory Nexora AI server running on http://localhost:${PORT}`);
  });
}

setupServer();
