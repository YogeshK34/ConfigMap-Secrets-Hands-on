import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function EnvInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>How Environment Variables Work in Kubernetes</CardTitle>
        <CardDescription>Understanding ConfigMaps and Secrets</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">ConfigMaps</h3>
          <p className="text-sm text-muted-foreground">
            ConfigMaps store non-sensitive configuration data as key-value pairs. In Kubernetes, they can be mounted as:
          </p>
          <ul className="ml-6 mt-2 list-disc text-sm text-muted-foreground">
            <li>Environment variables</li>
            <li>Configuration files in a volume</li>
            <li>Command-line arguments</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium">Secrets</h3>
          <p className="text-sm text-muted-foreground">
            Secrets are similar to ConfigMaps but are intended for sensitive data. They are:
          </p>
          <ul className="ml-6 mt-2 list-disc text-sm text-muted-foreground">
            <li>Base64 encoded (but not encrypted by default)</li>
            <li>Stored with limited access in etcd</li>
            <li>Can be mounted as environment variables or files</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium">In Next.js Applications</h3>
          <p className="text-sm text-muted-foreground">When using Next.js with Kubernetes:</p>
          <ul className="ml-6 mt-2 list-disc text-sm text-muted-foreground">
            <li>
              <strong>Server-side only:</strong> Regular environment variables (process.env.VARIABLE_NAME) are only
              available on the server (API routes, Server Components, getServerSideProps)
            </li>
            <li>
              <strong>Client-side:</strong> Variables that need to be available in the browser must be prefixed with
              NEXT_PUBLIC_ (process.env.NEXT_PUBLIC_VARIABLE_NAME)
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
