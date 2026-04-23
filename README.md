# 🔬 Magika API

REST API for file type detection using **Google Magika** AI.

## 🚀 Quick Start

```bash
npm install
npm run dev
# Server at http://localhost:3000
```

## 🐳 Run with Docker

```bash
docker compose up --build
# Server at http://localhost:3000
```

Running compose:

```bash
docker compose up -d --build
```

Stop container:

```bash
docker compose down
```

## 📡 Endpoints

### `POST /api/detect/file`

Upload file via multipart/form-data (field: `file`, max 10 files).

```bash
curl -X POST http://localhost:3000/api/detect/file -F "file=@photo.jpg"
```

### `POST /api/detect/bytes`

Send base64 content via JSON.

```bash
curl -X POST http://localhost:3000/api/detect/bytes \
  -H "Content-Type: application/json" \
  -d '{"bytes":"IyBIZWxsbw==","fileName":"test.md"}'
```

### `POST /api/detect/url`

Detect from a remote URL.

```bash
curl -X POST http://localhost:3000/api/detect/url \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/image.png"}'
```

### `GET /api/health`

Health check.

## 📦 Response

```json
{
  "success": true,
  "results": [
    {
      "fileName": "photo.jpg",
      "fileSize": 204800,
      "detection": {
        "label": "jpeg",
        "mime_type": "image/jpeg",
        "group": "image",
        "description": "JPEG image",
        "score": 0.99
      }
    }
  ]
}
```

## 🔧 Integration

### JavaScript

```javascript
const formData = new FormData();
formData.append("file", fileInput.files[0]);
const res = await fetch("http://localhost:3000/api/detect/file", {
  method: "POST",
  body: formData,
});
const result = await res.json();
```

### PHP

```php
$ch = curl_init("http://localhost:3000/api/detect/file");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, ["file" => new CURLFile("file.pdf")]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = json_decode(curl_exec($ch));
```

### Python

```python
import requests
files = {"file": open("doc.pdf", "rb")}
r = requests.post("http://localhost:3000/api/detect/file", files=files)
print(r.json()["results"][0]["detection"]["label"])
```

## ⚙️ Config

| Variable | Default   | Description  |
| -------- | --------- | ------------ |
| `PORT`   | `3000`    | Server port  |
| `HOST`   | `0.0.0.0` | Host binding |

## 📄 License

MIT — Powered by [Google Magika](https://github.com/google/magika)
