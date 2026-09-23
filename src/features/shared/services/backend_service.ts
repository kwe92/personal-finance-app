import { auth } from "../../../firebase";

const DEFAULT_BACKEND_BASE_URL = "";

export interface BackendError extends Error {
  status?: number;
  code?: string;
}

// Handler registration for the React Plaid Link modal
let reauthPromise: Promise<void> | null = null;
let triggerReauthModal: (() => Promise<void>) | null = null;

export function registerReauthHandler(handler: () => Promise<void>) {
  triggerReauthModal = handler;
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
    const errorBody = await response.json().catch(() => ({}));

    if (errorBody?.error_code === "ITEM_LOGIN_REQUIRED" && triggerReauthModal) {
      if (!reauthPromise) {
        reauthPromise = triggerReauthModal().finally(() => {
          reauthPromise = null;
        });
      }

      await reauthPromise;
      return apiRequest<T>(path, options);
    }

    const error = new Error(
      errorBody?.error_message || errorBody?.error || "Request failed"
    ) as BackendError;
    error.status = response.status;
    error.code = errorBody?.error_code;
    throw error;
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

// --- Plaid APIs ---

export async function createLinkToken(payload: { userId?: string }) {
  return apiRequest<{ linkToken: string; expiration?: string; requestId?: string }>(
    '/api/plaid/create-link-token',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );
}

export async function createUpdateLinkToken() {
  return apiRequest<{ linkToken: string }>('/api/plaid/create-update-link-token', {
    method: 'POST',
  });
}

export async function setAccessToken(payload: { publicToken: string; userId?: string; institutionName: string | null }) {
  return apiRequest<{ message?: string; accessToken?: string }>('/api/plaid/set-access-token', {
    method: 'POST',
    body: JSON.stringify({
      publicToken: payload.publicToken,
      userId: payload.userId,
      institution_name: payload.institutionName ?? "",
    }),
  });
}

export async function disconnectBankAccount() {
  return apiRequest<{ message: string }>('/api/plaid/disconnect', {
    method: 'DELETE',
  });
}

// Transaction API
export async function getTransactions(payload: { userId?: string } = {}) {
  return apiRequest<TransactionsResponse>('/api/plaid/transactions', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
// Bills API
export async function getRecurringBills() {
  return apiRequest<RecurringBillsResponse>('/api/plaid/recurring-bills', {
    method: 'GET'  });
}

// Overview API
export async function getOverviewSummary() {
  return apiRequest<OverviewSummary>('/api/plaid/overview-summary', {
    method: 'GET'
  });
}

// Budget API
export async function getBudgets() {
  return apiRequest<{ budgets: BudgetData[] }>('/api/budgets', {
    method: 'GET',
  });
}

export async function updateBudget(id: string, payload: BudgetPayload) {
  return apiRequest<{ message: string; budget: BudgetData }>(`/api/budgets/${id}`, {
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

// Pot API
export async function getPots() {
  return apiRequest<{ pots: PotData[] }>('/api/pots', {
    method: 'GET',
  });
}

export async function createPot(payload: PotPayload) {
  return apiRequest<{ message: string; pot: PotData }>('/api/pots', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updatePot(id: string, payload: PotPayload) {
  return apiRequest<{ message: string; pot: PotData }>(`/api/pots/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deletePot(id: string) {
  return apiRequest<{ message: string }>(`/api/pots/${id}`, {
    method: 'DELETE',
  });
}

// Preference API
export async function getPreferences() {
  return apiRequest<UserPreferencesData>('/api/preferences', {
    method: 'GET',
  });
}

export async function updatePreferences(payload: UserPreferencesPayload) {
  return apiRequest<UserPreferencesData>('/api/preferences', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

// Health Check API

export async function healthCheck() {
  return apiRequest<{ status: string }>('/api/health');
}

export async function verifyFirebaseUser(payload: { firebaseUid: string }) {
  return apiRequest<{ message: string; user?: Record<string, unknown> }>('/api/verify-firebase-user', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// --- User API ---

export interface UpdateUserResponse {
  message: string;
  updated: boolean;
}

export async function updateUserName(payload: { displayName: string }) {
  return apiRequest<UpdateUserResponse>('/api/user/name', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function updatePassword(payload: { password: string }) {
  return apiRequest<UpdateUserResponse>('/api/user/password', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

// --- Bank Connection Placeholders ---
export async function selectDifferentInstitutionPlaceHolder() {
  return new Promise<{ message: string }>((resolve) => {
    setTimeout(() => {
      resolve({ message: "Ready to select a different institution." });
    }, 1000);
  });
}