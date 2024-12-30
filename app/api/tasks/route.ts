import { NextResponse } from 'next/server';
import dbConnect from '../../../db/connect';
import Task from '../../../db/models/Task';
import { NextRequest } from 'next/server';

// GET method to fetch tasks for a user
export async function GET(req: NextRequest) {
  await dbConnect();

  const url = new URL(req.url);
  const userId = url.searchParams.get('userId'); // Fetch userId from query params

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const tasks = await Task.find({ userId }); // Fetch tasks for the specific user
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Error fetching tasks" }, { status: 500 });
  }
}

// POST method to create a new task
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    const { userId, ...taskData } = body;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const task = await Task.create({ ...taskData, userId }); // Save task with userId
    return NextResponse.json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Error creating task" }, { status: 500 });
  }
}
