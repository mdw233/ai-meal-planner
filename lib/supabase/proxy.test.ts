import { describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

vi.mock("../utils", () => ({ hasEnvVars: true }));
vi.mock("@supabase/ssr", () => ({
  createServerClient: () => ({
    auth: { getClaims: async () => ({ data: { claims: null } }) },
  }),
}));

const { updateSession } = await import("./proxy");

describe("updateSession (unauthenticated)", () => {
  it("does not redirect /api/test", async () => {
    const res = await updateSession(new NextRequest("http://localhost/api/test"));
    expect(res.headers.get("location")).toBeNull();
  });

  it("still redirects protected routes to login", async () => {
    const res = await updateSession(
      new NextRequest("http://localhost/protected"),
    );
    expect(res.headers.get("location")).toBe("http://localhost/auth/login");
  });
});
