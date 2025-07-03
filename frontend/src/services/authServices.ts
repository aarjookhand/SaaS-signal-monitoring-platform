export interface LoginResponse {
  access_token: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

    return response.json();
}
