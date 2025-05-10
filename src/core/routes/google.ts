import { Router } from 'express';
import { googleAuthController } from '../controller/google-auth';
import passport from 'passport';

export const googleRouter = Router();

/* 
Google auth 
*/
googleRouter.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));
googleRouter.get('/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  googleAuthController.callback);
