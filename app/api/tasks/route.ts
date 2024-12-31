import { NextResponse } from 'next/server';
import dbConnect from '../../../db/connect';
import Task from '../../../db/models/Task';
import { NextRequest } from 'next/server';

// GET method to fetch tasks for a user
export async function GET(req: NextRequest) {
  console.log("API route triggered");
  try {
    await dbConnect();
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    const assignedPage = url.searchParams.get('assignedPage') === 'true'; // Determine if it's the AssignedTo page
    const username = url.searchParams.get('username'); 

    if (!userId || !username) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    if (assignedPage) {
      let query: any = {};
      
      if (assignedPage) {
        query.$or = [
          { assignedTo: username },
          { assignedBy: username },
        ];
      }
  
      const tasks = await Task.find(query);
      return NextResponse.json(tasks);
    }
    else{
      let query: any = { userId };
      query.$or = [
        { assignedTo:{ $exists: false }},
        { assignedBy:{ $exists: false }},
      ];
      const tasks = await Task.find(query);
      return NextResponse.json(tasks);
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
