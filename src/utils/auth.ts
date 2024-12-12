// src/utils/auth.ts

export function isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, false otherwise
  }
  
  export function setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  
  export function removeToken(): void {
    localStorage.removeItem('token');
  }
  
  