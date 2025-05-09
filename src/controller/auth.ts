import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { db } from '../db';
import { usersTable } from '../db/schema';
import { eq } from 'drizzle-orm';

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

export async function registerUser(email: string, password: string) {
  // Check if user already exists
  const existingUsers = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (existingUsers.length > 0) {
    throw new Error('User with this email already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Create the user
  const [newUser] = await db
    .insert(usersTable)
    .values({
      email,
      password: hashedPassword,
    })
    .returning();

  // Generate JWT token
  const token = generateToken(newUser);

  return {
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
    },
  };
}

export async function loginUser(email: string, password: string) {
  // Find user by email
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (users.length === 0) {
    throw new Error('Invalid email or password');
  }

  const user = users[0];

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const token = generateToken(user);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
}

/**
 * Generate JWT token
 */
function generateToken(user: typeof usersTable.$inferSelect) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const options: SignOptions = {
    expiresIn: '7d',
  };
  
  return jwt.sign(payload, JWT_SECRET!, options);
}
