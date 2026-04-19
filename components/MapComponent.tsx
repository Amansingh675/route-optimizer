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
import { tspBrute } from "@/utils/tspBrute";
import ComparisonChart from "./ComparisonChart";

type Location = { lat: number; lng: number };

export default function MapComponent() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [totalDistance, setTotalDistance] = useState(0);

  const [greedyDist, setGreedyDist] = useState(0);
  const [bruteDist, setBruteDist] = useState(0);

  const [bestAlgo, setBestAlgo] = useState("");
  const [timeGreedy, setTimeGreedy] = useState(0);
  const [timeBrute, setTimeBrute] = useState(0);

  function calcDistance(points: Location[]) {
    let dist = 0;
    for (let i = 0; i < points.length - 1; i++) {
      dist += getDistance(
        points[i].lat,
        points[i].lng,
        points[i + 1].lat,
        points[i + 1].lng
      );
    }
    setTotalDistance(dist);
  }

  function ClickHandler() {
    useMapEvents({
      click(e: LeafletMouseEvent) {
        const newPoint = { lat: e.latlng.lat, lng: e.latlng.lng };

        setLocations((prev) => {
          const updated = [...prev, newPoint];
          calcDistance(updated);
          return updated;
        });
      },
    });
    return null;
  }

  const center: LatLngExpression = [28.6, 77.2];

  return (
    <div className="text-white">
      
      {/* 🔥 BUTTON PANEL */}
      <div className="mb-4 flex flex-wrap gap-3">
        <button
          onClick={() => {
            const opt = tspGreedy(locations);
            setLocations(opt);
            calcDistance(opt);
          }}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition hover:scale-105"
        >
          Optimize 🚀
        </button>

        <button
          onClick={() => {
            setLocations([]);
            setTotalDistance(0);
            setGreedyDist(0);
            setBruteDist(0);
            setBestAlgo("");
          }}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition hover:scale-105"
        >
          Clear
        </button>

        <button
          onClick={() => {
            if (locations.length < 2) {
              alert("Add at least 2 points");
              return;
            }

            // ⏱ Greedy timing
            const startG = performance.now();

            const gPath = tspGreedy(locations);
            let gDist = 0;

            for (let i = 0; i < gPath.length - 1; i++) {
              gDist += getDistance(
                gPath[i].lat,
                gPath[i].lng,
                gPath[i + 1].lat,
                gPath[i + 1].lng
              );
            }

            const endG = performance.now();

            setGreedyDist(gDist);
            setTimeGreedy(endG - startG);

            // ⏱ Brute
            if (locations.length <= 8) {
              const startB = performance.now();

              const { minDist } = tspBrute(locations);

              const endB = performance.now();

              setBruteDist(minDist);
              setTimeBrute(endB - startB);

              if (minDist < gDist) {
                setBestAlgo("Brute Force (Most Accurate)");
              } else {
                setBestAlgo("Greedy (Fast & Efficient)");
              }
            } else {
              alert("Max 8 points for brute force");
              setBestAlgo("Greedy (Large Input)");
            }
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition hover:scale-105"
        >
          Compare 📊
        </button>
      </div>

      {/* 📊 INFO */}
      <div className="mb-4 p-3 bg-gray-800 rounded-xl">
        <p>Total Distance: {totalDistance.toFixed(2)} km</p>
        <p>Total Points: {locations.length}</p>
      </div>

      {/* 🌍 MAP */}
      <div className="rounded-xl overflow-hidden border border-gray-700">
        <MapContainer center={center} zoom={5} className="h-125 w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ClickHandler />

          {locations.map((l, i) => (
            <Marker key={i} position={[l.lat, l.lng]} />
          ))}

          {locations.length > 1 && (
            <Polyline positions={locations.map((l) => [l.lat, l.lng])} />
          )}
        </MapContainer>
      </div>

      {/* 📈 RESULT + CHART */}
      {greedyDist !== 0 && (
        <div className="mt-6">

          {/* 🔥 RESULT BOX */}
          <div className="mb-4 p-4 bg-gray-800 rounded-xl">
            <p>Greedy Distance: {greedyDist.toFixed(2)} km</p>
            <p>Brute Distance: {bruteDist.toFixed(2)} km</p>

            <p className="mt-2">
              ⏱ Greedy Time: {timeGreedy.toFixed(2)} ms
            </p>
            <p>
              ⏱ Brute Time: {timeBrute.toFixed(2)} ms
            </p>

            <p className="mt-3 text-green-400 font-semibold">
              🧠 Best Algorithm: {bestAlgo}
            </p>
          </div>

          <h2 className="text-xl font-semibold mb-3">
            📊 Algorithm Comparison
          </h2>

          <ComparisonChart greedy={greedyDist} brute={bruteDist} />
        </div>
      )}
    </div>
  );
}