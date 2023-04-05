import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi} from 'openai';

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  basePath: 'https://api.openai.com/v1',
});

const openai = new OpenAIApi(config);

router.route('/test').get((req, res) => {
  res.status(200).json({ message: "test from DALL.E ROUTES" })
})

router.route('/image').post(async (req, res) => {
  const { prompt } = req.body;
  try {
    
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });
    
    const imageUrl = response.data.data[0].b64_json;

    res.status(200).json({ photo: imageUrl });

  } catch (error) {
    console.log('error')
    res.status(500).json({ error });
  }
})

export default router;