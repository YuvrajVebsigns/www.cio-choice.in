import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, phone, organization, eventId } = body;

    if (!name || !email || !eventId) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // TODO: persist registration to a database or send email.
    // For now just echo back.

    return NextResponse.json(
      { message: 'ok', data: { name, email, phone, organization, eventId } },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}
