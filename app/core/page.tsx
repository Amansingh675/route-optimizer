import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

export default function CorePage() {
  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl mb-4">Core Routing</h1>
      <MapComponent />
    </div>
  );
}