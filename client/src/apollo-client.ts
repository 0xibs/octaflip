import { ApolloClient, InMemoryCache } from "@apollo/client";
import { CONFIG } from "./config";

const apollo_client = new ApolloClient({
  uri: CONFIG.GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

export default apollo_client;
