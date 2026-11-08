use serde_json::json;
use std::collections::HashMap;
use vercel_runtime::{run, Body, Error, Request, Response, StatusCode};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(req: Request) -> Result<Response<Body>, Error> {
    let uri = req.uri();
    let query_map: HashMap<String, String> = uri
        .query()
        .map(|v| {
            url::form_urlencoded::parse(v.as_bytes())
                .into_owned()
                .collect()
        })
        .unwrap_or_default();

    let cores = query_map
        .get("cores")
        .and_then(|c| c.parse::<u32>().ok())
        .unwrap_or(4);

    let ram_gb = query_map
        .get("ram_gb")
        .and_then(|r| r.parse::<u32>().ok())
        .unwrap_or(8);

    let gpu = query_map
        .get("gpu")
        .map(|s| s.to_string())
        .unwrap_or_else(|| "GeForce GTX Series".to_string());

    let (tier, preset, target_fps, boost_percent, advice) = if ram_gb >= 16 && cores >= 6 {
        (
            "TIER_HIGH_END",
            "high",
            144,
            65,
            "Cấu hình đủ mạnh để khóa cứng 144Hz mượt mà, khử hoàn toàn hiện tượng drop 1% low khi combat đông người.",
        )
    } else if ram_gb >= 8 && cores >= 4 {
        (
            "TIER_MAINSTREAM",
            "net",
            90,
            82,
            "Cấu hình phổ thông chuẩn gaming net. Tối ưu thu hồi Standby RAM và khử shadow giúp ổn định 60-90 FPS liên tục.",
        )
    } else {
        (
            "TIER_POTATO",
            "potato",
            60,
            95,
            "Cấu hình yếu. Cần tắt toàn bộ hiệu ứng bóng đồ họa để giải phóng VRAM và đảm bảo tốc độ 60 FPS không giật lag.",
        )
    };

    let payload = json!({
        "success": true,
        "input": {
            "cores": cores,
            "ram_gb": ram_gb,
            "gpu": gpu
        },
        "diagnosis": {
            "tier": tier,
            "recommended_preset": preset,
            "target_fps": target_fps,
            "estimated_boost_percent": boost_percent,
            "latency_ms": "0.50ms",
            "advice": advice
        },
        "engine": "GTA5VN Rust Hardware Analyzer v2.5.2"
    });

    let response = Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json; charset=utf-8")
        .header("Cache-Control", "public, s-maxage=300")
        .header("Access-Control-Allow-Origin", "*")
        .body(payload.to_string().into())?;

    Ok(response)
}
