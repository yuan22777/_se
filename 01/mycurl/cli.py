"""命令列參數解析器，支援類似 curl 的操作介面"""

import argparse
import sys


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="mycurl",
        description="mycurl - 類似 curl 的 Python HTTP 命令列工具",
    )

    parser.add_argument(
        "url",
        help="目標 URL（如 https://example.com/path）",
    )

    parser.add_argument(
        "-X", "--request",
        default=None,
        help="指定 HTTP 方法（GET, POST, PUT, DELETE 等），預設根據是否有資料自動判斷",
    )

    parser.add_argument(
        "-d", "--data",
        action="append",
        default=[],
        help="傳送請求資料（可多次使用），會自動設為 POST 方法",
    )

    parser.add_argument(
        "-H", "--header",
        action="append",
        default=[],
        metavar="NAME:VALUE",
        help="自訂請求標頭（可多次使用），如 -H \"Authorization: Bearer xxx\"",
    )

    parser.add_argument(
        "-o", "--output",
        default=None,
        help="將回應內容寫入檔案",
    )

    parser.add_argument(
        "-F", "--form",
        action="append",
        default=[],
        metavar="NAME=VALUE",
        help="以 multipart/form-data 上傳檔案，如 -F \"file=@test.txt\"",
    )

    parser.add_argument(
        "-v", "--verbose",
        action="store_true",
        help="顯示請求與回應的詳細資訊",
    )

    parser.add_argument(
        "-i", "--include",
        action="store_true",
        help="在輸出中包含回應標頭",
    )

    parser.add_argument(
        "-L", "--location",
        action="store_true",
        help="自動跟隨 HTTP 重新導向（3xx）",
    )

    parser.add_argument(
        "-k", "--insecure",
        action="store_true",
        help="跳過 SSL 憑證驗證",
    )

    parser.add_argument(
        "--json",
        default=None,
        metavar="DATA",
        help="以 JSON 格式傳送資料（自動設定 Content-Type: application/json）",
    )

    parser.add_argument(
        "--max-redirs",
        type=int,
        default=10,
        help="-L 模式下的最大重新導向次數（預設 10）",
    )

    parser.add_argument(
        "--connect-timeout",
        type=int,
        default=10,
        help="連線逾時秒數（預設 10）",
    )

    parser.add_argument(
        "-u", "--user",
        default=None,
        metavar="USER:PASSWORD",
        help="HTTP 基本認證，格式為 USER:PASSWORD",
    )

    parser.add_argument(
        "-A", "--user-agent",
        default="mycurl/0.1.0",
        help="設定 User-Agent 標頭",
    )

    return parser


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = build_parser()
    args = parser.parse_args(argv)
    _infer_method(args)
    return args


def _infer_method(args: argparse.Namespace) -> None:
    if args.request:
        args.request = args.request.upper()
    elif args.data or args.form or args.json:
        args.request = "POST"
    else:
        args.request = "GET"
