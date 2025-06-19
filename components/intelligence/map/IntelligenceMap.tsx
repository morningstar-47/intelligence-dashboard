"use client"

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

// Étendre l'interface MarkerOptions pour inclure la classification
declare module 'leaflet' {
  interface MarkerOptions {
    classification?: 'top_secret' | 'secret' | 'confidential'
  }
}

// Fix pour les icônes Leaflet en Next.js
const DefaultIcon = L.icon({
  iconUrl: '/leaflet/marker-icon.png',
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  shadowUrl: '/leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

interface MapPoint {
  id: string
  name: string
  description?: string
  coordinates: {
    latitude: number
    longitude: number
  }
  classification: 'top_secret' | 'secret' | 'confidential'
  region: string
  tags: string[]
}

interface IntelligenceMapProps {
  points: MapPoint[]
  getClassificationColor: (classification: string) => string
  isLoading?: boolean
}

export function IntelligenceMap({ points, getClassificationColor, isLoading }: IntelligenceMapProps) {
  if (isLoading) {
    return (
      <div className="h-96 bg-slate-700 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg">Chargement de la carte...</p>
        </div>
      </div>
    )
  }

  if (points.length === 0) {
    return (
      <div className="h-96 bg-slate-700 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 text-blue-500 mx-auto mb-4">📍</div>
          <p className="text-slate-300 text-lg">Aucun point de données</p>
          <p className="text-slate-400 text-sm">Ajoutez des points de renseignement pour commencer</p>
        </div>
      </div>
    )
  }

  // Calculer le centre de la carte basé sur les points
  const center = points.reduce(
    (acc, point) => {
      acc[0] += point.coordinates.latitude
      acc[1] += point.coordinates.longitude
      return acc
    },
    [0, 0]
  ).map(coord => coord / points.length)

  return (
    <MapContainer
      center={[center[0], center[1]]}
      zoom={3}
      className="h-96 w-full rounded-lg"
      style={{ background: 'rgb(51, 65, 85)' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="brightness-75"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={(cluster) => {
          const count = cluster.getChildCount()
          const points = cluster.getAllChildMarkers()
          const hasTopSecret = points.some(marker => marker.options.classification === 'top_secret')
          const hasSecret = points.some(marker => marker.options.classification === 'secret')
          
          let className = 'marker-cluster marker-cluster-'
          if (hasTopSecret) className += 'top-secret'
          else if (hasSecret) className += 'secret'
          else className += 'confidential'

          return L.divIcon({
            html: `<div><span>${count}</span></div>`,
            className: className,
            iconSize: L.point(40, 40)
          })
        }}
      >
        {points.map((point) => (
          <Marker
            key={point.id}
            position={[point.coordinates.latitude, point.coordinates.longitude]}
            icon={L.divIcon({
              className: `marker-pin ${getClassificationColor(point.classification).replace('bg-', '')}`,
              html: `<div class="marker-pin-inner"></div>`,
              iconSize: [30, 30],
              iconAnchor: [15, 30]
            })}
            classification={point.classification}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-medium text-lg">{point.name}</h3>
                {point.description && (
                  <p className="text-sm text-gray-600 mt-1">{point.description}</p>
                )}
                <div className="mt-2 text-sm">
                  <p>
                    <span className="font-medium">Coordonnées:</span>{' '}
                    {point.coordinates.latitude.toFixed(4)}, {point.coordinates.longitude.toFixed(4)}
                  </p>
                  <p>
                    <span className="font-medium">Région:</span> {point.region}
                  </p>
                  <p>
                    <span className="font-medium">Classification:</span>{' '}
                    <span className={`inline-block px-2 py-1 rounded text-white text-xs ${getClassificationColor(point.classification)}`}>
                      {point.classification.replace('_', ' ').toUpperCase()}
                    </span>
                  </p>
                  {point.tags.length > 0 && (
                    <div className="mt-2">
                      <span className="font-medium">Tags:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {point.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 bg-slate-200 text-slate-700 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
} 