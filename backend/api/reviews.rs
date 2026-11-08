use serde::{Deserialize, Serialize};
use serde_json::json;
use vercel_runtime::{run, Body, Error, Method, Request, Response, StatusCode};

#[derive(Debug, Serialize, Deserialize, Clone)]
struct ReviewItem {
    id: String,
    author: String,
    specs: String,
    rating: u8,
    comment: String,
    created_at: String,
    verified: bool,
}

#[derive(Debug, Deserialize)]
struct CreateReviewRequest {
    name: String,
    specs: Option<String>,
    rating: Option<u8>,
    comment: String,
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

fn sanitize_text(input: &str) -> String {
    input
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('\"', "&quot;")
        .replace('\'', "&#x27;")
        .trim()
        .to_string()
}

pub async fn handler(req: Request) -> Result<Response<Body>, Error> {
    match req.method() {
        &Method::GET => {
            let reviews = vec![
                ReviewItem {
                    id: "rev_01".to_string(),
                    author: "Phan Anh Tuấn".to_string(),
                    specs: "i5 10400F • GTX 1660 Super • 16GB RAM".to_string(),
                    rating: 5,
                    comment: "Bản v2.5.2 này tối ưu quá ngon. Vào zone chợ đen combat 50-60 mạng bắn nhau mà FPS vẫn giữ cứng 140-144, không còn bị tụt drop giật khung hình như trước.".to_string(),
                    created_at: "2026-11-06T14:32:00Z".to_string(),
                    verified: true,
                },
                ReviewItem {
                    id: "rev_02".to_string(),
                    author: "Lê Hoàng Long (LongCa FiveM)".to_string(),
                    specs: "i3 10105F • GTX 1050Ti • 8GB RAM".to_string(),
                    rating: 5,
                    comment: "Dàn máy quán net cỏ của mình trước toàn crash vì tràn VRAM và nghẽn Standby RAM. Tải bản này xong dọn sạch 3.8GB RAM ảo, chạy mượt re!".to_string(),
                    created_at: "2026-11-07T09:15:00Z".to_string(),
                    verified: true,
                },
                ReviewItem {
                    id: "rev_03".to_string(),
                    author: "Nguyễn Minh Đức (Đức Streamer)".to_string(),
                    specs: "Ryzen 5 5600X • RTX 3060 • 32GB RAM".to_string(),
                    rating: 5,
                    comment: "Timer Resolution ép về chuẩn 0.50ms nên độ trễ vẩy chuột siêu bén, headshot chuẩn hơn hẳn. 10 điểm uy tín!".to_string(),
                    created_at: "2026-11-07T18:40:00Z".to_string(),
                    verified: true,
                },
            ];

            let payload = json!({
                "success": true,
                "total": reviews.len(),
                "data": reviews
            });

            let response = Response::builder()
                .status(StatusCode::OK)
                .header("Content-Type", "application/json; charset=utf-8")
                .header("Cache-Control", "public, s-maxage=60, stale-while-revalidate=120")
                .header("Access-Control-Allow-Origin", "*")
                .body(payload.to_string().into())?;

            Ok(response)
        }

        &Method::POST => {
            let body_bytes = req.body();
            let body_str = String::from_utf8_lossy(body_bytes);

            let new_rev: Result<CreateReviewRequest, _> = serde_json::from_str(&body_str);

            match new_rev {
                Ok(item) => {
                    let clean_name = sanitize_text(&item.name);
                    let clean_comment = sanitize_text(&item.comment);
                    let clean_specs = item.specs.map(|s| sanitize_text(&s)).unwrap_or_else(|| "PC Gaming".to_string());
                    let rating = item.rating.unwrap_or(5).clamp(1, 5);

                    if clean_name.is_empty() || clean_comment.is_empty() {
                        let error_body = json!({
                            "success": false,
                            "error": "Tên và nội dung đánh giá không được để trống."
                        });
                        let response = Response::builder()
                            .status(StatusCode::BAD_REQUEST)
                            .header("Content-Type", "application/json; charset=utf-8")
                            .header("Access-Control-Allow-Origin", "*")
                            .body(error_body.to_string().into())?;
                        return Ok(response);
                    }

                    let created = ReviewItem {
                        id: format!("rev_{}", chrono::Utc::now().timestamp_millis()),
                        author: clean_name,
                        specs: clean_specs,
                        rating,
                        comment: clean_comment,
                        created_at: chrono::Utc::now().to_rfc3339(),
                        verified: true,
                    };

                    let success_body = json!({
                        "success": true,
                        "message": "Đăng đánh giá thành công qua Rust Core API.",
                        "data": created
                    });

                    let response = Response::builder()
                        .status(StatusCode::CREATED)
                        .header("Content-Type", "application/json; charset=utf-8")
                        .header("Access-Control-Allow-Origin", "*")
                        .body(success_body.to_string().into())?;

                    Ok(response)
                }
                Err(err) => {
                    let err_json = json!({
                        "success": false,
                        "error": format!("Dữ liệu gửi lên không đúng định dạng JSON: {}", err)
                    });
                    let response = Response::builder()
                        .status(StatusCode::BAD_REQUEST)
                        .header("Content-Type", "application/json; charset=utf-8")
                        .header("Access-Control-Allow-Origin", "*")
                        .body(err_json.to_string().into())?;
                    Ok(response)
                }
            }
        }

        &Method::OPTIONS => {
            let response = Response::builder()
                .status(StatusCode::OK)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
                .header("Access-Control-Allow-Headers", "Content-Type, Authorization")
                .body("".into())?;
            Ok(response)
        }

        _ => {
            let response = Response::builder()
                .status(StatusCode::METHOD_NOT_ALLOWED)
                .body("Method Not Allowed".into())?;
            Ok(response)
        }
    }
}
