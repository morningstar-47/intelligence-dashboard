"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Filter, Search, Layers, Satellite, Plus, Edit, Trash2 } from "lucide-react"
import { MapFilters, useMapData } from "@/hooks/use-map-data"
import { IntelligenceMap } from './map/IntelligenceMap'
import '@/styles/map.css'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"

export function GeospatialIntelligence() {
  const [filters, setFilters] = useState<MapFilters>({
    // region: "",
    // classification: "secret" || "confidential"  || "top_secret",
    // tags: "",
  })
  const { mapData, isLoading, createMap, updateMap, deleteMap } = useMapData(filters)

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingPoint, setEditingPoint] = useState<any>(null)
  const [newMapPoint, setNewMapPoint] = useState({
    name: "",
    description: "",
    region: "europe",
    coordinates: {
      latitude: 48.8566,
      longitude: 2.3522,
    },
    tags: ["intelligence", "surveillance"],
    classification: "confidential",
  })

  const getClassificationColor = (classification: string) => {
    const colors = {
      top_secret: "bg-red-600",
      secret: "bg-orange-600",
      confidential: "bg-yellow-600",
    }
    return colors[classification as keyof typeof colors] || "bg-gray-600"
  }

  const handleCreateMapPoint = async () => {
    try {
      await createMap(newMapPoint)
      setIsCreateDialogOpen(false)
      setNewMapPoint({
        name: "",
        description: "",
        region: "europe",
        coordinates: {
          latitude: 48.8566,
          longitude: 2.3522,
        },
        tags: ["intelligence", "surveillance"],
        classification: "confidential",
      })
    } catch (error) {
      console.error("Failed to create map point:", error)
    }
  }

  const handleUpdateMapPoint = async () => {
    if (!editingPoint) return

    try {
      await updateMap(editingPoint.id, {
        name: editingPoint.name,
        description: editingPoint.description,
        region: editingPoint.region,
        coordinates: editingPoint.coordinates,
        tags: editingPoint.tags,
        classification: editingPoint.classification,
      })
      setEditingPoint(null)
    } catch (error) {
      console.error("Failed to update map point:", error)
    }
  }

  const handleDeleteMapPoint = async (pointId: string) => {
    try {
      await deleteMap(pointId)
    } catch (error) {
      console.error("Failed to delete map point:", error)
    }
  }

  const handleTagsChange = (value: string, target: any) => {
    const tagsArray = value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
    if (target === "new") {
      setNewMapPoint({ ...newMapPoint, tags: tagsArray })
    } else {
      setEditingPoint({ ...editingPoint, tags: tagsArray })
    }
  }


  // console.log('Mapdata', mapData);
  

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Geospatial Intelligence</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Location
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-white">Add Intelligence Point</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Add a new geospatial intelligence point to the map
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="point-name" className="text-slate-200">
                    Location Name
                  </Label>
                  <Input
                    id="point-name"
                    value={newMapPoint.name}
                    onChange={(e) => setNewMapPoint({ ...newMapPoint, name: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Enter location name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="point-description" className="text-slate-200">
                    Description
                  </Label>
                  <Textarea
                    id="point-description"
                    value={newMapPoint.description || ""}
                    onChange={(e) => setNewMapPoint({ ...newMapPoint, description: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white min-h-[80px]"
                    placeholder="Enter location description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="point-latitude" className="text-slate-200">
                      Latitude
                    </Label>
                    <Input
                      id="point-latitude"
                      type="number"
                      step="0.0001"
                      value={newMapPoint.coordinates.latitude}
                      onChange={(e) =>
                        setNewMapPoint({
                          ...newMapPoint,
                          coordinates: {
                            ...newMapPoint.coordinates,
                            latitude: Number.parseFloat(e.target.value),
                          },
                        })
                      }
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="point-longitude" className="text-slate-200">
                      Longitude
                    </Label>
                    <Input
                      id="point-longitude"
                      type="number"
                      step="0.0001"
                      value={newMapPoint.coordinates.longitude}
                      onChange={(e) =>
                        setNewMapPoint({
                          ...newMapPoint,
                          coordinates: {
                            ...newMapPoint.coordinates,
                            longitude: Number.parseFloat(e.target.value),
                          },
                        })
                      }
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="point-region" className="text-slate-200">
                    Region
                  </Label>
                  <Select
                    value={newMapPoint.region}
                    onValueChange={(value) => setNewMapPoint({ ...newMapPoint, region: value })}
                  >
                    <SelectTrigger id="point-region" className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="europe" className="text-white">
                        Europe
                      </SelectItem>
                      <SelectItem value="asia" className="text-white">
                        Asia
                      </SelectItem>
                      <SelectItem value="americas" className="text-white">
                        Americas
                      </SelectItem>
                      <SelectItem value="africa" className="text-white">
                        Africa
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="point-tags" className="text-slate-200">
                    Tags (comma separated)
                  </Label>
                  <Input
                    id="point-tags"
                    value={newMapPoint.tags.join(", ")}
                    onChange={(e) => handleTagsChange(e.target.value, "new")}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="intelligence, surveillance, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="point-classification" className="text-slate-200">
                    Classification
                  </Label>
                  <Select
                    value={newMapPoint.classification}
                    onValueChange={(value) => setNewMapPoint({ ...newMapPoint, classification: value })}
                  >
                    <SelectTrigger id="point-classification" className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="top_secret" className="text-white">
                        Top Secret
                      </SelectItem>
                      <SelectItem value="secret" className="text-white">
                        Secret
                      </SelectItem>
                      <SelectItem value="confidential" className="text-white">
                        Confidential
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateMapPoint} className="bg-blue-600 hover:bg-blue-700">
                  Add to Map
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
            <Satellite className="h-4 w-4 mr-2" />
            Satellite View
          </Button>
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
            <Layers className="h-4 w-4 mr-2" />
            Layers
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-200">Region</label>
              <Select 
              value={filters?.region} onValueChange={(value) => setFilters({ ...filters, region: value })}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="All regions" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="all" className="text-white">
                    All regions
                  </SelectItem>
                  <SelectItem value="europe" className="text-white">
                    Europe
                  </SelectItem>
                  <SelectItem value="asia" className="text-white">
                    Asia
                  </SelectItem>
                  <SelectItem value="americas" className="text-white">
                    Americas
                  </SelectItem>
                  <SelectItem value="africa" className="text-white">
                    Africa
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-200">Classification</label>
              <Select
                value={filters.classification}
                onValueChange={(value) => setFilters({ ...filters, classification: value as "top_secret" | "secret" | "confidential" | undefined })}              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="All levels" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="all" className="text-white">
                    All levels
                  </SelectItem>
                  <SelectItem value="top_secret" className="text-white">
                    Top Secret
                  </SelectItem>
                  <SelectItem value="secret" className="text-white">
                    Secret
                  </SelectItem>
                  <SelectItem value="confidential" className="text-white">
                    Confidential
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-200">Search Tags</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Enter tags..."
                  value={filters.tags}
                  onChange={(e) => setFilters({ ...filters, tags: e.target.value })}
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-0">
              <IntelligenceMap
                points={mapData}
                getClassificationColor={getClassificationColor}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Intelligence Points</CardTitle>
              <CardDescription className="text-slate-400">{mapData.length} locations found</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="text-slate-400 mt-2">Loading intelligence data...</p>
                  </div>
                ) : (
                  mapData.map((point, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-blue-500" />
                        <div>
                          <h4 className="text-sm font-medium text-white">{point.name}</h4>
                          <p className="text-xs text-slate-400">
                            {point.coordinates.latitude.toFixed(4)}, {point.coordinates.longitude.toFixed(4)}
                          </p>
                          <p className="text-xs text-slate-400">{point.region}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getClassificationColor(point.classification)}>
                          {point.classification.replace("_", " ").toUpperCase()}
                        </Badge>
                        <div className="flex flex-wrap gap-1">
                          {point.tags.slice(0, 2).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs border-slate-600 text-slate-300">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-300 hover:text-white"
                            onClick={() => setEditingPoint(point)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-red-400">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-slate-800 border-slate-700">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-white">Delete Location</AlertDialogTitle>
                                <AlertDialogDescription className="text-slate-400">
                                  Are you sure you want to delete this intelligence point? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-slate-700 text-white border-slate-600">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteMapPoint(point.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Map Point Dialog */}
      <Dialog open={!!editingPoint} onOpenChange={(open) => !open && setEditingPoint(null)}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Intelligence Point</DialogTitle>
            <DialogDescription className="text-slate-400">Update location information</DialogDescription>
          </DialogHeader>
          {editingPoint && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-point-name" className="text-slate-200">
                  Location Name
                </Label>
                <Input
                  id="edit-point-name"
                  value={editingPoint.name}
                  onChange={(e) => setEditingPoint({ ...editingPoint, name: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-point-description" className="text-slate-200">
                  Description
                </Label>
                <Textarea
                  id="edit-point-description"
                  value={editingPoint.description || ""}
                  onChange={(e) => setEditingPoint({ ...editingPoint, description: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-point-latitude" className="text-slate-200">
                    Latitude
                  </Label>
                  <Input
                    id="edit-point-latitude"
                    type="number"
                    step="0.0001"
                    value={editingPoint.coordinates.latitude}
                    onChange={(e) =>
                      setEditingPoint({
                        ...editingPoint,
                        coordinates: {
                          ...editingPoint.coordinates,
                          latitude: Number.parseFloat(e.target.value),
                        },
                      })
                    }
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-point-longitude" className="text-slate-200">
                    Longitude
                  </Label>
                  <Input
                    id="edit-point-longitude"
                    type="number"
                    step="0.0001"
                    value={editingPoint.coordinates.longitude}
                    onChange={(e) =>
                      setEditingPoint({
                        ...editingPoint,
                        coordinates: {
                          ...editingPoint.coordinates,
                          longitude: Number.parseFloat(e.target.value),
                        },
                      })
                    }
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-point-region" className="text-slate-200">
                  Region
                </Label>
                <Select
                  value={editingPoint.region}
                  onValueChange={(value) => setEditingPoint({ ...editingPoint, region: value })}
                >
                  <SelectTrigger id="edit-point-region" className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="europe" className="text-white">
                      Europe
                    </SelectItem>
                    <SelectItem value="asia" className="text-white">
                      Asia
                    </SelectItem>
                    <SelectItem value="americas" className="text-white">
                      Americas
                    </SelectItem>
                    <SelectItem value="africa" className="text-white">
                      Africa
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-point-tags" className="text-slate-200">
                  Tags (comma separated)
                </Label>
                <Input
                  id="edit-point-tags"
                  value={editingPoint.tags.join(", ")}
                  onChange={(e) => handleTagsChange(e.target.value, "edit")}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-point-classification" className="text-slate-200">
                  Classification
                </Label>
                <Select
                  value={editingPoint.classification}
                  onValueChange={(value) => setEditingPoint({ ...editingPoint, classification: value })}
                >
                  <SelectTrigger id="edit-point-classification" className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="top_secret" className="text-white">
                      Top Secret
                    </SelectItem>
                    <SelectItem value="secret" className="text-white">
                      Secret
                    </SelectItem>
                    <SelectItem value="confidential" className="text-white">
                      Confidential
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPoint(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateMapPoint} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
