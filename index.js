const { ApolloServer, gql } = require('apollo-server-cloud-functions');
const { GraphQLJSON } = require('graphql-type-json');
const { BigQuery } = require('@google-cloud/bigquery');

const bigquery = new BigQuery();

const typeDefs = gql`
  scalar JSON

  type Query {
    transactions(projectId: String, dataset: String, table: String, fields: [String]): [JSON]
  }
`;
const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    transactions: async (_, params) => {
      const query = `SELECT ${params.fields.join(",")}
      FROM \`${params.projectId}.${params.dataset}.${params.table}\`
      LIMIT 100`;

      const options = {
        query: query,
      };

      const [job] = await bigquery.createQueryJob(options);
      const [rows] = await job.getQueryResults();

      return rows;
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    headers: req.headers,
    req,
    res,
  }),
});

exports.handler = server.createHandler();