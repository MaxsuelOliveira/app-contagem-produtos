export function expiresIn() {
  return new Date().getTime() + 1000 * 60 * 60 * 24 * 7;
}

export function getDateExpire(timestamp) {
  return new Date(timestamp).toLocaleString();
}

export function isExpired(timestamp) {
  return new Date().getTime() >= timestamp;
}