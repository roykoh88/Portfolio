"""수학 표현식 계산 (sympy 사용)."""
import sympy
from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication

# 거듭제곱: ^ → **
# log10, log2, cbrt, ceil(→ceiling) 지원용
_transform = standard_transformations + (implicit_multiplication,)

_MAX_EXPRESSION_LENGTH = 500


def _log10(x):
    return sympy.log(x, 10)


def _log2(x):
    return sympy.log(x, 2)


def _cbrt(x):
    return sympy.Pow(x, sympy.Rational(1, 3))


def _nPr(n, k):
    """순열 P(n,k) = n! / (n-k)!"""
    return sympy.factorial(n) / sympy.factorial(n - k)


def _radians(x):
    """도 → 라디안"""
    return x * sympy.pi / 180


def _degrees(x):
    """라디안 → 도"""
    return x * 180 / sympy.pi


# AI/ML용 함수
def _sigmoid(x):
    """로지스틱 시그모이드: 1/(1+exp(-x))"""
    return 1 / (1 + sympy.exp(-x))


def _relu(x):
    """ReLU: max(0, x)"""
    return sympy.Max(0, x)


def _log_sum_exp(a, b):
    """수치 안정용 log(exp(a)+exp(b))"""
    return sympy.log(sympy.exp(a) + sympy.exp(b))


def _log_softmax(x, y):
    """log(softmax(x)) in 2-class: x - log(exp(x)+exp(y))"""
    return x - _log_sum_exp(x, y)


def _softmax2(x, y):
    """2-class softmax 확률: exp(x)/(exp(x)+exp(y))"""
    return sympy.exp(x) / (sympy.exp(x) + sympy.exp(y))


def _binary_cross_entropy(p, q):
    """Binary cross entropy: -p*log(q) - (1-p)*log(1-q)"""
    return -p * sympy.log(q) - (1 - p) * sympy.log(1 - q)


def _leaky_relu(x, alpha=0.01):
    """Leaky ReLU: x if x>=0 else alpha*x"""
    return sympy.Max(alpha * x, x)


def _gelu(x):
    """GELU 근사: 0.5*x*(1+tanh(sqrt(2/pi)*(x+0.044715*x**3)))"""
    t = sympy.sqrt(2 / sympy.pi) * (x + 0.044715 * x**3)
    return 0.5 * x * (1 + sympy.tanh(t))


# 도(degree) 모드: 입력을 도로 해석, 역함수 결과도 도로 반환
def _sin_deg(x):
    return sympy.sin(x * sympy.pi / 180)


def _cos_deg(x):
    return sympy.cos(x * sympy.pi / 180)


def _tan_deg(x):
    return sympy.tan(x * sympy.pi / 180)


def _asin_deg(x):
    return sympy.asin(x) * 180 / sympy.pi


def _acos_deg(x):
    return sympy.acos(x) * 180 / sympy.pi


def _atan_deg(x):
    return sympy.atan(x) * 180 / sympy.pi


_LOCALS_RAD = {
    "log10": _log10,
    "log2": _log2,
    "cbrt": _cbrt,
    "ceil": sympy.ceiling,
    "mod": sympy.Mod,
    "sign": sympy.sign,
    "min": sympy.Min,
    "max": sympy.Max,
    "nCr": sympy.binomial,
    "nPr": _nPr,
    "atan2": sympy.atan2,
    "radians": _radians,
    "degrees": _degrees,
    # AI/ML
    "sigmoid": _sigmoid,
    "relu": _relu,
    "log_sum_exp": _log_sum_exp,
    "log_softmax": _log_softmax,
    "softmax2": _softmax2,
    "binary_cross_entropy": _binary_cross_entropy,
    "leaky_relu": _leaky_relu,
    "gelu": _gelu,
}

_LOCALS_DEG = {
    **_LOCALS_RAD,
    "sin": _sin_deg,
    "cos": _cos_deg,
    "tan": _tan_deg,
    "asin": _asin_deg,
    "acos": _acos_deg,
    "atan": _atan_deg,
}

# graph.py 등에서 사용 (라디안 기본)
LOCALS_RAD = _LOCALS_RAD
LOCALS_DEG = _LOCALS_DEG


def get_parser_locals(use_degrees: bool) -> dict:
    """parse_expr에 넣을 local_dict. use_degrees면 sin/cos/tan을 도 단위로 해석."""
    return _LOCALS_DEG if use_degrees else _LOCALS_RAD


def evaluate(expression: str, use_degrees: bool = False) -> str:
    """
    수학 표현식을 계산해 결과 문자열로 반환.
    - 사칙연산, 괄호, ^(거듭제곱)
    - 삼각/역삼각/쌍곡: sin, cos, tan, asin, acos, atan, sinh, cosh, tanh
    - 로그/지수: log, log10, log2, exp, sqrt, cbrt
    - 정수/반올림: abs, floor, ceil, round, factorial
    - 기타: mod, sign, min, max, nCr, nPr, atan2, radians, degrees, pi, e
    - AI/ML: sigmoid, relu, log_sum_exp, log_softmax, softmax2, binary_cross_entropy, leaky_relu, gelu
    """
    if not expression or not expression.strip():
        raise ValueError("수식을 입력하세요.")
    if len(expression) > _MAX_EXPRESSION_LENGTH:
        raise ValueError(f"수식은 {_MAX_EXPRESSION_LENGTH}자 이하여야 합니다.")

    expr_str = expression.strip().replace("^", "**")
    locals_ = get_parser_locals(use_degrees)

    try:
        result = parse_expr(expr_str, transformations=_transform, local_dict=locals_)
    except Exception as e:
        raise ValueError(f"수식을 해석할 수 없습니다: {e!s}") from e

    if not result.is_number:
        raise ValueError("계산 결과가 숫자가 아닙니다. (변수 x 등은 그래프 API에서 사용하세요)")

    if result.is_Integer:
        return str(int(result))
    return str(float(result.evalf()))
