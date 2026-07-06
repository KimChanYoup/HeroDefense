// API 에러 메시지를 안전하게 추출하는 헬퍼
export function getErrorMessage(err: unknown, fallback = '오류가 발생했습니다.'): string {
  if (err && typeof err === 'object') {
    const e = err as Record<string, unknown>;
    const responseData = (e.response as Record<string, unknown>)?.data as Record<string, unknown> | undefined;
    if (typeof responseData?.message === 'string') return responseData.message;
    if (typeof e.message === 'string') return e.message;
  }
  return fallback;
}
