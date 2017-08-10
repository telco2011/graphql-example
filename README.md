# GraphQL Example
This project is based in apollo-tutorial-kit (formerly apollo-starter-kit), the starting point for the Apollo GraphQL Server tutorial. See also [Tutorial: How to build a GraphQL server](https://medium.com/apollo-stack/tutorial-building-a-graphql-server-cddaa023c035#.wy5h1htxs) and the solution in the `server-tutorial-solution` branch of this repo.

```sh
git clone https://github.com/apollostack/apollo-starter-kit
cd apollo-starter-kit
npm install
npm run start
```
## Dependencies
- A MongoDB connnection is necessary. 

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
    id: 20
    title: "Mutated Post"
    text: "Mutation text"
    views: 0
    authorId: 236
  }) {
    title
  }
}
```
## HandleErrors
https://medium.com/@tarkus/validation-and-user-errors-in-graphql-mutations-39ca79cd00bf