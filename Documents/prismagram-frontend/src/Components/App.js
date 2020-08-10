import React from "react";
import { gql } from "graphql-tag";
import styled, { ThemeProvider } from "styled-components";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import AppRouter from "./Router";
import Footer from "./Footer";
import Client from "../Apollo/Client";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 935px;
  width: 100%;
`;

export default () => {
  const {
    data: { isLoggedIn },
  } = useQuery(QUERY);

  return (
    <ApolloProvider client={Client}>
      <ThemeProvider theme={Theme}>
        <Wrapper>
          <GlobalStyles />
          <AppRouter isLoggedIn={isLoggedIn} />
          <Footer />
          <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
        </Wrapper>
      </ThemeProvider>
    </ApolloProvider>
  );
};
