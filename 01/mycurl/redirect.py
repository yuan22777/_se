"""HTTP 重新導向處理（3xx）"""

from urllib.parse import urlparse, urljoin


def should_redirect(status: int) -> bool:
    return status in (301, 302, 303, 307, 308)


def resolve_redirect(current_url: str, location: str) -> str | None:
    if not location:
        return None
    if location.startswith(("http://", "https://")):
        return location
    return urljoin(current_url, location)
