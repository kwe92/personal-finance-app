import { useEffect, useState } from "react";
import { useAuth } from "../../auth/context/auth_context";
import {
  healthCheck,
  getTransactions,
  getRecurringBills,
  getOverviewSummary,
} from "../services/backend_service";

type TestStatus = "idle" | "loading" | "success" | "error";

interface EndpointConfig {
  id: string;
  name: string;
  fn: () => Promise<unknown>;
}

interface TestResult {
  status: TestStatus;
  message: string;
}

const ENDPOINTS: EndpointConfig[] = [
  { id: "healthCheck", name: "Health Check", fn: healthCheck },
  { id: "transactions", name: "Get Transactions", fn: getTransactions },
  { id: "recurringBills", name: "Get Recurring Bills", fn: getRecurringBills },
  {
    id: "overviewSummary",
    name: "Get Overview Summary",
    fn: getOverviewSummary,
  },
];

const BackendHealthTestView = (): JSX.Element => {
  const { user } = useAuth();

  const [results, setResults] = useState<Record<string, TestResult>>(() =>
    ENDPOINTS.reduce(
      (acc, endpoint) => {
        acc[endpoint.id] = { status: "idle", message: "" };
        return acc;
      },
      {} as Record<string, TestResult>,
    ),
  );

  const [isTestingAll, setIsTestingAll] = useState(false);

  const runSingleTest = async (id: string, fn: () => Promise<unknown>) => {
    setResults((prev) => ({
      ...prev,
      [id]: { status: "loading", message: "" },
    }));

    try {
      const response = await fn();
      setResults((prev) => ({
        ...prev,
        [id]: {
          status: "success",
          message: JSON.stringify(response, null, 2),
        },
      }));
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        [id]: {
          status: "error",
          message: error instanceof Error ? error.message : "Request failed",
        },
      }));
    }
  };

  const runAllTests = async () => {
    setIsTestingAll(true);
    await Promise.allSettled(
      ENDPOINTS.map((endpoint) => runSingleTest(endpoint.id, endpoint.fn)),
    );
    setIsTestingAll(false);
  };

  useEffect(() => {
    if (user) {
      void runAllTests();
    }
  }, [user]);

  return (
    <div
      style={{
        padding: "24px",
        color: "#1f2937",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div>
        <h2 style={{ margin: 0 }}>Backend Health & Endpoints Test</h2>
        <p style={{ margin: "4px 0 0 0", color: "#4b5563" }}>
          Debug view for testing Firebase login and all backend API endpoints.
        </p>
        <p style={{ margin: "4px 0 0 0", fontSize: "14px" }}>
          Firebase user: <strong>{user?.email ?? "Not signed in"}</strong>
        </p>
      </div>

      <button
        type="button"
        onClick={() => void runAllTests()}
        disabled={isTestingAll || !user}
        style={{
          width: "fit-content",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: isTestingAll ? "#9ca3af" : "#2563eb",
          color: "white",
          fontWeight: "600",
          cursor: isTestingAll || !user ? "not-allowed" : "pointer",
        }}
      >
        {isTestingAll ? "Testing All Endpoints..." : "Run All Endpoint Tests"}
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {ENDPOINTS.map((endpoint) => {
          const res = results[endpoint.id];
          return (
            <div
              key={endpoint.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "16px",
                backgroundColor: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: res.message ? "12px" : "0",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <strong style={{ fontSize: "16px" }}>{endpoint.name}</strong>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: 600,
                      backgroundColor:
                        res.status === "success"
                          ? "#d1fae5"
                          : res.status === "error"
                            ? "#fee2e2"
                            : res.status === "loading"
                              ? "#fef3c7"
                              : "#f3f4f6",
                      color:
                        res.status === "success"
                          ? "#065f46"
                          : res.status === "error"
                            ? "#991b1b"
                            : res.status === "loading"
                              ? "#92400e"
                              : "#374151",
                    }}
                  >
                    {res.status.toUpperCase()}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => void runSingleTest(endpoint.id, endpoint.fn)}
                  disabled={res.status === "loading"}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    backgroundColor: "#f9fafb",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  Re-test
                </button>
              </div>

              {res.status === "error" && (
                <p style={{ margin: 0, color: "#b91c1c", fontSize: "14px" }}>
                  Error: {res.message}
                </p>
              )}

              {res.status === "success" && (
                <pre
                  style={{
                    backgroundColor: "#f3f4f6",
                    padding: "12px",
                    borderRadius: "6px",
                    margin: 0,
                    maxHeight: "150px",
                    overflow: "auto",
                    fontSize: "12px",
                  }}
                >
                  {res.message}
                </pre>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BackendHealthTestView;
