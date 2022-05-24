import { Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import Navigation from "./src/Navigation";
import { onError } from "apollo-link-error";

const httpLink = new HttpLink({
  uri: "http://192.168.1.14:4200/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      Alert.alert(
        "Hey Something is Wrong !",
        `${message}`,
        [
          {
            text: "ok",
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      )
    );

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const Client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <>
      <ApolloProvider client={Client}>
        <Navigation />
      </ApolloProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
