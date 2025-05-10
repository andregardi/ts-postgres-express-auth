import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { db } from '../db';
import { usersTable } from '../db/schema';
import { eq } from 'drizzle-orm';

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Configure JWT options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET!,
};

// Configure Passport JWT strategy
passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // Find the user by ID from the JWT payload
      const users = await db
        .select({
          id: usersTable.id,
          createdAt: usersTable.createdAt
        })
        .from(usersTable)
        .where(eq(usersTable.id, payload.id))
        .limit(1);

      if (users.length === 0) {
        return done(null, false);
      }

      return done(null, users[0]);
    } catch (error) {
      return done(error, false);
    }
  })
);

// Authentication middleware
export const requireAuth = passport.authenticate('jwt', { session: false });

// Initialize Passport
export const initializeAuth = () => {
  return passport.initialize();
};
