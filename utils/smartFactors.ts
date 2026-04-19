export function getTrafficFactor() {
  // 1 = normal, 1.5 = medium traffic, 2 = heavy
  return 1 + Math.random(); 
}

export function getWeatherFactor() {
  // 1 = clear, 1.3 = rain, 1.6 = heavy rain
  const rand = Math.random();

  if (rand < 0.5) return 1;        // clear
  if (rand < 0.8) return 1.3;      // rain
  return 1.6;                      // heavy rain
}