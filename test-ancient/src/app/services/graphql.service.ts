import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
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
// const OPEN_BOX = gql`
// {
//   mutation OpenBox($input: OpenBoxInput!) {
//     openBox(input: $input) {
//       boxOpenings {
//         id
//         itemVariant {
//           id
//           name
//           value
//         }
//       }
//     }
//   }
// }
// `;

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  public getBoxes(): Observable<any> {
    return this.apollo
    .watchQuery<any>({
      query: GET_BOXES
    })
    .valueChanges.pipe(map(result => result.data.boxes.edges));
  }

  public getUser(): Observable<any> {
    return this.apollo
    .watchQuery<any>({
      query: GET_USER
    })
    .valueChanges.pipe(map(result => result.data.currentUser));
  }
}
