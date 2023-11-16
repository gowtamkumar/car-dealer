import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
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
        // console.log('🚀 ~ user:', user)

        if (res.ok && user) {
          return user.data.user
        } else {
          throw new Error('Invalid Login Credentials')
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  //   pages: {
  //     signIn: '/auth/signin',
  //     signOut: '/auth/signout',
  //     error: '/auth/error', // Error code passed in query string as ?error=
  //     verifyRequest: '/auth/verify-request', // (used for check email message)
  //     newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  //   },
  callbacks: {
    async jwt({ token, user }) {
      return token
    },
    async session({ session, token }) {
      return { session, token }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
