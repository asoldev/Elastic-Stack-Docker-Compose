const express = require("express");
const { Client } = require("@opensearch-project/opensearch");
const { Document } = require("langchain/document");
const { VectorDBQAChain } = require('langchain/chains')
const { OpenAI, OpenAIEmbeddings } = require("@langchain/openai");
const { OpenSearchVectorStore } = require("langchain/vectorstores/opensearch");

const elasticsearchLangchainRoutes = express.Router();
const elasticsearch = require("./elasticsearchConnection");

const client = elasticsearch.client;

elasticsearchLangchainRoutes.post("/search/:index", async (req, res) => {
  try {
    const { index } = req.params;
    const { keyword } = req.body;

    const clientArgs = {
      client: client,
      indexName: index ?? "learning",
    };

    const vectorStore = new OpenSearchVectorStore(new OpenAIEmbeddings({}), {
      client,
    });

    const model = new OpenAI({});
    const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
      k: 1,
      returnSourceDocuments: true,
    });
    const response = await chain.call({ query: keyword });

    res.json(response)
  } catch (error) {
    console.error(`Error langchain: ${error}`);
  }
});

module.exports = elasticsearchLangchainRoutes;
