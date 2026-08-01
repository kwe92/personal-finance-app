import { useEffect, useState } from "react";
import { useAuth } from "../../auth/context/auth_context";
import { healthCheck } from "../services/backend_service";

const BackendHealthTestView = (): JSX.Element => {
  const { user } = useAuth();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (user) {
      void runHealthCheck();
    }
  }, [user]);

  async function runHealthCheck() {
    setStatus("loading");
    setMessage("");

    try {
      const response = await healthCheck();
      // console.log("healthCheck response", response);
      setStatus("success");
      setMessage(JSON.stringify(response, null, 2));
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Health check failed",
      );
    }
  }

  return (
    <div
      style={{
        padding: "24px",
        color: "#1f2937",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <h2 style={{ margin: 0 }}>Backend health check test</h2>
      <p style={{ margin: 0 }}>
        This is a temporary debug flow for testing Firebase login and the Go
        health endpoint.
      </p>
      <p style={{ margin: 0 }}>
        Firebase user: {user?.email ?? "Not signed in"}
      </p>

      <button
        type="button"
        onClick={() => {
          void runHealthCheck();
        }}
        disabled={status === "loading"}
        style={{
          maxWidth: "220px",
          padding: "10px 14px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#2563eb",
          color: "white",
          cursor: status === "loading" ? "wait" : "pointer",
        }}
      >
        {status === "loading" ? "Calling health check..." : "Call health check"}
      </button>

      {status === "success" && (
        <pre
          style={{
            backgroundColor: "#f3f4f6",
            padding: "12px",
            borderRadius: "8px",
          }}
        >
          {message}
        </pre>
      )}

      {status === "error" && (
        <p style={{ margin: 0, color: "#b91c1c" }}>{message}</p>
      )}
    </div>
  );
};

export default BackendHealthTestView;
