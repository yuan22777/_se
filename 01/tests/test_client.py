"""HTTP 客戶端整合測試（需要網路）"""

import pytest
from unittest.mock import patch, MagicMock
from mycurl.cli import parse_args
from mycurl.client import execute
from mycurl.redirect import should_redirect, resolve_redirect


class TestRedirect:
    def test_should_redirect_301(self):
        assert should_redirect(301) is True

    def test_should_redirect_302(self):
        assert should_redirect(302) is True

    def test_should_redirect_200(self):
        assert should_redirect(200) is False

    def test_resolve_absolute(self):
        result = resolve_redirect("http://a.com/old", "http://b.com/new")
        assert result == "http://b.com/new"

    def test_resolve_relative(self):
        result = resolve_redirect("http://a.com/dir/page", "/other")
        assert result == "http://a.com/other"


class TestRequestBuilding:
    def test_parse_url_basic(self):
        args = parse_args(["https://example.com/path?q=1"])
        assert args.request == "GET"

    def test_method_uppercased(self):
        args = parse_args(["-X", "delete", "https://example.com"])
        assert args.request == "DELETE"
