import { NextResponse } from "next/server"

export async function GET() {
  // Access environment variables from ConfigMap
  const version = process.env.APP_VERSION || "1.0.0"
  const environment = process.env.NODE_ENV || "development"

  // Access environment variables from Secret (just checking if they exist)
  const dbConnected = !!process.env.DATABASE_URL
  const apiKeyConfigured = !!process.env.API_KEY

  return NextResponse.json({
    status: "healthy",
    version,
    environment,
    dbConnected,
    apiKeyConfigured,
    timestamp: new Date().toISOString(),
  })
}
