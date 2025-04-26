import { FileText, Github } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Kubernetes Config Demo</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="https://kubernetes.io/docs/concepts/configuration/configmap/" target="_blank">
              <FileText className="h-4 w-4" />
              <span className="sr-only">Documentation</span>
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href="https://github.com" target="_blank">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
        </div>
      </div>
      <p className="text-muted-foreground">
        This application demonstrates how to use Kubernetes ConfigMaps and Secrets to manage environment variables in a
        fullstack application.
      </p>
    </header>
  )
}
