const express = require("express");
const { v4 } = require("uuid");
const elasticsearchRoutes = express.Router();
const elasticsearch = require("./../config/elasticsearchConnection");

const client = elasticsearch.client;

elasticsearchRoutes.post("/create", async (req, res) => {
  try {
    const { index, body } = req.body;

    const response = await client.index({
      index,
      id: v4(),
      body,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error, message: error.message });
  }
});

elasticsearchRoutes.post("/search/:index", async (req, res) => {
  try {
    const { index } = req.params;
    const { keyword } = req.body;
    const response = await client.search({
      index,
      q: keyword,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error, message: error.message });
  }
});

elasticsearchRoutes.get("/read/:index", async (req, res) => {
  try {
    const { index } = req.params;
    const response = await client.search({
      index: index,
    });

    res.json(response.hits.hits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

elasticsearchRoutes.get("/read/:index/:id", async (req, res) => {
  try {
    const { index, id } = req.params;
    const response = await client.get({
      index,
      id,
    });
    res.json(response);
  } catch (error) {
    res.status(404).json({ error: "Document not found" });
  }
});

elasticsearchRoutes.put("/update/:index/:id", async (req, res) => {
  try {
    const { index, id } = req.params;
    const { body } = req.body;
    const response = await client.update({
      index,
      id,
      body: {
        doc: body,
      },
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

elasticsearchRoutes.delete("/delete/:index/:id", async (req, res) => {
  try {
    const { index, id } = req.params;
    const response = await client.delete({
      index,
      id,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = elasticsearchRoutes;
