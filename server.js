require ("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const posRequestRoutes = require("./routes/posRequestRoutes");
app.use("/api/pos", posRequestRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

const PORT = process.env.PORT || 5501;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 

  


