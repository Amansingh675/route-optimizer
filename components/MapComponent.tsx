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

import { getDistance } from "../utils/distance";
import { tspGreedy } from "../utils/tsp";
import { tspBrute } from "../utils/tspBrute";
import ComparisonChart from "./ComparisonChart";
import { getTrafficFactor, getWeatherFactor } from "../utils/smartFactors";

type Location = { lat: number; lng: number };

type Props = {
  mode?: string;
};

export default function MapComponent({ mode }: Props) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [totalDistance, setTotalDistance] = useState(0);

  const [greedyDist, setGreedyDist] = useState(0);
  const [bruteDist, setBruteDist] = useState(0);
  const [bestAlgo, setBestAlgo] = useState("");

  // ✅ SMART STATES (cleaned)
  const [trafficFactor, setTrafficFactor] = useState(1);
  const [weatherFactor, setWeatherFactor] = useState(1);
  const [weatherType, setWeatherType] = useState("");
  const [smartDistance, setSmartDistance] = useState(0);

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

        setLocations((prev: Location[]) => {
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

      {/* 🔥 BUTTONS */}
      <div className="mb-4 flex flex-wrap gap-3">

        {/* COMMON */}
        <button
          onClick={() => {
            const opt = tspGreedy(locations);
            setLocations(opt);
            calcDistance(opt);
          }}
          className="px-4 py-2 bg-green-600 rounded-lg"
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
            setSmartDistance(0);
          }}
          className="px-4 py-2 bg-red-600 rounded-lg"
        >
          Clear
        </button>

        {/* CORE */}
        {mode !== "smart" && (
          <button
            onClick={() => {
              if (locations.length < 2) return;

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

              setGreedyDist(gDist);

              if (locations.length <= 8) {
                const { minDist } = tspBrute(locations);
                setBruteDist(minDist);
                setBestAlgo(minDist < gDist ? "Brute Force" : "Greedy");
              }
            }}
            className="px-4 py-2 bg-blue-600 rounded-lg"
          >
            Compare 📊
          </button>
        )}

        {/* 🚦 TRAFFIC */}
        {mode === "smart" && (
          <button
            onClick={() => {
              const traffic = getTrafficFactor();
              setTrafficFactor(traffic);
              alert("Traffic Updated 🚦");
            }}
            className="px-4 py-2 bg-yellow-500 rounded-lg"
          >
            Traffic 🚦
          </button>
        )}

        {/* 🌦 WEATHER */}
        {mode === "smart" && (
          <button
            onClick={() => {
              const weather = getWeatherFactor();

              let type = "Clear";
              if (weather > 1.4) type = "Storm";
              else if (weather > 1.1) type = "Rain";

              setWeatherFactor(weather);
              setWeatherType(type);

              alert(`Weather: ${type} 🌦`);
            }}
            className="px-4 py-2 bg-purple-600 rounded-lg"
          >
            Weather 🌦
          </button>
        )}

        {/* 🧠 APPLY */}
        {mode === "smart" && (
          <button
            onClick={() => {
              if (locations.length < 2) return;

              let baseDist = 0;

              for (let i = 0; i < locations.length - 1; i++) {
                baseDist += getDistance(
                  locations[i].lat,
                  locations[i].lng,
                  locations[i + 1].lat,
                  locations[i + 1].lng
                );
              }

              const finalDist = baseDist * trafficFactor * weatherFactor;
              setSmartDistance(finalDist);
            }}
            className="px-4 py-2 bg-green-700 rounded-lg"
          >
            Apply Smart 🧠
          </button>
        )}
      </div>

      {/* INFO */}
      <div className="mb-4 p-3 bg-gray-800 rounded-xl">
        <p>Total Distance: {totalDistance.toFixed(2)} km</p>
        <p>Total Points: {locations.length}</p>
      </div>

      {/* MAP */}
      <MapContainer center={center} zoom={5} className="h-125 w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ClickHandler />

        {locations.map((l, i) => (
          <Marker key={i} position={[l.lat, l.lng]} />
        ))}

        {locations.length > 1 && (
          <Polyline
            positions={locations.map((l) => [l.lat, l.lng])}
            pathOptions={{
              color:
                mode === "smart"
                  ? weatherType === "Storm"
                    ? "purple"
                    : trafficFactor > 1.5
                    ? "red"
                    : "orange"
                  : "blue",
            }}
          />
        )}
      </MapContainer>

      {/* SMART RESULT */}
      {mode === "smart" && smartDistance !== 0 && (
        <div className="mt-6 p-4 bg-gray-800 rounded-xl">
          <p>Base Distance: {totalDistance.toFixed(2)} km</p>
          <p>🚦 Traffic: {trafficFactor.toFixed(2)}x</p>
          <p>🌦 Weather: {weatherType}</p>

          <p className="mt-3 text-yellow-400 font-semibold">
            Smart Distance: {smartDistance.toFixed(2)} km
          </p>
        </div>
      )}
    </div>
  );
}