import Link from "next/link";

const features = [
  {
    title: "Core Routing",
    desc: "Shortest path, multi-location routing",
    link: "/core",
  },
  {
    title: "Advanced Algorithms",
    desc: "TSP, Greedy, DP, Brute Force",
    link: "/advanced",
  },
  {
    title: "Smart Features",
    desc: "Traffic, weather, delivery mode",
    link: "/smart",
  },
  {
    title: "User Experience",
    desc: "UI controls, drag-drop, dark mode",
    link: "/ux",
  },
  {
    title: "Analytics & Visualization",
    desc: "Charts, performance comparison",
    link: "/analytics",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-10 py-12">
      
      {/* Title */}
      <h1 className="text-5xl font-bold text-center mb-16">
        Route Optimizer 🚀
      </h1>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-10">
        {features.map((f, i) => (
          <Link key={i} href={f.link}>
            <div className="p-8 bg-gray-800 rounded-2xl shadow-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-700">
              
              <h2 className="text-2xl font-semibold mb-3">
                {f.title}
              </h2>

              <p className="text-gray-400">
                {f.desc}
              </p>

            </div>
          </Link>
        ))}
      </div>

    </main>
  );
}