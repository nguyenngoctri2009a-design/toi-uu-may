export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
  res.status(200).json({
    status: "online",
    service: "GTA5VN-System Rust Core Engine",
    version: "v2.5.2 Stable",
    runtime: "Rust Core / Vercel Edge Serverless",
    features: {
      fps_lock: 144,
      timer_resolution: "0.5ms",
      standby_ram_cleaner: true,
      tcp_nodelay: true
    },
    region: "ap-southeast-1 (Singapore/VN Edge)",
    timestamp: new Date().toISOString()
  });
}
