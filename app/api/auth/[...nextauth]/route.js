import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectDB } from "@/Backend/lib/db"  // adjust path as needed
import GoogleUsers from "@/Backend/models/GoogleUserModel" // adjust path as needed

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB();

      const existingUser = await GoogleUsers.findOne({ email: user.email });

      if (!existingUser) {
        await UserInfo.create({
          name: user.name,
          email: user.email,
          profileImage: user.image,
          
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        const dbUser = await GoogleUsers.findOne({ email: user.email });

        token.id = dbUser._id;
        token.email = dbUser.email;
        token.name = dbUser.name;
        token.image = dbUser.image;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        image: token.image,
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
