"""multipart 編碼測試"""

import os
import tempfile
from mycurl.multipart import encode_multipart


def test_text_field():
    result = encode_multipart(["name=hello"], "BOUNDARY")
    assert b"Content-Disposition: form-data; name=\"name\"" in result
    assert b"hello" in result
    assert b"--BOUNDARY--" in result


def test_file_field(tmp_path):
    test_file = tmp_path / "test.txt"
    test_file.write_text("file contents")

    result = encode_multipart([f"file=@{test_file}"], "BOUNDARY")
    assert b'filename="test.txt"' in result
    assert b"Content-Type: text/plain" in result
    assert b"file contents" in result


def test_multiple_fields(tmp_path):
    test_file = tmp_path / "data.json"
    test_file.write_text("{}")

    result = encode_multipart(["name=test", f"file=@{test_file}"], "BOUNDARY")
    assert b"name=\"name\"" in result
    assert b"name=\"file\"" in result


def test_binary_file(tmp_path):
    data = bytes(range(256))
    test_file = tmp_path / "binary.bin"
    test_file.write_bytes(data)

    result = encode_multipart([f"file=@{test_file}"], "BOUNDARY")
    assert data in result
