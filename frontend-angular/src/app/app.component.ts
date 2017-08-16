import { Component, OnInit } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';

const postsQuery = gql`
  query getPosts {
    posts {
      title
      text
      author {
        firstName
      }
    }
  }
`;

const authorsQuery = gql`
query getAuthors {
  authors {
    id
    firstName
    lastName
    posts {
      title
      text
    }
  }
}
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'app';
  posts: ApolloQueryObservable<any>;
  authors: ApolloQueryObservable<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.posts = this.apollo.watchQuery({ query: postsQuery });
    this.authors = this.apollo.watchQuery({ query: authorsQuery });
  }
}
