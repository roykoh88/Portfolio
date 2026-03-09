"""그래프용 좌표 생성 (sympy + numpy). 변수 x를 가진 식을 x 구간에서 샘플링."""
import math
import numpy as np
import sympy
from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication

from app.calc import get_parser_locals

_transform = standard_transformations + (implicit_multiplication,)
_x = sympy.Symbol("x")
_MAX_EXPRESSION_LENGTH = 500


def get_points(
    expression: str,
    x_min: float,
    x_max: float,
    num_points: int = 200,
    use_degrees: bool = False,
) -> list[list[float | None]]:
    """
    f(x) 형태의 수식을 x_min ~ x_max 구간에서 num_points개로 계산해
    [[x1, y1], [x2, y2], ...] 반환.
    y가 정의되지 않거나 무한대인 점은 None으로 둠 (프론트에서 선 끊기용).
    """
    if not expression or not expression.strip():
        raise ValueError("함수 식을 입력하세요.")
    if len(expression) > _MAX_EXPRESSION_LENGTH:
        raise ValueError(f"함수 식은 {_MAX_EXPRESSION_LENGTH}자 이하여야 합니다.")
    if x_min >= x_max:
        raise ValueError("xMin은 xMax보다 작아야 합니다.")
    if num_points < 2 or num_points > 2000:
        raise ValueError("points는 2 이상 2000 이하여야 합니다.")

    expr_str = expression.strip().replace("^", "**")
    locals_with_x = {**get_parser_locals(use_degrees), "x": _x}

    try:
        expr = parse_expr(expr_str, transformations=_transform, local_dict=locals_with_x)
    except Exception as e:
        raise ValueError(f"함수 식을 해석할 수 없습니다: {e!s}") from e

    if not expr.has(_x):
        raise ValueError("그래프를 그리려면 변수 x가 들어간 식이어야 합니다. 예: sin(x), x^2")

    try:
        func = sympy.lambdify(_x, expr, "numpy")
    except Exception as e:
        raise ValueError(f"함수로 변환할 수 없습니다: {e!s}") from e

    x_arr = np.linspace(x_min, x_max, num_points)
    try:
        y_arr = func(x_arr)
    except Exception as e:
        raise ValueError(f"구간에서 계산 중 오류: {e!s}") from e

    # numpy 배열이 스칼라일 수 있음
    if np.isscalar(y_arr):
        y_arr = np.full_like(x_arr, y_arr)

    points: list[list[float | None]] = []
    for xi, yi in zip(x_arr, y_arr, strict=False):
        y_val = float(yi) if np.isscalar(yi) else float(yi)
        if math.isnan(y_val) or math.isinf(y_val):
            points.append([round(float(xi), 10), None])
        else:
            points.append([round(float(xi), 10), round(y_val, 10)])

    return points
