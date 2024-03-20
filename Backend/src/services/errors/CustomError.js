export default class CustomError {
  static createError({ name, cause, message, code = 1 }) {
    const error = new Error(message);
    (error.name = name),
      (error.code = code),
      (error.cause = cause ? cause : null);
    throw error;
  }
}