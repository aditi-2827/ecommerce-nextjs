import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { users } from '@/lib/db';
import { signJwt } from '@/utils/jwt';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: uuidv4(),
      email,
      passwordHash,
    };

    users.push(newUser);

    const token = signJwt({ userId: newUser.id, email });

    return NextResponse.json(
      { message: 'User created successfully', token },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
