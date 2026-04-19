"use client";

import MapWrapper from "@/components/MapWrapper";

export default function CorePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl mb-4">
        Core Routing
      </h1>

      <p>Basic route drawing & distance calculation</p>

      <MapWrapper />
    </div>
  );
}