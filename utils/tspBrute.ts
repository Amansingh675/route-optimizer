type Point = { lat: number; lng: number };

import { getDistance } from "./distance";

function permute(arr: Point[]): Point[][] {
  if (arr.length <= 1) return [arr];

  const result: Point[][] = [];

  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const perms = permute(rest);

    for (const p of perms) {
      result.push([arr[i], ...p]);
    }
  }

  return result;
}

export function tspBrute(points: Point[]) {
  const perms = permute(points);

  let best = perms[0];
  let minDist = Infinity;

  for (const path of perms) {
    let dist = 0;

    for (let i = 0; i < path.length - 1; i++) {
      dist += getDistance(
        path[i].lat,
        path[i].lng,
        path[i + 1].lat,
        path[i + 1].lng
      );
    }

    if (dist < minDist) {
      minDist = dist;
      best = path;
    }
  }

  return { bestPath: best, minDist };
}