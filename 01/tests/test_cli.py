"""CLI 參數解析測試"""

import pytest
from mycurl.cli import parse_args


def test_default_get():
    args = parse_args(["https://example.com"])
    assert args.method == "GET" if hasattr(args, "method") else args.request == "GET"
    assert args.url == "https://example.com"


def test_explicit_method():
    args = parse_args(["-X", "DELETE", "https://example.com"])
    assert args.request == "DELETE"


def test_data_infers_post():
    args = parse_args(["-d", "key=value", "https://example.com"])
    assert args.request == "POST"
    assert args.data == ["key=value"]


def test_json_infers_post():
    args = parse_args(["--json", '{"a":1}', "https://example.com"])
    assert args.request == "POST"
    assert args.json == '{"a":1}'


def test_form_infers_post():
    args = parse_args(["-F", "file=@test.txt", "https://example.com"])
    assert args.request == "POST"


def test_multiple_headers():
    args = parse_args(["-H", "A: 1", "-H", "B: 2", "https://example.com"])
    assert args.header == ["A: 1", "B: 2"]


def test_verbose_flag():
    args = parse_args(["-v", "https://example.com"])
    assert args.verbose is True


def test_location_flag():
    args = parse_args(["-L", "https://example.com"])
    assert args.location is True


def test_insecure_flag():
    args = parse_args(["-k", "https://example.com"])
    assert args.insecure is True


def test_output_file():
    args = parse_args(["-o", "file.html", "https://example.com"])
    assert args.output == "file.html"


def test_user_agent():
    args = parse_args(["-A", "TestAgent/1.0", "https://example.com"])
    assert args.user_agent == "TestAgent/1.0"


def test_user_auth():
    args = parse_args(["-u", "admin:secret", "https://example.com"])
    assert args.user == "admin:secret"


def test_include_headers():
    args = parse_args(["-i", "https://example.com"])
    assert args.include is True
