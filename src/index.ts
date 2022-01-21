import express from 'express';
import request from 'request-promise';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = process.env.SCRAPPER_API_KEY
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json());

app.get('/', (_, res) => {
  res.send("Welcome to Amazon Scrapper API");
});

app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(`${baseUrl}&url=https://www.amazon.fr/dp/${productId}`);

    res.json(JSON.parse(response));
  } catch (error) {
    console.log({ error });
    res.json(error);
  }
});

app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;

  try {
      const response = await request(`${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`);

      res.json(JSON.parse(response));
  } catch (error) {
    console.log({ error });

    res.json(error);
  }
});

app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params;

  try {
      const response = await request(`${baseUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`);

      res.json(JSON.parse(response));
  } catch (error) {
      res.json(error);
  }
});

app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;

  try {
      const response = await request(`${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`);

      res.json(JSON.parse(response));
  } catch (error) {
      res.json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
})