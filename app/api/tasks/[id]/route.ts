import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import dbConnect from '../../../../db/connect';
import Task from '../../../../db/models/Task';
import mongoose from 'mongoose';

// GET method
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const url = new URL(req.url);
  const userId = url.searchParams.get('userId'); // Fetch userId from query params

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const task = await Task.findOne({ _id: params.id, userId }); // Fetch task by id and userId
  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json(task);
}

// PUT method
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = params; // Destructure directly from params

  if (!id) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  // Log the incoming ID and request body
  console.log("Received task ID:", id);
  const body = await req.json();
  console.log("Received body:", body);

  // Validate if `id` is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid Task ID" }, { status: 400 });
  }

  try {
    const task = await Task.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE method
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = params; // Directly destructure params

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid Task ID" }, { status: 400 });
  }

  try {
    // Try to delete the task based on taskId (using params.id)
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
