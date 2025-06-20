import { Suspense, type ReactNode } from "react"
import { ErrorBoundary } from "./error-boundary"

interface SuspenseWrapperProps {
  children: ReactNode
  fallback: ReactNode
  errorFallback?: ReactNode
}

function DefaultErrorFallback() {
  return <div>Une erreur est survenue.</div>;
}

export function SuspenseWrapper({ children, fallback, errorFallback }: SuspenseWrapperProps) {
  let FallbackComponent;
  if (errorFallback) {
    FallbackComponent = function CustomFallback() { return <>{errorFallback}</>; };
  } else {
    FallbackComponent = DefaultErrorFallback;
  }

  return (
    <ErrorBoundary fallback={FallbackComponent}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  )
}
