import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      // name: 'username or email',
      
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { },
        username: { },
        password: { },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        if ((credentials?.username || credentials?.email) && credentials?.password) {
          try {
            console.log(credentials)
            const res = await fetch("http://localhost:3333/users/signin/credentials", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                provider: "credentials",
                email: credentials?.email,
                username: credentials?.username,
                password: credentials.password
              })
            });


            if (res.ok) {
              const user = await res.json();
              console.log("user: ", user);
              return {
                id: user.id,
                name: user.username,
                email: user.email,
                image: user.image
              }
            } else {
              console.error("Request failed:", res.status, res.statusText);
              return null
            }

            // console.log(res)
          }
          catch (e) {
            console.log("Error logging in with next-auth credentials: ", e)
            return null
          }
        }

        return null

  
        // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user
        // }
        // // Return null if user data could not be retrieved
        // return null
        ////
      }
    }),
    GoogleProvider({
      clientId: (process.env.GOOGLE_ID as string),
      clientSecret: (process.env.GOOGLE_SECRET as string),
      profile(profile, tokens) {
        console.log(profile)
        const username = profile.name
        const email = profile.email
        // Add a field for provider or login location in the database
        const password = "google"

        return {
          id: profile.sub
        }

        // return {
        //   id: profile.sub,
        //   name: profile.name,
        //   email: profile.email,
        //   image: profile.picture,
        // };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
      profile(profile, tokens) {
        console.log(profile)

        return {
          id: profile.id
        }
      }
    })
  ],
  pages: {
    "signIn": "/auth/signIn"
  }
}