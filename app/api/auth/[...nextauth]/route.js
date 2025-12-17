import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { findUserByEmail, verifyPassword } from '@/lib/models/User';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Vennligst fyll ut alle feltene');
                }

                const user = await findUserByEmail(credentials.email);

                if (!user) {
                    throw new Error('Feil e-post eller passord');
                }

                const isPasswordValid = await verifyPassword(user, credentials.password);

                if (!isPasswordValid) {
                    throw new Error('Feil e-post eller passord');
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    companyName: user.companyName,
                    contactPerson: user.contactPerson,
                };
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.companyName = user.companyName;
                token.contactPerson = user.contactPerson;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.companyName = token.companyName;
                session.user.contactPerson = token.contactPerson;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
