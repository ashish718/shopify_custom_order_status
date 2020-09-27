require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const app = express();

const port = process.env.PORT || 8000;
// Replace this with your HTTPS address
let shopifyAppInstallRoute = require("./routes/shopifyAppInstallRoute");
let orderWebhookRoute = require("./routes/orderWebhookRoute");

let db = require("./config/database.js");

// middlewares
app.use(cors());
app.use(express.json({ limit: "100mb" }));

//shopify app install middleware
app.use("/install", shopifyAppInstallRoute);
app.use("/order", orderWebhookRoute);


app.get("/status", (req, res) => {
  res.send("Active");
});

// app.post('/csv/test', upload.single('file'), async (req, res)=>{
//   let list_csv = await csv().fromString(req.file.buffer.toString());
//   list_csv = JSON.stringify(list_csv);
//   list_csv = JSON.parse(list_csv);
//   console.log(list_csv, "list_csv");
//   res.send(list_csv)
// })

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
