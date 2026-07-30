import { buildAuthorizationHeaders, resolveApiUrl } from "./backend_service";

describe("backend_service", () => {
  it("returns a relative path when no backend base URL is configured", () => {
    expect(resolveApiUrl("/api/health")).toBe("/api/health");
  });

  it("adds an authorization header when a token is supplied", async () => {
    const headers = await buildAuthorizationHeaders("firebase-token");

    expect(headers.Authorization).toBe("Bearer firebase-token");
  });
});
