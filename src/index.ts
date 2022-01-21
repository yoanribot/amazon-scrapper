import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (_, res) => {
  res.send("Welcome to Amazon Scrapper API");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
})