// Schema for GraphQL
const schema = `
type User {
  id: ID!
  email: String!
  userName: String!
}
type Query {
  getUserByEmail(email: String!): User
  getUserByUserName(userName: String!): User
}
type Mutation {
  createUser(email: String!, userName: String!, password: String!): User
}
schema {
  query: Query
  mutation: Mutation
}
`;

module.exports = schema;

