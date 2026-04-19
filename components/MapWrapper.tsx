"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

// ✅ Props define
type Props = {
  mode?: string;
};

// ✅ Proper typing for dynamic import
const MapComponent = dynamic(
  () => import("./MapComponent")
) as ComponentType<Props>;

export default function MapWrapper({ mode }: Props) {
  return <MapComponent mode={mode} />;
}