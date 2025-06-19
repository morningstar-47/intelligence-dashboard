import { apiService } from "./api"

export interface MapCoordinates {
  latitude: number
  longitude: number
  altitude?: number
}

export interface MapData {
  _id: string
  name: string
  description: string
  region: string
  coordinates: MapCoordinates
  tags: string[]
  classification?: string
  created_by: string
  created_at: string
  updated_at: string
  updated_by: string
}

export interface CreateMapData {
  name: string
  description: string
  region: string
  coordinates: MapCoordinates
  tags: string[]
}

export interface MapListParams {
  skip?: number
  limit?: number
}

class MapService {
  async getMaps(params: MapListParams = {}): Promise<MapData[]> {
    return apiService.get("/api/v1/maps", params)
  }

  async createMap(mapData: CreateMapData): Promise<MapData> {
    return apiService.post("/api/v1/maps", mapData)
  }

  async getMap(mapId: string): Promise<MapData> {
    return apiService.get(`/api/v1/maps/${mapId}`)
  }

  async updateMap(mapId: string, mapData: Partial<CreateMapData>): Promise<MapData> {
    return apiService.put(`/api/v1/maps/${mapId}`, mapData)
  }

  async deleteMap(mapId: string): Promise<void> {
    return apiService.delete(`/api/v1/maps/${mapId}`)
  }
}

export const mapService = new MapService()
