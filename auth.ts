import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { UserWithTokens } from '@/app/lib/definitions';
import { cookies } from 'next/headers'
  
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        'use server'

        const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(6) })
        .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const body = {
            email,
            password
          }
          const request = new Request(`${process.env.API_HOST}/v1/sessions/create`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
          });
          const response = await fetch(request);
          if(response.ok) {
            const userWithTokens: UserWithTokens = await response.json()
            cookies().set({
              name: 'user',
              value: await JSON.stringify(userWithTokens),
              httpOnly: true,
              path: '/',
            })
            return userWithTokens;
          }
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});