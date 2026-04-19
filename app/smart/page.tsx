"use client";

import MapWrapper from "../../components/MapWrapper";

export default function SmartPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      
      <h1 className="text-3xl mb-4">
        Smart Features 🚦
      </h1>

      <p className="mb-4 text-gray-400">
        Traffic simulation, real-world routing behavior
      </p>

      <MapWrapper mode="smart" />
    </div>
  );
}