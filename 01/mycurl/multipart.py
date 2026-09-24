"""multipart/form-data 編碼（用於檔案上傳）"""

import os
import mimetypes


def encode_multipart(fields: list[str], boundary: str) -> bytes:
    parts: list[bytes] = []

    for field_str in fields:
        name, _, value = field_str.partition("=")
        if value.startswith("@"):
            filepath = value[1:]
            parts.append(_encode_file_field(name, filepath, boundary))
        else:
            parts.append(_encode_text_field(name, value, boundary))

    parts.append(f"--{boundary}--\r\n".encode("utf-8"))
    return b"".join(parts)


def _encode_text_field(name: str, value: str, boundary: str) -> bytes:
    return (
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="{name}"\r\n'
        f"\r\n"
        f"{value}\r\n"
    ).encode("utf-8")


def _encode_file_field(name: str, filepath: str, boundary: str) -> bytes:
    filename = os.path.basename(filepath)
    content_type = mimetypes.guess_type(filepath)[0] or "application/octet-stream"

    with open(filepath, "rb") as f:
        file_data = f.read()

    return (
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="{name}"; filename="{filename}"\r\n'
        f"Content-Type: {content_type}\r\n"
        f"\r\n"
    ).encode("utf-8") + file_data + b"\r\n"
