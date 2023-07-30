export function response(data: { success: boolean; msg: string }) {
  return {
    success: data.success,
    msg: data.msg,
  };
}
