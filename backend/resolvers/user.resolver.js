import { users } from "../dummyData/data.js";

const userResolver = {
  Query: {
    // here we get all these parameters parents,args,context,info
    users: () => {
      return users;
    },
    user: (_, { userId }) => {
      return users.find((user) => user._id === userId);
    },
  },
  Mutation: {},
};

export default userResolver;
