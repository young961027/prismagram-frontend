import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
// import { createHttpLink } from "apollo-link-http";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  link: { uri: "http://localhost:4000" },
  cache: new InMemoryCache(),
  clientState: {
    defaults,
    resolvers,
  },
});
