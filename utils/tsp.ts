type Point = { lat: number; lng: number };

import { getDistance } from "./distance";

export function tspGreedy(points: Point[]): Point[] {
  if (points.length <= 2) return points;

  const visited = new Array(points.length).fill(false);
  const result: Point[] = [];

  let current = 0;
  visited[current] = true;
  result.push(points[current]);

  for (let i = 1; i < points.length; i++) {
    let nearest = -1;
    let min = Infinity;

    for (let j = 0; j < points.length; j++) {
      if (!visited[j]) {
        const dist = getDistance(
          points[current].lat,
          points[current].lng,
          points[j].lat,
          points[j].lng
        );

        if (dist < min) {
          min = dist;
          nearest = j;
        }
      }
    }

    visited[nearest] = true;
    result.push(points[nearest]);
    current = nearest;
  }

  return result;
}