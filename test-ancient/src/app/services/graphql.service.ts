import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";

const GET_USER = gql`
  {
    currentUser {
      id
      name
      wallets {
        id
        amount
        currency
      }
    }
  }
`;
const GET_BOXES = gql`
{
  boxes(free: false, purchasable: true, openable: true) {
    edges {
      node {
        id
        name
        iconUrl
        cost
      }
    }
  }
}
`;
const OPEN_BOX = gql`
  mutation OpenBox($input: OpenBoxInput!) {
    openBox(input: $input) {
      boxOpenings {
        id
        itemVariant {
          id
          name
          value
        }
      }
    }
  }
`;

const UPDATE_WALLET_SUBSCRIPTION = gql`
  subscription OnUpdateWallet {
    updateWallet {
      wallet {
        id
        amount
        name
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  public user = new BehaviorSubject<any>(null);

  constructor(private apollo: Apollo) {
  }

  public getBoxes(): Observable<any> {
    return this.apollo
    .watchQuery<any>({
      query: GET_BOXES
    })
    .valueChanges.pipe(map(result => result.data.boxes.edges));
  }

  public updateUser(): Observable<any> {
    let queryRef = this.apollo
    .watchQuery<any>({
      query: GET_USER
    });
    return queryRef.valueChanges.pipe(map(result => {
      this.user.next(result.data.currentUser);
      queryRef.subscribeToMore({
        document: UPDATE_WALLET_SUBSCRIPTION,
        updateQuery:(prev, {subscriptionData})  => {
            console.log(subscriptionData.data);
        }
      });
    }));
  }

  public openBox(input: {boxId: string, amount: number}) {
    return this.apollo.mutate({
      mutation: OPEN_BOX,
      variables: {
        input: input
      }
    })
  }
}
