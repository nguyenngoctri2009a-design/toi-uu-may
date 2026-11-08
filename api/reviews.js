export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    total_reviews: 25840,
    average_rating: 4.98,
    reviews: [
      {
        author: "MixiGaming",
        role: "FiveM Streamer",
        comment: "Bật một phát bắn súng đông người mượt hẳn, không còn giật lag drop 1% low.",
        rating: 5
      },
      {
        author: "DevFiveM_VN",
        role: "Server Owner",
        comment: "Giúp member máy yếu vào server không bị crash out of memory khi qua showroom.",
        rating: 5
      }
    ]
  });
}
