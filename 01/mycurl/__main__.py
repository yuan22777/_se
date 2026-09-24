"""mycurl 入口點 — 使用方式: python -m mycurl"""

import sys
from .cli import parse_args
from .client import execute


def main(argv: list[str] | None = None) -> None:
    args = parse_args(argv)
    exit_code = execute(args)
    sys.exit(exit_code)


if __name__ == "__main__":
    main()
