// this index file is used to merge TypeDefs

import { mergeTypeDefs } from "@graphql-tools/merge";
import transactionTypeDef from "./transaction.typeDef.js";
import userTypeDef from "./user.typeDef.js";

const mergedTypeDefs = mergeTypeDefs([userTypeDef, transactionTypeDef]);

export default mergedTypeDefs;
