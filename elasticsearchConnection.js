const { Client } = require("@elastic/elasticsearch");

const config = {
  node: "http://localhost:9200",
  auth: {
    username: "elastic",
    password: "elastic",
  },
};

const esClient = new Client(config);

async function connection() {
  try {
    const info = await esClient.info();
    console.log(
      `Connected to Elasticsearch cluster: ${info.cluster_name} (version: ${info.version.number})`
    );
  } catch (error) {
    console.error(`Error connecting to Elasticsearch: ${error}`);
  }
}

module.exports = {
  config: config,
  client: esClient,
  connection: connection,
};
