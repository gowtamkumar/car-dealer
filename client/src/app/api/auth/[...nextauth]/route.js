import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/v1/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })
        const user = await res.json()
        if (res.ok && user) {
          return user.data
        } else {
          throw new Error('Invalid Login Credentials')
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  // },

  session: { strategy: 'jwt', maxAge: 7 * 24 * 60 * 60 }, //7 day
  callbacks: {
    async session({ session, token, apiToken }) {
      // set user all data
      const sanitizedToken = Object.keys(token).reduce((p, c) => {
        if (c !== 'iat' && c !== 'exp' && c !== 'jti') {
          return { ...p, [c]: token[c] }
        } else {
          return p
        }
      }, {})
      // auth all data
      return {
        ...session,
        user: { ...sanitizedToken.user, token: sanitizedToken.token },
        token: { exp: token.exp, iat: token.iat, jti: token.jti },
      }
    },
    async jwt({ token, user, account, profile }) {
      if (typeof user !== 'undefined') {
        return user
      }
      return token
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
