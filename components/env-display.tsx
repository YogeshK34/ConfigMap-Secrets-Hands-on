"use client"

import { useState } from "react"
import { Copy, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// In a real application, these would come from environment variables
// For this demo, we're using dummy values
const configMapValues = {
  API_URL: "https://api.example.com",
  LOG_LEVEL: "info",
  FEATURE_FLAGS: "recommendations=true,darkMode=false",
  CACHE_TTL: "3600",
}

const secretValues = {
  DATABASE_URL: "postgresql://user:password@db.example.com:5432/mydb",
  API_KEY: "sk_test_abcdefghijklmnopqrstuvwxyz123456",
  JWT_SECRET: "very-secret-jwt-signing-key-do-not-share",
  ADMIN_PASSWORD: "supersecretpassword",
}

export function EnvDisplay() {
  const { toast } = useToast()
  const [showSecrets, setShowSecrets] = useState(false)

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ConfigMap Values
            <Button
              variant="outline"
              size="icon"
              className="ml-auto h-6 w-6"
              onClick={() => copyToClipboard(JSON.stringify(configMapValues, null, 2), "ConfigMap values")}
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy ConfigMap values</span>
            </Button>
          </CardTitle>
          <CardDescription>Non-sensitive configuration stored in Kubernetes ConfigMaps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(configMapValues).map(([key, value]) => (
              <div key={key} className="grid grid-cols-[1fr,auto] items-center gap-2">
                <div>
                  <p className="font-mono text-sm font-medium">{key}</p>
                  <p className="font-mono text-xs text-muted-foreground break-all">{value}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(value, key)}>
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy {key}</span>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Secret Values
            <Button
              variant="outline"
              size="icon"
              className="ml-auto h-6 w-6"
              onClick={() => copyToClipboard(JSON.stringify(secretValues, null, 2), "Secret values")}
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Secret values</span>
            </Button>
            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => setShowSecrets(!showSecrets)}>
              {showSecrets ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              <span className="sr-only">{showSecrets ? "Hide" : "Show"} secrets</span>
            </Button>
          </CardTitle>
          <CardDescription>Sensitive configuration stored in Kubernetes Secrets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(secretValues).map(([key, value]) => (
              <div key={key} className="grid grid-cols-[1fr,auto] items-center gap-2">
                <div>
                  <p className="font-mono text-sm font-medium">{key}</p>
                  <p className="font-mono text-xs text-muted-foreground break-all">
                    {showSecrets ? value : "••••••••••••••••••••••••••••••••"}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(value, key)}>
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy {key}</span>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Kubernetes Manifests</CardTitle>
          <CardDescription>YAML files for deploying the application with ConfigMaps and Secrets</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="deployment">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="deployment">Deployment</TabsTrigger>
              <TabsTrigger value="configmap">ConfigMap</TabsTrigger>
              <TabsTrigger value="secret">Secret</TabsTrigger>
              <TabsTrigger value="service">Service</TabsTrigger>
            </TabsList>
            <TabsContent value="deployment" className="mt-4">
              <pre className="overflow-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-50">
                <code>{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: nextjs-app
  labels:
    app: nextjs-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nextjs-app
  template:
    metadata:
      labels:
        app: nextjs-app
    spec:
      containers:
      - name: nextjs
        image: nextjs-app:latest
        ports:
        - containerPort: 3000
        env:
        # ConfigMap values
        - name: API_URL
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: API_URL
        - name: LOG_LEVEL
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: LOG_LEVEL
        - name: FEATURE_FLAGS
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: FEATURE_FLAGS
        - name: CACHE_TTL
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: CACHE_TTL
        # Secret values
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: DATABASE_URL
        - name: API_KEY
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: API_KEY
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: JWT_SECRET
        - name: ADMIN_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: ADMIN_PASSWORD`}</code>
              </pre>
            </TabsContent>
            <TabsContent value="configmap" className="mt-4">
              <pre className="overflow-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-50">
                <code>{`apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  API_URL: "https://api.example.com"
  LOG_LEVEL: "info"
  FEATURE_FLAGS: "recommendations=true,darkMode=false"
  CACHE_TTL: "3600"`}</code>
              </pre>
            </TabsContent>
            <TabsContent value="secret" className="mt-4">
              <pre className="overflow-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-50">
                <code>{`apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  # Values must be base64 encoded
  DATABASE_URL: cG9zdGdyZXNxbDovL3VzZXI6cGFzc3dvcmRAZGIuZXhhbXBsZS5jb206NTQzMi9teWRi
  API_KEY: c2tfdGVzdF9hYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejEyMzQ1Ng==
  JWT_SECRET: dmVyeS1zZWNyZXQtand0LXNpZ25pbmcta2V5LWRvLW5vdC1zaGFyZQ==
  ADMIN_PASSWORD: c3VwZXJzZWNyZXRwYXNzd29yZA==`}</code>
              </pre>
            </TabsContent>
            <TabsContent value="service" className="mt-4">
              <pre className="overflow-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-50">
                <code>{`apiVersion: v1
kind: Service
metadata:
  name: nextjs-app
spec:
  selector:
    app: nextjs-app
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP`}</code>
              </pre>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
