"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import type { LeafletMouseEvent, LatLngExpression } from "leaflet";
import { getDistance } from "@/utils/distance";
import { tspGreedy } from "@/utils/tsp";

type Location = {
  lat: number;
  lng: number;
};

export default function MapComponent() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);

  function calculateDistance(points: Location[]) {
    let distance = 0;
    for (let i = 0; i < points.length - 1; i++) {
      distance += getDistance(
        points[i].lat,
        points[i].lng,
        points[i + 1].lat,
        points[i + 1].lng
      );
    }
    setTotalDistance(distance);
  }

  function MapClickHandler() {
    useMapEvents({
      click(e: LeafletMouseEvent) {
        const newPoint = { lat: e.latlng.lat, lng: e.latlng.lng };

        setLocations((prev) => {
          const updated = [...prev, newPoint];
          calculateDistance(updated);
          return updated;
        });
      },
    });
    return null;
  }

  const center: LatLngExpression = [28.6139, 77.209];

  return (
    <div>
      {/* Buttons */}
      <div className="mb-4 flex gap-4">
        <button
          onClick={() => {
            const optimized = tspGreedy(locations);
            setLocations(optimized);
            calculateDistance(optimized);
          }}
          className="px-4 py-2 bg-green-600 rounded-lg"
        >
          Optimize Route 🚀
        </button>

        <button
          onClick={() => {
            setLocations([]);
            setTotalDistance(0);
          }}
          className="px-4 py-2 bg-red-600 rounded-lg"
        >
          Clear
        </button>
      </div>

      {/* Info */}
      <div className="mb-4 p-3 bg-gray-800 rounded-lg text-white">
        <p>Total Distance: {totalDistance.toFixed(2)} km</p>
        <p>Points: {locations.length}</p>
      </div>

      {/* Map */}
      <MapContainer
        center={center}
        zoom={5}
        className="h-125 w-full rounded-xl"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapClickHandler />

        {locations.map((loc, i) => (
          <Marker key={i} position={[loc.lat, loc.lng]} />
        ))}

        {locations.length > 1 && (
          <Polyline positions={locations.map((l) => [l.lat, l.lng])} />
        )}
      </MapContainer>
    </div>
  );
}