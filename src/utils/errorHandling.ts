export class AuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export function handleAuthError(error: any): string {
  if (error instanceof AuthError) {
    return error.message;
  }

  if (error?.message?.includes('Failed to fetch')) {
    return 'Unable to connect to the authentication service. Please check your internet connection.';
  }

  if (error?.message?.includes('Invalid login credentials')) {
    return 'Invalid email or password.';
  }

  return 'An unexpected error occurred. Please try again.';
}