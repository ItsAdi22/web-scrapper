const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    // Use Axios to make a GET request to https://example.com
    const response = await axios.get('https://example.com');

    // Use Cheerio to load the HTML and extract the title
    const $ = cheerio.load(response.data);
    const title = $('title').text();

    // Send the title back to the client
    res.send(`Title: ${title}`);
  } catch (error) {
    // Handle errors
    console.error('Error fetching data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
