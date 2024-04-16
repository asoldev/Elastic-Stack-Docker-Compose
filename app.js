const express = require("express");
const elasticsearchRoutes = require("./elasticsearchRoutes");
const elasticsearchLangchainRoutes = require("./elasticsearchLangchainRoutes");
const elasticsearch = require("./elasticsearchConnection");
const app = express();
const PORT = 3000;

app.use(express.json())
app.use("/elasticsearch", elasticsearchRoutes);
app.use("/elasticsearch-llms", elasticsearchLangchainRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  elasticsearch.connection();
});
