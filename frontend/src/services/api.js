// Use NEXT_PUBLIC_API_URL if provided (e.g. NEXT_PUBLIC_API_URL=http://localhost:5001/api)
const API_URL = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "http://localhost:5000/api";

// ─── Custom Error Types ───
class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

class NetworkError extends Error {
  constructor() {
    super("Network error — please check your connection");
    this.name = "NetworkError";
  }
}

class AuthError extends ApiError {
  constructor(message = "Session expired. Please log in again.") {
    super(message, 401);
    this.name = "AuthError";
  }
}

// ─── Global Interceptor: auto-logout on 401 ───
let onAuthFailure = null;

export const setAuthFailureHandler = (handler) => {
  onAuthFailure = handler;
};

// ─── Base fetch wrapper with error boundary ───
const apiFetch = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);

    // Token expired or unauthorized → auto-logout
    if (res.status === 401 && onAuthFailure) {
      onAuthFailure();
      throw new AuthError();
    }

    const data = await res.json();

    if (!res.ok) {
      throw new ApiError(data.message || "Request failed", res.status, data);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError || error instanceof AuthError) {
      throw error;
    }
    throw new NetworkError();
  }
};

// ─── Auth headers helper ───
const authHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

// ─── Auth ───
export const registerUser = async (formData) => {
  try {
    return await apiFetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  } catch (error) {
    return { message: error.message || "Network error" };
  }
};

export const loginUser = async (formData) => {
  try {
    return await apiFetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  } catch (error) {
    return { message: error.message || "Network error" };
  }
};

// ─── Password reset ───
export const forgotPassword = async (data) => {
  try {
    return await apiFetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return { message: error.message || "Network error" };
  }
};

export const resetPassword = async (data) => {
  try {
    return await apiFetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return { message: error.message || "Network error" };
  }
};

// ─── User ───
export const getProfile = async (token) => {
  try {
    return await apiFetch(`${API_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    return null;
  }
};

export const updateProfile = async (token, data) => {
  try {
    return await apiFetch(`${API_URL}/user/profile`, {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    });
  } catch (error) {
    return { message: error.message || "Network error" };
  }
};

// ─── Tasks (with pagination) ───
export const getTasks = async (token, query = "") => {
  try {
    return await apiFetch(`${API_URL}/tasks${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    return { tasks: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } };
  }
};

export const createTask = async (token, data) => {
  return await apiFetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
};

export const updateTask = async (token, id, data) => {
  return await apiFetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
};

export const deleteTask = async (token, id) => {
  return await apiFetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};
