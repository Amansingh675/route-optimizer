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

type Location = {
  lat: number;
  lng: number;
};

export default function MapComponent() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);

  function MapClickHandler() {
    useMapEvents({
      click(e: LeafletMouseEvent) {
        const newPoint = { lat: e.latlng.lat, lng: e.latlng.lng };

        setLocations((prev) => {
          const updated = [...prev, newPoint];

          // calculate distance
          let distance = 0;
          for (let i = 0; i < updated.length - 1; i++) {
            distance += getDistance(
              updated[i].lat,
              updated[i].lng,
              updated[i + 1].lat,
              updated[i + 1].lng
            );
          }

          setTotalDistance(distance);
          return updated;
        });
      },
    });
    return null;
  }

  const center: LatLngExpression = [28.6139, 77.2090];

  return (
    <div>
      {/* Distance UI */}
      <div className="mb-4 p-3 bg-gray-800 rounded-lg">
        <p>Total Distance: {totalDistance.toFixed(2)} km</p>
        <p>Points: {locations.length}</p>
      </div>

      <MapContainer
        center={center}
        zoom={5}
        className="h-125 w-full rounded-xl"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapClickHandler />

        {/* Markers */}
        {locations.map((loc, i) => (
          <Marker key={i} position={[loc.lat, loc.lng]} />
        ))}

        {/* Route Line */}
        {locations.length > 1 && (
          <Polyline positions={locations.map((l) => [l.lat, l.lng])} />
        )}
      </MapContainer>
    </div>
  );
}