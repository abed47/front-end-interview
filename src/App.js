import React from 'react';
import Container from '@material-ui/core/Container';
import SignUpForm from './components/SignUpForm'

import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from "apollo-cache-inmemory";

const link = createUploadLink({uri: "http://localhost:4000/graphql"});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

function App() {


  return (
    <ApolloProvider client={client}>
    <Container component="main" maxWidth="xs">
      <SignUpForm/>
    </Container>
    </ApolloProvider>
  );
}



export default App;
