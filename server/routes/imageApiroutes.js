// import express from 'express';
// import { textToImage } from '@huggingface/inference';

// const router = express.Router();


// router.post('/', async (req, res) => {
//   const { prompt } = req.body;
//   if (!prompt) return res.status(400).json({ error: 'Prompt is required.' });

//   try {
//     const token = "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"
//     const imageBuffer = await textToImage({
//       token,
//       model: "stabilityai/stable-diffusion-xl-base-1.0",
//       inputs: prompt,
//       options: { wait_for_model: true }
//     });

//     // Convert Buffer to base64 string
//     const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
//     res.status(200).json({ image: base64Image });
//   } catch (err) {
//     console.error("❌ Generation failed:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;



import express from 'express';
import fetch from 'node-fetch'; 
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: 'Prompt is required.' });

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`, // your token
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: prompt })
      }
    );

    if (!response.ok)
      throw new Error(`${response.status} ${await response.text()}`);

    const buffer = await response.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');
    res.json({ image: `data:image/jpeg;base64,${base64Image}` });
  } catch (err) {
    console.error('❌ Node-fetch error:', err);
    res.status(500).json({ error: err.message });
  }
});


export default router;
