"use client"

import { use } from "react"

// Wrapper pour transformer les promesses en ressources Suspense
export function createSuspenseResource<T>(promise: Promise<T>) {
  let status = "pending"
  let result: T
  let error: any

  const suspender = promise.then(
    (res) => {
      status = "success"
      result = res
    },
    (err) => {
      status = "error"
      error = err
    },
  )

  return {
    read() {
      if (status === "pending") {
        throw suspender
      } else if (status === "error") {
        throw error
      } else if (status === "success") {
        return result
      }
    },
  }
}

// Hook pour utiliser des données avec Suspense
export function useSuspenseData<T>(fetcher: () => Promise<T>, deps: any[] = []) {
  const resource = createSuspenseResource(fetcher())
  return use(Promise.resolve(resource.read()))
}
