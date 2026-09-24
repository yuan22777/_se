"""HTTP 客戶端核心 — 發送請求"""

import http.client
import sys

from .request import HttpRequest
from .response import handle_response
from .redirect import should_redirect, resolve_redirect
from .verbose import print_request, print_response
from .ssl_config import create_ssl_context


def execute(args) -> int:
    from .request import HttpRequest as Req

    req = Req.from_args(args)
    ctx = create_ssl_context(args.insecure) if req.scheme == "https" else None

    redirect_count = 0
    while True:
        if args.verbose:
            print_request(req)

        conn = _make_connection(req, ctx, args.connect_timeout)

        try:
            headers = dict(req.headers)
            if req.auth:
                import base64
                cred = f"{req.auth[0]}:{req.auth[1]}"
                headers["Authorization"] = "Basic " + base64.b64encode(cred.encode()).decode()

            conn.request(req.method, req.path, body=req.body, headers=headers)
            resp = conn.getresponse()
            status = resp.status
            resp_headers = {k: v for k, v in resp.getheaders()}
            body = resp.read()

            if args.verbose:
                print_response(status, resp.reason, resp_headers)

            if args.location and should_redirect(status):
                location = resp_headers.get("Location") or resp_headers.get("location")
                new_url = resolve_redirect(req.url, location)
                if new_url and redirect_count < args.max_redirs:
                    redirect_count += 1
                    if args.verbose:
                        sys.stderr.write(
                            f"* Connection to {req.host} port {req.port} "
                            f"connected - redirect #{redirect_count}\n"
                        )
                    conn.close()
                    from .request import HttpRequest as R
                    req = R(
                        method="GET",
                        url=new_url,
                        scheme=urlparse(new_url).scheme,
                        host=urlparse(new_url).hostname or "",
                        port=urlparse(new_url).port or (443 if urlparse(new_url).scheme == "https" else 80),
                        path=urlparse(new_url).path or "/",
                        headers=req.headers,
                        body=None,
                        auth=req.auth,
                    )
                    if urlparse(new_url).query:
                        req.path += "?" + urlparse(new_url).query
                    continue
                else:
                    if redirect_count >= args.max_redirs:
                        sys.stderr.write(
                            f"* Maximum redirects ({args.max_redirs}) reached\n"
                        )

            handle_response(
                status=status,
                reason=resp.reason,
                resp_headers=resp_headers,
                body=body,
                verbose=False,
                include_headers=args.include,
                output_file=args.output,
            )
            return 0

        except http.client.HTTPException as e:
            sys.stderr.write(f"* HTTP error: {e}\n")
            return 1
        except ConnectionError as e:
            sys.stderr.write(f"* Connection failed: {e}\n")
            return 1
        except OSError as e:
            sys.stderr.write(f"* Network error: {e}\n")
            return 1
        finally:
            conn.close()


def _make_connection(req: HttpRequest, ctx, timeout: int):
    if req.scheme == "https":
        conn = http.client.HTTPSConnection(
            req.host, req.port, context=ctx, timeout=timeout
        )
    else:
        conn = http.client.HTTPConnection(req.host, req.port, timeout=timeout)
    return conn


from urllib.parse import urlparse
