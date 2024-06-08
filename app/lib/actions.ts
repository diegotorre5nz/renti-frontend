'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import type { Club, UserWithTokens } from '@/app/lib/definitions';
import { cookies } from 'next/headers';
const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const CreateClub = FormSchema.omit({ id: true });
const UpdateClub = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function createClub(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateClub.safeParse({
    name: formData.get('name'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // Prepare data for insertion into the database
  const { name } = validatedFields.data;

  // Call API create Club endpoint
  try {
    const cookieStore = cookies()
    const userString = cookieStore.get('user')
    if(!userString) throw new Error('Session Expired!'); 
    const user: UserWithTokens = JSON.parse(userString.value)
    const userId = user.id;
    const accessToken = user.authorization.accessToken;
    
    const body = {
      name
    }
    
    const request = new Request(`${process.env.API_HOST}/v1/users/${userId}/clubs`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `jwt ${accessToken}`
      },
      body: JSON.stringify(body)
    });
    const response = await fetch(request);
    let club: Club | null = null;
    if(!response.ok) {
      throw new Error("API Error: Failed to Create Club.");       
    }
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'API Error: Failed to Create Club.',
    };
  }
 
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/profile/clubs');
  redirect('/profile/clubs');
}

export async function updateClub(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateClub.safeParse({
    name: formData.get('name'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Club.',
    };
  }
 
  const { name } = validatedFields.data;
 
  try {
    const cookieStore = cookies()
    const userString = cookieStore.get('user')
    if(!userString) throw new Error('Session Expired!'); 
    const user: UserWithTokens = JSON.parse(userString.value)
    const userId = user.id;
    const accessToken = user.authorization.accessToken;

    const body = {
      name
    }
    
    const request = new Request(`${process.env.API_HOST}/v1/users/${userId}/clubs/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `jwt ${accessToken}`
      },
      body: JSON.stringify(body)
    });
    const response = await fetch(request);
    let club: Club | null = null;
    if(!response.ok) {
       throw new Error("API Error: Failed to Update Club.");       
    }
  } catch (error) {
    return { message: 'API Error: Failed to Update Club.' };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/profile/clubs');
  redirect('/profile/clubs');
}

export async function deleteClub(id: string) {
  try {
    const cookieStore = cookies()
    const userString = cookieStore.get('user')
    if(!userString) throw new Error('Session Expired!'); 
    const user: UserWithTokens = JSON.parse(userString.value)
    const userId = user.id;
    const accessToken = user.authorization.accessToken;
    const request = new Request(`${process.env.API_HOST}/v1/users/${userId}/clubs/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `jwt ${accessToken}`
      },
    });
    console.log(`${process.env.API_HOST}/v1/users/${userId}/clubs/${id}`)
    const response = await fetch(request);
  } catch {
      return {
        message: 'Database Error: Failed to Delete Invoice.'
    }
  }
  
  revalidatePath('/profile/clubs');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials';
        default:
          return 'Something went wrong';
      }
    }
    throw error
  }
}

export async function signUp(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const name = formData.get('name')
    const password = formData.get('password')
    const email = formData.get('email')
    const dateOfBirth = formData.get('dateOfBirth')
    const readingPreferences = '{}'
    const body = {
      name,
      email,
      password,
      dateOfBirth,
      readingPreferences
    }
    const request = new Request(`${process.env.API_HOST}/v1/users`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    const response = await fetch(request);
    if(response.ok) {
      await signIn('credentials', formData);
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials';
        default:
          return 'Something went wrong';
      }
    }
    throw error
  }
}
