import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { getUserByClerkId } from "@/lib/userService"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { sendNoteDeliveryEmail, type EmailRecipient } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { noteId, recipients, noteUrl } = body

    if (!noteId || !recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get user from database
    const user = await getUserByClerkId(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get note from database
    const db = await getDatabase()
    const notesCollection = db.collection("notes")

    const note = await notesCollection.findOne({
      noteId,
      userId: new ObjectId(user._id),
    })

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    const senderName = user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : user.email
    const deliveredAt = new Date()

    // Send emails to all recipients
    const emailResults = await Promise.allSettled(
      recipients.map((recipient: EmailRecipient) =>
        sendNoteDeliveryEmail({
          recipient,
          noteTitle: note.title || "Untitled Note",
          senderName,
          noteUrl: noteUrl || `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/view-note/${noteId}`,
          deliveredAt,
        }),
      ),
    )

    // Process results
    const successful: string[] = []
    const failed: { email: string; error: string }[] = []

    emailResults.forEach((result, index) => {
      const recipient = recipients[index]
      if (result.status === "fulfilled" && result.value.success) {
        successful.push(recipient.email)
      } else {
        const error =
          result.status === "rejected"
            ? result.reason?.message || "Unknown error"
            : result.value.error || "Unknown error"
        failed.push({ email: recipient.email, error })
      }
    })

    // Update note status to delivered
    await notesCollection.updateOne(
      { noteId, userId: new ObjectId(user._id) },
      {
        $set: {
          isDelivered: true,
          deliveredAt,
          deliveryResults: {
            successful,
            failed,
            totalRecipients: recipients.length,
          },
          updatedAt: new Date(),
        },
      },
    )

    // Log delivery attempt
    const deliveryLogsCollection = db.collection("delivery_logs")
    await deliveryLogsCollection.insertOne({
      noteId,
      userId: new ObjectId(user._id),
      recipients,
      deliveredAt,
      successful,
      failed,
      createdAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      message: `Note delivered to ${successful.length} of ${recipients.length} recipients`,
      results: {
        successful,
        failed,
        totalRecipients: recipients.length,
      },
    })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send emails",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
