import { Injectable } from '@angular/core';
import { Message } from '@tabletop-companion/api-interface';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export const sayHello = gql`
  query sayHello {
    sayHello(data: "") {
      message
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private readonly apollo: Apollo) {}

  getHello(): Observable<Message> {
    console.log('calling for graphql sayHello');
    return this.apollo
      .watchQuery<{ sayHello: Message }>({
        query: sayHello,
      })
      .valueChanges.pipe(
        map((result) => ({ message: result.data.sayHello.message })),
        tap((data) => console.log(data))
      );
  }
}
