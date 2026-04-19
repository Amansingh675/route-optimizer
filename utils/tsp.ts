type Point = {
  lat: number;
  lng: number;
};

import { getDistance } from "./distance";

export function tspGreedy(points: Point[]): Point[] {
  if (points.length <= 2) return points;

  const visited: boolean[] = new Array(points.length).fill(false);
  const result: Point[] = [];

  let currentIndex = 0;
  result.push(points[currentIndex]);
  visited[currentIndex] = true;

  for (let i = 1; i < points.length; i++) {
    let nearestIndex = -1;
    let minDist = Infinity;

    for (let j = 0; j < points.length; j++) {
      if (!visited[j]) {
        const dist = getDistance(
          points[currentIndex].lat,
          points[currentIndex].lng,
          points[j].lat,
          points[j].lng
        );

        if (dist < minDist) {
          minDist = dist;
          nearestIndex = j;
        }
      }
    }

    visited[nearestIndex] = true;
    result.push(points[nearestIndex]);
    currentIndex = nearestIndex;
  }

  return result;
}