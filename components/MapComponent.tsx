"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import type { LeafletMouseEvent, LatLngExpression } from "leaflet";

type Location = {
  lat: number;
  lng: number;
};

export default function MapComponent() {
  const [locations, setLocations] = useState<Location[]>([]);

  function MapClickHandler() {
    useMapEvents({
      click(e: LeafletMouseEvent) {
        setLocations((prev) => [
          ...prev,
          { lat: e.latlng.lat, lng: e.latlng.lng },
        ]);
      },
    });
    return null;
  }

  const center: LatLngExpression = [28.6139, 77.2090];

  return (
    <div className="h-125 w-full">
      <MapContainer
        center={center}
        zoom={5}
        className="h-full w-full rounded-xl"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />

        {locations.map((loc, i) => (
          <Marker key={i} position={[loc.lat, loc.lng]} />
        ))}
      </MapContainer>
    </div>
  );
}