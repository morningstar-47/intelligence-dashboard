import { toast } from "@/hooks/use-toast"

export interface AppError {
  code: string
  message: string
  details?: any
  statusCode?: number
}

export class ErrorHandler {
  static handle(error: any, context?: string) {
    console.error(`Error in ${context || "unknown context"}:`, error)

    let errorMessage = "An unexpected error occurred"
    let errorTitle = "Error"

    if (error.response) {
      // API error
      const statusCode = error.response.status
      const data = error.response.data

      switch (statusCode) {
        case 400:
          errorTitle = "Bad Request"
          errorMessage = data.message || "Invalid request data"
          break
        case 401:
          errorTitle = "Unauthorized"
          errorMessage = "Please log in to continue"
          // Redirect to login
          window.location.href = "/"
          return
        case 403:
          errorTitle = "Access Denied"
          errorMessage = "You don't have permission to perform this action"
          break
        case 404:
          errorTitle = "Not Found"
          errorMessage = "The requested resource was not found"
          break
        case 409:
          errorTitle = "Conflict"
          errorMessage = data.message || "A conflict occurred"
          break
        case 422:
          errorTitle = "Validation Error"
          errorMessage = data.message || "Please check your input"
          break
        case 500:
          errorTitle = "Server Error"
          errorMessage = "Internal server error. Please try again later"
          break
        case 503:
          errorTitle = "Service Unavailable"
          errorMessage = "Service is temporarily unavailable"
          break
        default:
          errorMessage = data.message || `Request failed with status ${statusCode}`
      }
    } else if (error.code === "NETWORK_ERROR") {
      errorTitle = "Network Error"
      errorMessage = "Unable to connect to the server. Please check your connection"
    } else if (error.message) {
      errorMessage = error.message
    }

    toast({
      variant: "destructive",
      title: errorTitle,
      description: errorMessage,
    })
  }

  static success(message: string, title?: string) {
    toast({
      variant: "success",
      title: title || "Success",
      description: message,
    })
  }

  static warning(message: string, title?: string) {
    toast({
      variant: "warning",
      title: title || "Warning",
      description: message,
    })
  }

  static info(message: string, title?: string) {
    toast({
      variant: "default",
      title: title || "Information",
      description: message,
    })
  }
}
