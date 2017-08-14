# GraphQL Example
This project is based in apollo-tutorial-kit (formerly apollo-starter-kit), the starting point for the Apollo GraphQL Server tutorial. See also [Tutorial: How to build a GraphQL server](https://medium.com/apollo-stack/tutorial-building-a-graphql-server-cddaa023c035#.wy5h1htxs) and the solution in the `server-tutorial-solution` branch of this repo.

```sh
git clone https://github.com/apollostack/apollo-starter-kit
cd apollo-starter-kit
npm install
npm run start
```

## Build and run
- To install
```sh
npm install & npm start
```
- GraphQL will be running on http://localhost:${GRAPHQL_PORT}/graphql
- GraphiQL will be running on http://localhost:${GRAPHQL_PORT}/graphiql

## Test
- GraphQL queries to execute with GraphiQL
```
{
  author(firstName:"Edmond", lastName: "Jones"){
    firstName
    lastName
    posts{
      title
      views
    }
  }
}
```

```
{
  author(firstName: "Edmond", lastName: "Jones") {
    firstName
    lastName
  }
  getFortunerCookie
}
```

```
mutation {
  createPost(post: {
    title: "Mutated Post"
    text: "Mutation text"
    authorId: 2
  }) {
    id
  	title
  	text
  	views
  	author {
  	  id
  	}
  }
}
```