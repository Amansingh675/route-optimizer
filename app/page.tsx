import Link from "next/link";
import {
  Map,
  Cpu,
  Zap,
  LayoutDashboard,
  BarChart3,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const features = [
  {
    title: "Core Routing",
    desc: "Shortest path & multi-location routing",
    link: "/core",
    icon: Map,
  },
  {
    title: "Smart Features",
    desc: "Traffic, weather, delivery mode",
    link: "/smart",
    icon: Zap,
  },
  {
    title: "User Experience",
    desc: "UI, drag-drop, dark mode",
    link: "/ux",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    desc: "Charts & performance insights",
    link: "/analytics",
    icon: BarChart3,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white px-10 py-10">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">
          Route Optimizer 🚀
        </h1>

        <ThemeToggle />
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => {
          const Icon = f.icon;

          return (
            <Link key={i} href={f.link}>
              <div className="p-6 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 text-white shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                
                <Icon className="mb-4" size={30} />

                <h2 className="text-xl font-semibold mb-2">
                  {f.title}
                </h2>

                <p className="text-sm opacity-90">
                  {f.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

    </main>
  );
}