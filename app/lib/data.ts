import {
  User,
  UserWithTokens,
  Club,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers'

export async function fetchJointClubs() {
  noStore();
  try {
    const cookieStore = cookies()
    const userString = cookieStore.get('user')
    if(!userString) throw new Error('Session Expired!'); 
    const user: UserWithTokens = JSON.parse(userString.value)
    const accessToken = user.authorization.accessToken;
    const request = new Request(`${process.env.API_HOST}/v1/jointclubs`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `jwt ${accessToken}`
      },
    });
    const response = await fetch(request);
    let clubs: Club[] = Array()
    if(response.ok) {
      const data: Club[] = await response.json()
      clubs = data.map((club) => ({
        ...club,
      }));
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return clubs;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the joint clubs.');
  }
}

export async function fetchProfileData() {
  noStore();
  try {
    const cookieStore = cookies()
    const userString = cookieStore.get('user')
    if(!userString) throw new Error('Session Expired!'); 
    const user: UserWithTokens = JSON.parse(userString.value)
    const accessToken = user.authorization.accessToken;
    const request = new Request(`${process.env.API_HOST}/v1/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `jwt ${accessToken}`
      },
    });
    const response = await fetch(request);
    if(response.ok) {
      const user: User = { ... await response.json() }
    }
    return {
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchClubs(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const cookieStore = cookies()
    const userString = cookieStore.get('user')
    if(!userString) throw new Error('Session Expired!'); 
    const user: UserWithTokens = JSON.parse(userString.value)
    const accessToken = user.authorization.accessToken;
    const userId = user.id;
    const request = new Request(`${process.env.API_HOST}/v1/clubs`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `jwt ${accessToken}`
      },
    });
    const response = await fetch(request);
    let clubs: Club[] = Array()
    if(response.ok) {
      const data: Club[] = await response.json()
      clubs = data.map((club) => ({
        ...club,
        userIsCreator: userId == club.userId ? true : false,
      }));
    }
    return clubs;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch clubs.');
  }
}

export async function fetchClubById(id: string) {
  noStore();
  try {
    const cookieStore = cookies()
    const userString = cookieStore.get('user')
    if(!userString) throw new Error('Session Expired!'); 
    const user: UserWithTokens = JSON.parse(userString.value)
    const accessToken = user.authorization.accessToken;
    const userId = user.id;
    const request = new Request(`${process.env.API_HOST}/v1/users/${userId}/clubs/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `jwt ${accessToken}`
      },
    });
    const response = await fetch(request);
    let club: Club | null = null;
    if(response.ok) {
      club = await response.json()
    }
    if(club){
      club = {
        ...club,
        userIsCreator: userId == club.userId ? true : false,
      };
    }
    return club; 
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}
