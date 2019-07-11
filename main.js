const express = require("express");

const config = require("./config");

const app = express();

// Add body-parser middleware
app.use(require("body-parser").json());
// Add morgan logger middleware
app.use(require("morgan")("combined"));

// Bot endpoint
app.post("/bot", (req, res) => {
  console.log("Received body: ", req.body);
  res.send();
});

app.listen(config.port, () => {
  console.log(`application started on port ${config.port}`);
});
