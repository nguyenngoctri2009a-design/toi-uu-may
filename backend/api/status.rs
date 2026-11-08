use serde_json::json;
use vercel_runtime::{run, Body, Error, Request, Response, StatusCode};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(_req: Request) -> Result<Response<Body>, Error> {
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
        "region": "ap-southeast-1 (Singapore/VN Edge)"
    });

    let response = Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json; charset=utf-8")
        .header("Cache-Control", "public, s-maxage=60, stale-while-revalidate=120")
        .header("Access-Control-Allow-Origin", "*")
        .body(payload.to_string().into())?;

    Ok(response)
}
