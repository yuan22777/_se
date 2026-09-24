"""回應處理與輸出"""

import sys

from .verbose import print_response as _print_response_verbose


def handle_response(
    status: int,
    reason: str,
    resp_headers: dict[str, str],
    body: bytes,
    verbose: bool = False,
    include_headers: bool = False,
    output_file: str | None = None,
) -> bytes:
    if verbose:
        _print_response_verbose(status, reason, resp_headers)

    if include_headers:
        print(f"HTTP/1.1 {status} {reason}")
        for key, value in resp_headers.items():
            print(f"{key}: {value}")
        print("")

    if output_file:
        with open(output_file, "wb") as f:
            f.write(body)
        sys.stderr.write(f"  % Total    % Received  Xferd   Average Speed\n")
        sys.stderr.write(f" 100  {len(body):>5}  100  {len(body):>5}    0     0  {len(body):>5} --:--:-- --:--:-- --:--:-- {len(body):>5}\n")
        sys.stderr.write(f"\n* Saved to {output_file}\n")
    else:
        try:
            text = body.decode("utf-8")
            print(text, end="")
        except UnicodeDecodeError:
            sys.stdout.buffer.write(body)

    return body
