export const mailFormat = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]){0,}@[a-zA-Z0-9-]+\.([a-zA-Z]{1,6}\.)?[a-z]{2,6}$/;

export function validateEmail(email: string) {
  return email !== '' && email.length > 0 && mailFormat.test(email);
}