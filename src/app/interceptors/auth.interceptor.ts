import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Auth Interceptor
 * Automatically adds JWT token to all outgoing HTTP requests.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip if running on server
  if (typeof localStorage === 'undefined') {
    return next(req);
  }

  const token = localStorage.getItem('tapsyrys_token');
  
  console.log('[v0] Auth interceptor - URL:', req.url);
  console.log('[v0] Auth interceptor - Token exists:', !!token);
  
  if (token) {
    console.log('[v0] Auth interceptor - Adding Bearer token');
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }
  
  return next(req);
};
