export interface OptionType {
  label: string;
  value: string | number;
  __isNew__?: boolean;
}

export interface CustomError extends Error {
  statusCode: number;
  message: string;
}
