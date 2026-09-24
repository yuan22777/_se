"""-v 詳細資訊輸出"""

import sys
from .request import HttpRequest


def print_request(req: HttpRequest) -> None:
    _out(f"* Connecting to {req.host} port {req.port}")
    _out(f"> {req.method} {req.path} HTTP/1.1")
    _out(f"> Host: {req.host}")
    for key, value in req.headers.items():
        _out(f"> {key}: {value}")
    if req.auth:
        _out("> Authorization: ****")
    _out("")


def print_response(status: int, reason: str, headers: dict[str, str]) -> None:
    _out(f"< HTTP/1.1 {status} {reason}")
    for key, value in headers.items():
        _out(f"< {key}: {value}")
    _out("")


def _out(msg: str) -> None:
    print(msg, file=sys.stderr)
