use serde_json::{json, Value};
use vercel_runtime::{run, service_fn, Error, Request, Response, StatusCode};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(service_fn(handler)).await
}

async fn handler(_req: Request) -> Result<Response<String>, Error> {
    let payload = json!({
        "status": "online",
        "service": "GTA5VN-System Rust Core Engine",
        "version": "v2.5.2 Stable",
        "runtime": "Rust 2021 (Vercel Native Lambda)",
        "features": {
            "fps_lock": 144,
            "timer_resolution": "0.5ms",
            "standby_ram_cleaner": true,
            "tcp_nodelay": true
        },
        "region": "ap-southeast-1 (Singapore/VN Edge)",
        "timestamp": chrono::Utc::now().to_rfc3339()
    });

    let body = serde_json::to_string(&payload)?;
    let response = Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json; charset=utf-8")
        .header("Cache-Control", "public, s-maxage=60, stale-while-revalidate=30")
        .header("Access-Control-Allow-Origin", "*")
        .body(body)?;

    Ok(response)
}
