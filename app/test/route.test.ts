import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /test", () => {
  it("returns 200 with JSON containing exactly firstName and lastName", async () => {
    const res = GET();

    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/json");
    expect(await res.json()).toEqual({ firstName: "John", lastName: "Doe" });
  });
});
