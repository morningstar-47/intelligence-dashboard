import { apiService } from "./api"

export interface AIResource {
  id: string
  name: string
  description: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface CreateAIResourceData {
  name: string
  description: string
}

export interface AIListParams {
  skip?: number
  limit?: number
}

class AIService {
  async getAIResources(params: AIListParams = {}): Promise<AIResource[]> {
    return apiService.get("/api/v1/ai/", params)
  }

  async createAIResource(aiData: CreateAIResourceData): Promise<AIResource> {
    return apiService.post("/api/v1/ai/", aiData)
  }
}

export const aiService = new AIService()
