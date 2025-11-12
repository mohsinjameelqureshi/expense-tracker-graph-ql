import passport from "passport";
import { User } from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = () => {
  // Serialize user — store only the user ID in session
  passport.serializeUser((user, done) => {
    console.log("Serializing user...");
    done(null, user._id);
  });

  // Deserialize user — fetch the full user object from DB by ID
  passport.deserializeUser(async (id, done) => {
    console.log("Deserializing user...");
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Use GraphQLLocalStrategy correctly
  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(new Error("Invalid username or password"));
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
          return done(new Error("Invalid password"));
        }

        // Everything OK
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
};
