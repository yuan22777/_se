"""SSL/TLS 連線設定"""

import ssl


def create_ssl_context(insecure: bool = False) -> ssl.SSLContext | None:
    if insecure:
        ctx = ssl._create_unverified_context()
    else:
        ctx = ssl.create_default_context()
    return ctx
