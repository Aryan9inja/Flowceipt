import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.send("Hello from Flowceipt server!");
});

app.listen(PORT, () => {
  console.log("✅ Typescript added and server is running on port: ", PORT);
});
