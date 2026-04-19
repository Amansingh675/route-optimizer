"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

export default function MapComponent() {
  const [points, setPoints] = useState<any[]>([]);

  function ClickHandler() {
    useMapEvents({
      click(e) {
        setPoints((prev) => [...prev, e.latlng]);
      },
    });
    return null;
  }

  return (
    <MapContainer center={[28.6, 77.2]} zoom={5} className="h-125">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ClickHandler />
      {points.map((p, i) => (
        <Marker key={i} position={p} />
      ))}
    </MapContainer>
  );
}