require ("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('./config/db').connect();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const posRequestRoutes = require("./routes/posRequestRoutes");
app.use("/pos-merchant/pos", posRequestRoutes);

app.get("/pos-merchant", (req, res) => {
  res.json({ message: "Server is running" });
});

app.get('/pos-merchant/health', (req, res) => {
  res.status(200).send('OK')
})

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 