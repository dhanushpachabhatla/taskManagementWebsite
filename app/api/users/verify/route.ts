import { NextResponse } from 'next/server';
import dbConnect from '../../../../db/connect';
import Task from '@/db/models/Task';

export async function POST(req: Request) {
    await dbConnect();

    try {
        const { uid, username } = await req.json();

        if (!uid || !username) {
            return NextResponse.json({ error: 'UID and Username are required' }, { status: 400 });
        }

        // Find any record with matching UID or Username
        const userByUID = await Task.findOne({ userId: uid });
        const userByUsername = await Task.findOne({ username });

        // If either UID or Username exists, enforce a strict match
        if ((userByUID && userByUID.username !== username) || (userByUsername && userByUsername.userId !== uid)) {
            return NextResponse.json(
                { error: 'Mismatch between UID and Username. Access denied.' },
                { status: 400 }
            );
        }
        if (userByUID || userByUsername) {
            return NextResponse.json({ success: true, message: 'User verified successfully.' });
        }
        return NextResponse.json({ success: true, message: 'New user accepted.' });
        
    } catch (error) {
        console.error('Error verifying user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
