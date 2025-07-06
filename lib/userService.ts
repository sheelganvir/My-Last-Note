import { getDatabase } from "@/lib/mongodb"
import type { User, CreateUserData } from "@/lib/User"

const COLLECTION_NAME = "users"

export async function createUser(userData: CreateUserData): Promise<User> {
  const db = await getDatabase()
  const collection = db.collection<User>(COLLECTION_NAME)

  const newUser: Omit<User, "_id"> = {
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
    checkInFrequency: userData.checkInFrequency || "monthly",
    isActive: true,
  }

  const result = await collection.insertOne(newUser)
  return { ...newUser, _id: result.insertedId }
}

export async function getUserByClerkId(clerkId: string): Promise<User | null> {
  const db = await getDatabase()
  const collection = db.collection<User>(COLLECTION_NAME)

  return await collection.findOne({ clerkId })
}

export async function updateUser(clerkId: string, updateData: Partial<User>): Promise<User | null> {
  const db = await getDatabase()
  const collection = db.collection<User>(COLLECTION_NAME)

  const result = await collection.findOneAndUpdate(
    { clerkId },
    {
      $set: {
        ...updateData,
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" },
  )

  return result
}

export async function updateLastCheckIn(clerkId: string): Promise<void> {
  const db = await getDatabase()
  const collection = db.collection<User>(COLLECTION_NAME)

  await collection.updateOne(
    { clerkId },
    {
      $set: {
        lastCheckIn: new Date(),
        updatedAt: new Date(),
      },
    },
  )
}
