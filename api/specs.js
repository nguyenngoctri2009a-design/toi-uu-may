export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { gpu = '', cpu = '', ram = '16' } = req.query;
  
  const ramNum = parseInt(ram) || 16;
  const isHighEnd = gpu.toLowerCase().includes('rtx') || gpu.toLowerCase().includes('rx 6') || gpu.toLowerCase().includes('rx 7');
  
  res.status(200).json({
    grade: isHighEnd ? "S" : (ramNum >= 16 ? "A" : "B"),
    estimated_fps: isHighEnd ? 144 : (ramNum >= 16 ? 115 : 78),
    recommended_profile: isHighEnd ? "Ultra High 144Hz" : (ramNum >= 16 ? "Standard Competitor" : "Potato Ultra Smooth"),
    timestamp: new Date().toISOString()
  });
}
