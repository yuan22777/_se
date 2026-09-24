"""HTTP 請求物件構建"""

import json as json_mod
from dataclasses import dataclass, field
from urllib.parse import urlparse, urlencode


@dataclass
class HttpRequest:
    method: str
    url: str
    scheme: str
    host: str
    port: int
    path: str
    headers: dict[str, str] = field(default_factory=dict)
    body: bytes | None = None
    auth: tuple[str, str] | None = None

    @classmethod
    def from_args(cls, args) -> "HttpRequest":
        parsed = urlparse(args.url)
        scheme = parsed.scheme.lower() or "http"
        host = parsed.hostname or ""
        if parsed.port:
            port = parsed.port
        else:
            port = 443 if scheme == "https" else 80
        path = parsed.path or "/"
        if parsed.query:
            path += "?" + parsed.query
        if parsed.fragment:
            path += "#" + parsed.fragment

        headers: dict[str, str] = {}
        for h in args.header:
            key, _, value = h.partition(":")
            headers[key.strip()] = value.strip()

        body = _build_body(args, headers)

        auth = None
        if args.user:
            auth = tuple(args.user.split(":", 1))

        return cls(
            method=args.request,
            url=args.url,
            scheme=scheme,
            host=host,
            port=port,
            path=path,
            headers=headers,
            body=body,
            auth=auth,
        )


def _build_body(args, headers: dict[str, str]) -> bytes | None:
    from .multipart import encode_multipart

    if args.json is not None:
        headers.setdefault("Content-Type", "application/json")
        return args.json.encode("utf-8")

    if args.form:
        boundary = "----mycurlBoundary"
        headers["Content-Type"] = f"multipart/form-data; boundary={boundary}"
        return encode_multipart(args.form, boundary)

    if args.data:
        raw = "".join(args.data)
        headers.setdefault("Content-Type", "application/x-www-form-urlencoded")
        return raw.encode("utf-8")

    return None
