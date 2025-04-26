import { NextResponse } from "next/server"

export async function GET() {
  // In a real application, these would come from process.env
  // These are server-side only environment variables
  const privateEnvVars = {
    // From ConfigMap
    LOG_LEVEL: process.env.LOG_LEVEL || "info",
    CACHE_TTL: process.env.CACHE_TTL || "3600",

    // From Secret (showing masked values for demo)
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://user:password@db.example.com:5432/mydb",
    API_KEY: process.env.API_KEY || "sk-test_abcdefghijklmnopqrstuvwxyz123456",
    JWT_SECRET: process.env.JWT_SECRET || "supersecretjwtsigningkey",
  }

  // In a real application, you would NEVER return sensitive values like this
  // This is just for demonstration purposes
  return NextResponse.json(privateEnvVars)
}
