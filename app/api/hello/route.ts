import { NextResponse } from "next/server"

export async function GET() {
  // Example of using environment variables in an API route
  const apiKey = process.env.API_KEY || "dummy-api-key"

  // In a real app, you might use the API key to authenticate with an external service
  // const response = await fetch("https://api.example.com/data", {
  //   headers: { Authorization: `Bearer ${apiKey}` }
  // })

  return NextResponse.json({
    message: "Hello from the API!",
    // Don't expose sensitive information in production
    usingApiKey: apiKey.substring(0, 3) + "..." + apiKey.substring(apiKey.length - 3),
  })
}
