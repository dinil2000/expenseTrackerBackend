// server.js
require("dotenv").config();
const app = require("./app");
const cron = require('node-cron');
const axios = require('axios');

// Set the server port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// ==========================
// Cron Job to Keep Server Alive
// ==========================
cron.schedule('*/10 * * * *', async () => {
  try {
      const url = `https://expensetrackerbackend-2-5yap.onrender.com`; // Replace with your actual Render URL
      const response = await axios.get(url);
      console.log(`Ping successful: ${response.status} - Server is alive.`);
  } catch (error) {
      console.error('Ping failed:', error.message);
  }
});
