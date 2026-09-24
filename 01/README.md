# mycurl — 類似 curl 的 Python HTTP 命令列工具

> 現代軟體工程課程專案  
> 使用 Python 標準函式庫，零外部依賴

## 安裝

```bash
cd _se
python -m mycurl --help
```

或安裝為命令列工具：

```bash
pip install -e .
mycurl --help
```

## 使用方式

```
python -m mycurl [選項] <URL>
```

### 基本 GET 請求

```bash
python -m mycurl https://httpbin.org/get
```

### 指定 HTTP 方法

```bash
python -m mycurl -X DELETE https://httpbin.org/delete
python -m mycurl -X PUT https://httpbin.org/put
```

### POST 請求資料

```bash
# 表單編碼
python -m mycurl -d "username=admin" -d "password=1234" https://httpbin.org/post

# JSON 格式
python -m mycurl --json '{"name":"test","age":25}' https://httpbin.org/post
```

### 自訂標頭

```bash
python -m mycurl -H "Authorization: Bearer token123" -H "Accept: application/json" https://httpbin.org/headers
```

### 顯示詳細資訊

```bash
python -m mycurl -v https://httpbin.org/get
```

輸出：

```
* Connecting to httpbin.org port 443
> GET /get HTTP/1.1
> Host: httpbin.org

< HTTP/1.1 200 OK
< Content-Type: application/json
< ...
```

### 顯示回應標頭

```bash
python -m mycurl -i https://httpbin.org/get
```

### 下載檔案

```bash
python -m mycurl -o output.html https://example.com
```

### 上傳檔案

```bash
python -m mycurl -F "file=@test.txt" https://httpbin.org/post
python -m mycurl -F "name=myfile" -F "file=@image.png" https://httpbin.org/post
```

### 跟隨重新導向

```bash
python -m mycurl -L https://httpbin.org/redirect/3
```

### 跳過 SSL 驗證

```bash
python -m mycurl -k https://self-signed.example.com
```

### HTTP 基本認證

```bash
python -m mycurl -u admin:password123 https://httpbin.org/basic-auth/admin/password123
```

### 自訂 User-Agent

```bash
python -m mycurl -A "MyBot/1.0" https://httpbin.org/user-agent
```

## 完整參數一覽

| 參數 | 說明 |
|------|------|
| `-X, --request METHOD` | 指定 HTTP 方法 |
| `-d, --data DATA` | 傳送 POST 請求資料（可多次使用） |
| `-H, --header NAME:VALUE` | 自訂請求標頭 |
| `-o, --output FILE` | 將回應寫入檔案 |
| `-F, --form NAME=VALUE` | multipart/form-data 上傳（`@file` 讀取檔案） |
| `-v, --verbose` | 顯示請求與回應詳細資訊 |
| `-i, --include` | 在輸出中包含回應標頭 |
| `-L, --location` | 自動跟隨重新導向 |
| `-k, --insecure` | 跳過 SSL 憑證驗證 |
| `--json DATA` | 以 JSON 格式傳送資料 |
| `--max-redirs N` | 最大重新導向次數（預設 10） |
| `--connect-timeout N` | 連線逾時秒數（預設 10） |
| `-u, --user USER:PASSWORD` | HTTP 基本認證 |
| `-A, --user-agent STRING` | 設定 User-Agent |

## 測試

```bash
# 安裝測試依賴
pip install pytest

# 執行測試
pytest tests/
```

## 架構

```
mycurl/
├── __init__.py          # 套件版本
├── __main__.py          # 入口點
├── cli.py               # 命令列參數解析
├── client.py            # HTTP 客戶端核心
├── request.py           # 請求物件構建
├── response.py          # 回應處理
├── verbose.py           # -v 詳細輸出
├── redirect.py          # 重新導向處理
├── ssl_config.py        # SSL/TLS 設定
└── multipart.py         # multipart 編碼
```

## 技術特點

- **零外部依賴**：僅使用 Python 標準函式庫
- **模組化設計**：每個功能獨立成模組，易於擴展
- **類似 curl 介面**：參數命名與 curl 一致，降低學習成本
