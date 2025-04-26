import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function K8sGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>How to Use ConfigMaps and Secrets</CardTitle>
        <CardDescription>A quick guide to Kubernetes configuration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">ConfigMaps</h3>
          <p className="text-sm text-muted-foreground">
            ConfigMaps are used to store non-confidential data in key-value pairs. They are ideal for:
          </p>
          <ul className="ml-6 mt-2 list-disc text-sm text-muted-foreground">
            <li>API endpoints</li>
            <li>Feature flags</li>
            <li>Configuration parameters</li>
            <li>Log levels</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Secrets</h3>
          <p className="text-sm text-muted-foreground">
            Secrets are similar to ConfigMaps but are specifically intended for confidential data such as:
          </p>
          <ul className="ml-6 mt-2 list-disc text-sm text-muted-foreground">
            <li>API keys</li>
            <li>Database credentials</li>
            <li>OAuth tokens</li>
            <li>TLS certificates</li>
          </ul>
          <p className="mt-2 text-sm text-muted-foreground">
            Secrets are base64 encoded in Kubernetes but are not encrypted by default. For production, consider using a
            solution like Sealed Secrets, Vault, or a cloud provider's secret management service.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Accessing in Next.js</h3>
          <p className="text-sm text-muted-foreground">
            When Kubernetes mounts ConfigMaps and Secrets as environment variables, they become accessible in Next.js
            via the process.env object:
          </p>
          <pre className="mt-2 overflow-auto rounded-lg bg-slate-100 p-2 text-xs">
            <code>{`// Server-side code
const apiUrl = process.env.API_URL
const apiKey = process.env.API_KEY

// Client-side code (must be prefixed with NEXT_PUBLIC_)
const publicValue = process.env.NEXT_PUBLIC_FEATURE_FLAG`}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}
