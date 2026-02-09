export function hasAuthCookie() {
  return (
    document.cookie.includes('access_token') ||
    document.cookie.includes('refresh_token')
  );
}