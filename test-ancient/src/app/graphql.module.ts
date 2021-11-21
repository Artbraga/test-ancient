import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache, split} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import { OperationDefinitionNode } from 'graphql';

const uri = 'https://api-staging.csgoroll.com/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const ws = new WebSocketLink({
    uri: `ws://api-staging.csgoroll.com/graphql`,
    options: {
      reconnect: true,
    },
  });

  const http = httpLink.create({uri, withCredentials: true});
  const link = split(({query}) => {
    const {kind, operation} = <OperationDefinitionNode>getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  ws,
  http);
  return {
    link: link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
