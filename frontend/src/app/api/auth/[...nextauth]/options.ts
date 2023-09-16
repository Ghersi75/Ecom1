import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'username or email',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { type: "text" },
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        // Fix this later
        // const user = { id: "42", name: "test", password: "test"}

        if ((credentials?.username || credentials?.email) && credentials?.password) {
          try {
            const res = await fetch("http://localhost:3000/api/users/login", {
              method: 'POST',
              body: JSON.stringify({
                email: credentials?.email,
                username: credentials?.username,
                password: credentials?.password
              }),
              headers: { "Content-Type": "application/json" }
            })

            // console.log(res)
  
            const user = await res.json()

            console.log(user)

            return {
              id: user.user_id,
              name: user.username,
              email: user.email
            }
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