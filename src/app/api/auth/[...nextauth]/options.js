import { User } from "@/lib/database/models/User";
import { connectToDatabase } from "@/lib/database/utils";
import { CodeSquare, CookieIcon } from "lucide-react";
import bcrypt from "bcrypt";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log("github profile:", profile);
        return profile;
      },
      clientId: process.env.GITHUBCLIENT_ID,
      clientSecret: process.env.GITHUBCLIENT_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("google profile:", profile);
        return profile;
      },
      clientId: process.env.GOOGLECLIENT_ID,
      clientSecret: process.env.GOOGLECLIENT_SECRET,
    }),
    CredentialProvider({
      name: "Cred",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      // this is used to compare passwords with the saved password
      async authorize(credential) {
        try {
          console.log("The auth function is running shreyash", credential);
          await connectToDatabase();
          const foundUser = await User.findOne({ email: credential.email });
          console.log(credential);
          if (foundUser) {
            console.log(
              "User exits in db",
              foundUser,
              foundUser.password,
              credential.password
            );
            const match = await bcrypt.compare(
              credential.password,
              foundUser.password
            );
            console.log(match);
            if (match) {
              console.log("good match");
              delete foundUser.password;
              return foundUser;
            }
          }
        } catch (err) {
          console.log("Error in validating user with credential", err);
          // throw err;
        }
        return null;
      },
    }),
  ],
  // pages: {
  //   signIn: "/login",
  //   signOut: "/api/auth/signout",
  // },
  callbacks: {
    // this is for server side
    async jwt(token, user) {
      return token;
    },
    // this is for client side
    async session(session, token) {
      return session;
    },
    async signIn(user, account, profile) {
      // console.log("user", user, "account", account, "profile", profile);
      try {
        await connectToDatabase();
        console.log("lll", user.user.email);
        const curUser = await User.findOne({ email: user.user.email });
        if (!curUser) {
          const newUser = new User({
            email: user.user.email,
            name: user.user.name,
            img: user.user.avatar_url,
          });
          await newUser.save();
        }
      } catch (err) {
        console.log("Failed while creating user");
        console.log(err);
        return false;
      }
      return true;
    },
  },
};
