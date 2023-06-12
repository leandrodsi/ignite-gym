import { AppError } from "./AppError";

export const formatErrorMessage = (error: unknown, defaultMessage: string) => {
  const isAppError = error instanceof AppError;

  return isAppError ? error.message : defaultMessage;
};
