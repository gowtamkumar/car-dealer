import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const res = await fetch('http://localhost:3900/api/v1/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })
        const user = await res.json()
        if (res.ok && user) {
          return user.data.user
        } else {
          throw new Error('Invalid Login Credentials')
        }
      },
    }),
  ],
  //   pages: {
  //     signIn: '/auth/signin',
  //     signOut: '/auth/signout',
  //     error: '/auth/error', // Error code passed in query string as ?error=
  //     verifyRequest: '/auth/verify-request', // (used for check email message)
  //     newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  //   },
  callbacks: {
    async session({ session, token }) {
      return { session, token }
    },
    async jwt({ token, user }) {
      return token
    },
  },
})

export { handler as GET, handler as POST }
