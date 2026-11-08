export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    status: "ok",
    ping_ms: 0.5,
    server: "hkg1-ap-southeast-1",
    time: Date.now()
  });
}
