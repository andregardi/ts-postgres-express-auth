import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { authController } from "./auth";
import { db } from "../db";
import { usersTable } from "../db/schema/users";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

const getUserByGoogleId = async (googleId: string) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.googleId, googleId))
    .limit(1);

  return user;
}

const getUserByEmail = async (email: string) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  return user;
}

const updateUserGoogleId = async (id: number, googleId: string) => {
  await db.update(usersTable)
    .set({
      googleId
    })
    .where(eq(usersTable.id, id));
}


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: '/auth/google/callback',
},
  async function (accessToken, refreshToken, profile, done) {
    try {
      const existingUserWithGoogleId = await getUserByGoogleId(profile.id);

      if (existingUserWithGoogleId) {
        return done(null, existingUserWithGoogleId);
      }

      const existingUserWithEmail = await getUserByEmail(profile.emails?.[0]?.value || '');

      if (existingUserWithEmail) {
        await updateUserGoogleId(existingUserWithEmail.id, profile.id);

        console.log(`Linking Google ID with existing email account for user with id ${existingUserWithEmail.id}`);
        return done(null, existingUserWithEmail);
      }

      // If no user found, create a new one
      const newUser = await db.insert(usersTable).values({
        email: profile.emails?.[0]?.value || '',
        googleId: profile.id,
      }).returning();

      return done(null, newUser[0]);
    } catch (error) {
      return done(error as Error);
    }
  }
));

export const googleAuthController = {
  login() {
    return passport.authenticate('google', { scope: ['profile', 'email'] })();
  },

  callback(req: Request, res: Response) {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const user = req.user as any

    const payload = {
      id: user.id,
      email: user.email,
    };

    const jwt = authController.generateToken(payload);
    res.json({
      token: jwt,
      user: req.user
    })
  }
}
