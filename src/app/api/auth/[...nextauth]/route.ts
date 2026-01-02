import NextAuth, { DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

// Extend NextAuth types to include id in session
declare module "next-auth" {
    interface Session {
        user: {
            id: string
        } & DefaultSession["user"]
    }
    interface User {
        id: string
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Hardcoded credentials cho MVP
                // Sau này có thể mở rộng check với database
                if (
                    credentials?.username === process.env.ADMIN_USERNAME &&
                    credentials?.password === process.env.ADMIN_PASSWORD
                ) {
                    return {
                        id: "admin",
                        name: "Admin",
                        email: "admin@flowershop.com",
                    }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
            }
            return session
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
