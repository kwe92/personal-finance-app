import { auth } from "../../../firebase";

const DEFAULT_BACKEND_BASE_URL = "";

export interface BackendError extends Error {
  status?: number;
}

function getCurrentFirebaseToken(): Promise<string | null> {
  return auth.currentUser?.getIdToken() ?? Promise.resolve(null);
}

export function resolveApiUrl(path: string): string {
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL ?? DEFAULT_BACKEND_BASE_URL;

  if (!baseUrl) {
    return path;
  }

  return `${baseUrl}${path}`;
}

export async function buildAuthorizationHeaders(token?: string | null) {
  const firebaseToken = token ?? (await getCurrentFirebaseToken());

  return {
    ...(firebaseToken ? { Authorization: `Bearer ${firebaseToken}` } : {}),
    "Content-Type": "application/json",
  };
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = await buildAuthorizationHeaders();
  const response = await fetch(resolveApiUrl(path), {
    ...options,
    headers: {
      ...headers,
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    const error = new Error("Request failed") as BackendError;
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

export async function healthCheck() {
  return apiRequest<{ status: string }>('/api/health');
}

export async function verifyFirebaseUser(payload: { firebaseUid: string }) {
  return apiRequest<{ message: string; user?: Record<string, unknown> }>('/api/verify-firebase-user', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function createLinkToken(payload: { userId?: string }) {
  return apiRequest<{ linkToken: string; expiration?: string; requestId?: string }>('/api/plaid/create-link-token', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function setAccessToken(payload: { publicToken: string; userId?: string }) {
  return apiRequest<{ message?: string; accessToken?: string }>('/api/plaid/set-access-token', {
    method: 'POST',
    body: JSON.stringify({
      publicToken: payload.publicToken,
      userId: payload.userId,
    }),
  });
}

export async function getTransactions(payload: { userId?: string } = {}) {
  return apiRequest<TransactionsResponse>('/api/plaid/transactions', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getRecurringBills() {
  return apiRequest<RecurringBillsResponse>('/api/plaid/recurring-bills', {
    method: 'GET'  });
}

export async function getOverviewSummary() {
  return apiRequest<OverviewSummary>('/api/plaid/overview-summary', {
    method: 'GET'
  });
}

export async function getBudgets() {
  return apiRequest<{ budgets: BudgetData[] }>('/api/budgets', {
    method: 'GET',
  });
}

export async function updateBudget(id: string, payload: BudgetPayload) {
  return apiRequest<{ message: string }>(`/api/budgets/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteBudget(id: string) {
  return apiRequest<{ message: string }>(`/api/budgets/${id}`, {
    method: 'DELETE',
  });
}

export async function createBudget(payload: BudgetPayload) {
  return apiRequest<{ message: string; budget: BudgetData }>('/api/budgets', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}