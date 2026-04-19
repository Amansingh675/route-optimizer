"use client";

import MapWrapper from "@/components/MapWrapper";

export default function CorePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl mb-4">Core Routing Module</h1>

      <p className="mb-4">
        Click on map to add locations
      </p>

      <MapWrapper />
    </div>
  );
}