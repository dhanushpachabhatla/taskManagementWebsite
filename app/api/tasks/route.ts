import { NextResponse } from 'next/server';
import dbConnect from '../../../db/connect';
import Task from '../../../db/models/Task';

export async function GET(req: Request) {
  await dbConnect();

  const url = new URL(req.url);
  const userId = url.searchParams.get('userId'); // Fetch userId from query params
  
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const tasks = await Task.find({ userId }); // Fetch tasks for the specific user
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  await dbConnect();

  const body = await request.json();
  const { userId, ...taskData } = body;

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const task = await Task.create({ ...taskData, userId }); // Save task with userId
  return NextResponse.json(task);
}
