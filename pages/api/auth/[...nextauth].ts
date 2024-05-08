import NextAuth from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';

export const authOptions =  {
    providers: [
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID!,
            clientSecret: process.env.NAVER_CLIENT_SECRET!
        }),
        // add more provider
    ],
    debug: true
}

export default NextAuth(authOptions);
