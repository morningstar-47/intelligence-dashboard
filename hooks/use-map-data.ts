// "use client"

// import { useState, useEffect, useMemo } from "react"
// import { mapService, type MapData } from "@/lib/services/map.service"
// import { ErrorHandler } from "@/lib/error-handler"

// interface MapIntelligence {
//   id: string
//   name: string
//   description?: string
//   coordinates: {
//     latitude: number
//     longitude: number
//     altitude?: number
//   }
//   region: string
//   tags: string[]
//   created_by: string
//   classification: "top_secret" | "secret" | "confidential"
// }

// export interface MapFilters {
//   region?: string
//   classification?: "top_secret" | "secret" | "confidential"
//   tags?: string
// }

// export function useMapData(filters: MapFilters) {
//   const [mapData, setMapData] = useState<MapIntelligence[]>([])
//   const [allMapData, setAllMapData] = useState<MapIntelligence[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   // Évite que useEffect se déclenche à chaque rendu si filters est un nouvel objet
//   const memoizedFilters = useMemo(() => filters, [JSON.stringify(filters)])

//   useEffect(() => {
//     const loadMapData = async () => {
//       setIsLoading(true)
//       setError(null)

//       try {
//         const data = await mapService.getMaps({ limit: 100 })

//         const transformedData: MapIntelligence[] = data.map((map: MapData) => ({
//           id: map._id,
//           name: map.name,
//           description: map.description,
//           coordinates: map.coordinates,
//           region: map.region,
//           tags: map.tags,
//           created_by: map.created_by,
//           classification: (map.classification ?? "secret") as "top_secret" | "secret" | "confidential", }))

      
//         setMapData(transformedData)
        
//       } catch (err) {
//         console.error("❌ Error loading map data:", err)
//         setError("Failed to load map data")
//       } finally {
//         setIsLoading(false)
//       }
//     }
    
//     loadMapData()
//   }, [])
  
//   console.log("test map", mapData);
//   useEffect(()=>{

//     let filteredData = mapData

//     if (memoizedFilters.region) {
//       filteredData = filteredData.filter(
//         (item) => item.region.toLowerCase() === memoizedFilters.region!.toLowerCase()
//       )
//     }

//     if (memoizedFilters.classification) {
//       filteredData = filteredData.filter(
//         (item) => item.classification === memoizedFilters.classification
//       )
//     }

//     if (memoizedFilters.tags && memoizedFilters.tags.trim() !== "") {
//       const tagList = memoizedFilters.tags
//         .toLowerCase()
//         .split(",")
//         .map((tag: string) => tag.trim())

//       filteredData = filteredData.filter((item) =>
//         item.tags.some((tag) => tagList.includes(tag.toLowerCase()))
//       )
//     }
//     setMapData(filteredData)
//   }, [memoizedFilters, mapData])

  

//   const createMap = async (mapData: any) => {
//     try {
//       const newMap = await mapService.createMap(mapData)
//       // Refresh data after creation
//       setMapData((prev) => [
//         {
//           id: newMap._id,
//           name: newMap.name,
//           description: newMap.description,
//           coordinates: newMap.coordinates,
//           region: newMap.region,
//           tags: newMap.tags,
//           created_by: newMap.created_by,
//           classification: mapData.classification || ("secret" as const),
//         },
//         ...prev,
//       ])
//       ErrorHandler.success("Location added successfully")
//       return newMap
//     } catch (err) {
//       console.error("Error creating map:", err)
//       throw err
//     }
//   }

//   const updateMap = async (mapId: string, mapData: any) => {
//     try {
//       // In a real app, this would call the backend API
//       const updatedMap = await mapService.updateMap(mapId, mapData)

//       // Update local state
//       setMapData((prev) =>
//         prev.map((map) =>
//           map.id === mapId
//             ? {
//                 ...map,
//                 ...mapData,
//               }
//             : map,
//         ),
//       )
//       ErrorHandler.success("Location updated successfully")
//       return updatedMap
//     } catch (err) {
//       console.error("Error updating map:", err)
//       throw err
//     }
//   }

//   const deleteMap = async (mapId: string) => {
//     try {
//       // In a real app, this would call the backend API
//       await mapService.deleteMap(mapId)

//       // Remove from local state
//       setMapData((prev) => prev.filter((map) => map.id !== mapId))
//       ErrorHandler.success("Location deleted successfully")
//     } catch (err) {
//       console.error("Error deleting map:", err)
//       throw err
//     }
//   }

//   return { mapData, isLoading, error, createMap, updateMap, deleteMap }
// }



"use client"

import { useState, useEffect, useMemo } from "react"
import { mapService, type MapData } from "@/lib/services/map.service"
import { ErrorHandler } from "@/lib/error-handler"

interface MapIntelligence {
  id: string
  name: string
  description?: string
  coordinates: {
    latitude: number
    longitude: number
    altitude?: number
  }
  region: string
  tags: string[]
  created_by: string
  classification: "top_secret" | "secret" | "confidential"
}

export interface MapFilters {
  region?: string
  classification?: "top_secret" | "secret" | "confidential"
  tags?: string
}

export function useMapData(filters: MapFilters) {
  const [allMapData, setAllMapData] = useState<MapIntelligence[]>([])
  const [mapData, setMapData] = useState<MapIntelligence[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Memoize filters to avoid unnecessary re-renders
  const memoizedFilters = useMemo(() => filters, [JSON.stringify(filters)])

  // Load initial data once
  useEffect(() => {
    const loadMapData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await mapService.getMaps({ limit: 100 })

        const transformedData: MapIntelligence[] = data.map((map: MapData) => ({
          id: map._id,
          name: map.name,
          description: map.description,
          coordinates: map.coordinates,
          region: map.region,
          tags: map.tags,
          created_by: map.created_by,
          classification: (map.classification ?? "secret") as "top_secret" | "secret" | "confidential",
        }))

        setAllMapData(transformedData)
      } catch (err) {
        console.error("❌ Error loading map data:", err)
        setError("Failed to load map data")
      } finally {
        setIsLoading(false)
      }
    }
    
    loadMapData()
  }, [])

  // Apply filters whenever allMapData or filters change
  useEffect(() => {    
    let filteredData = [...allMapData]

    // Appliquer les filtres seulement s'il y a des données
    if (allMapData.length > 0) {
      // Filtrer par région seulement si le filtre est défini et non vide
      if (memoizedFilters.region && memoizedFilters.region.trim() !== "") {
        filteredData = filteredData.filter(
          (item) => item.region.toLowerCase() === memoizedFilters.region!.toLowerCase()
        )
      }

      // Filtrer par classification seulement si le filtre est défini
      if (memoizedFilters.classification) {
        filteredData = filteredData.filter(
          (item) => item.classification === memoizedFilters.classification
        )
      }

      // Filtrer par tags seulement si le filtre est défini et non vide
      if (memoizedFilters.tags && memoizedFilters.tags.trim() !== "") {
        const tagList = memoizedFilters.tags
          .toLowerCase()
          .split(",")
          .map((tag: string) => tag.trim())
          .filter(tag => tag.length > 0) // Enlever les tags vides

        if (tagList.length > 0) {
          filteredData = filteredData.filter((item) =>
            item.tags.some((tag) => tagList.includes(tag.toLowerCase()))
          )
        }
      }
    }

    setMapData(filteredData)
  }, [allMapData, memoizedFilters])

  const createMap = async (mapData: any) => {
    try {
      const newMap = await mapService.createMap(mapData)
      
      const transformedNewMap: MapIntelligence = {
        id: newMap._id,
        name: newMap.name,
        description: newMap.description,
        coordinates: newMap.coordinates,
        region: newMap.region,
        tags: newMap.tags,
        created_by: newMap.created_by,
        classification: mapData.classification || ("secret" as const),
      }

      // Add to allMapData (not filtered data)
      setAllMapData((prev) => [transformedNewMap, ...prev])
      
      ErrorHandler.success("Location added successfully")
      return newMap
    } catch (err) {
      console.error("Error creating map:", err)
      throw err
    }
  }

  const updateMap = async (mapId: string, updateData: any) => {
    try {
      const updatedMap = await mapService.updateMap(mapId, updateData)

      // Update in allMapData
      setAllMapData((prev) =>
        prev.map((map) =>
          map.id === mapId
            ? {
                ...map,
                ...updateData,
              }
            : map,
        ),
      )
      
      ErrorHandler.success("Location updated successfully")
      return updatedMap
    } catch (err) {
      console.error("Error updating map:", err)
      throw err
    }
  }

  const deleteMap = async (mapId: string) => {
    try {
      await mapService.deleteMap(mapId)

      // Remove from allMapData
      setAllMapData((prev) => prev.filter((map) => map.id !== mapId))
      
      ErrorHandler.success("Location deleted successfully")
    } catch (err) {
      console.error("Error deleting map:", err)
      throw err
    }
  }

  return { mapData, isLoading, error, createMap, updateMap, deleteMap }
}

// "use client"
// import { useState, useEffect, useMemo, useCallback } from "react"
// import { mapService, type MapData } from "@/lib/services/map.service"
// import { ErrorHandler } from "@/lib/error-handler"

// interface MapIntelligence {
//   id: string
//   name: string
//   description?: string
//   coordinates: {
//     latitude: number
//     longitude: number
//     altitude?: number
//   }
//   region: string
//   tags: string[]
//   created_by: string
//   classification: "top_secret" | "secret" | "confidential"
// }

// export interface MapFilters {
//   region?: string
//   classification?: "top_secret" | "secret" | "confidential"
//   tags?: string
// }

// export function useMapData(filters: MapFilters) {
//   const [mapData, setMapData] = useState<MapIntelligence[]>([])
//   const [allMapData, setAllMapData] = useState<MapIntelligence[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   // More stable memoization using individual filter values
//   const memoizedFilters = useMemo(() => ({
//     region: filters.region?.toLowerCase().trim() || undefined,
//     classification: filters.classification,
//     tags: filters.tags?.toLowerCase().trim() || undefined
//   }), [filters.region, filters.classification, filters.tags])

//   // Transform raw map data to MapIntelligence format
//   const transformMapData = useCallback((data: MapData[]): MapIntelligence[] => {
//     return data.map((map: MapData) => ({
//       id: map._id,
//       name: map.name,
//       description: map.description,
//       coordinates: map.coordinates,
//       region: map.region,
//       tags: map.tags,
//       created_by: map.created_by,
//       classification: (map.classification ?? "secret") as "top_secret" | "secret" | "confidential",
//     }))
//   }, [])

//   // Filter data based on current filters
//   const filterData = useCallback((data: MapIntelligence[], currentFilters: typeof memoizedFilters): MapIntelligence[] => {
//     let filtered = data

//     if (currentFilters.region) {
//       filtered = filtered.filter(
//         (item) => item.region.toLowerCase() === currentFilters.region
//       )
//     }

//     if (currentFilters.classification) {
//       filtered = filtered.filter(
//         (item) => item.classification === currentFilters.classification
//       )
//     }

//     if (currentFilters.tags) {
//       const tagList = currentFilters.tags
//         .split(",")
//         .map((tag: string) => tag.trim())
//         .filter(Boolean) // Remove empty strings
      
//       if (tagList.length > 0) {
//         filtered = filtered.filter((item) =>
//           item.tags.some((tag) => tagList.includes(tag.toLowerCase()))
//         )
//       }
//     }

//     return filtered
//   }, [])

//   // Load initial data
//   useEffect(() => {
//     let isMounted = true // Prevent state updates if component unmounts

//     const loadMapData = async () => {
//       if (!isMounted) return
      
//       setIsLoading(true)
//       setError(null)

//       try {
//         const data = await mapService.getMaps({ limit: 100 })
        
//         if (!isMounted) return // Check again after async operation
        
//         const transformedData = transformMapData(data)
//         console.log(transformedData);
        
//         setAllMapData(transformedData)
        
//         // Apply initial filters
//         const filteredData = filterData(transformedData, memoizedFilters)
//         setMapData(filteredData)
        
//         console.log('Loaded and filtered data:', {
//           total: transformedData.length,
//           filtered: filteredData.length,
//           filters: memoizedFilters
//         })
        
//       } catch (err) {
//         if (!isMounted) return
        
//         console.error("❌ Error loading map data:", err)
//         const errorMessage = err instanceof Error ? err.message : "Failed to load map data"
//         setError(errorMessage)
        
//         // Optionally use your ErrorHandler here
//         ErrorHandler.handle(err, "useMapData.loadMapData")
        
//       } finally {
//         if (isMounted) {
//           setIsLoading(false)
//         }
//       }
//     }

//     loadMapData()

//     // Cleanup function
//     return () => {
//       isMounted = false
//     }
//   }, []) // Only run once on mount

//   // Apply filters when they change (without refetching data)
//   useEffect(() => {
//     if (allMapData.length > 0) {
//       const filteredData = filterData(allMapData, memoizedFilters)
//       setMapData(filteredData)
      
//       console.log('Applied filters:', {
//         total: allMapData.length,
//         filtered: filteredData.length,
//         filters: memoizedFilters
//       })
//     }
//   }, [memoizedFilters, allMapData, filterData])

//   // Retry function for error recovery
//   const retry = useCallback(async () => {
//     setError(null)
//     setIsLoading(true)
    
//     try {
//       const data = await mapService.getMaps({ limit: 100 })
//       const transformedData = transformMapData(data)

      
//       setAllMapData(transformedData)
      
//       const filteredData = filterData(transformedData, memoizedFilters)
//       setMapData(filteredData)
      
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : "Failed to load map data"
//       setError(errorMessage)
//       ErrorHandler.handle(err, "useMapData.retry")
//     } finally {
//       setIsLoading(false)
//     }
//   }, [transformMapData, filterData, memoizedFilters])  

//   return {
//     mapData,
//     allMapData,
//     isLoading,
//     error,
//     retry,
//     // Additional useful data
//     totalCount: allMapData.length,
//     filteredCount: mapData.length,
//     hasFilters: Boolean(memoizedFilters.region || memoizedFilters.classification || memoizedFilters.tags)
//   }
// }