export const successResponse = <T>(data: T, message = "Success") => ({
  success: true,
  message,
  data,
});

export const errorResponse = (message: string, code = 500, errors?: any) => ({
  success: false,
  message,
  code,
  errors,
});
