use serde_json::json;
use vercel_runtime::{run, service_fn, Error, Request, Response, StatusCode};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(service_fn(handler)).await
}

async fn handler(_req: Request) -> Result<Response<String>, Error> {
    let payload = json!({
        "success": true,
        "nodes": {
            "hanoi": {
                "name": "Hà Nội (VNPT)",
                "ping_ms": 6,
                "status": "optimal"
            },
            "hcm": {
                "name": "TP.HCM (FPT)",
                "ping_ms": 10,
                "status": "optimal"
            },
            "danang": {
                "name": "Đà Nẵng (VNIX)",
                "ping_ms": 14,
                "status": "optimal"
            },
            "singapore": {
                "name": "Singapore Discord",
                "ping_ms": 28,
                "status": "normal"
            }
        },
        "optimized_route": "Direct Anycast VNPT/FPT IX",
        "timestamp": chrono::Utc::now().to_rfc3339()
    });

    let body = serde_json::to_string(&payload)?;
    let response = Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json; charset=utf-8")
        .header("Cache-Control", "no-cache, no-store, must-revalidate")
        .header("Access-Control-Allow-Origin", "*")
        .body(body)?;

    Ok(response)
}
