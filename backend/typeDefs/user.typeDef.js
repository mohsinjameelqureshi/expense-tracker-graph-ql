const userTypeDef = `#graphql

    # This defines the shape of a user object
    type User {
        _id:ID! #(!) means that a field is non-nullable,required it must always have a value.
        username: String!
        name: String!
        password: String!
        profilePicture: String!
        gender: String!
    }

    # This defines what read operations (queries) the client can perform.
    type Query {
        users:[User!]
        authUser: User
        user(userId:ID!): User
    }

    # These are write operations — how the client changes data.
    type Mutation {
        signUp(input:SignUpInput!): User
        login(input:LoginInput!): User
        logout: LogoutResponse
    }

    # They define what data clients must send in for a mutation.
    input SignUpInput {
        username: String!
        name: String!
        password: String!
        gender: String!
    }

    input LoginInput {
        username: String!
        password: String!
    }

    type LogoutResponse{
        message: String!
    }
`;

export default userTypeDef;
