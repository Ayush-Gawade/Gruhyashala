import { describe, expect, it } from "vitest";
import { cn, formatDate } from "./utils";

describe("utils", () => {
  it("joins class names and drops falsy values", () => {
    expect(cn("a", false, null, "b", undefined)).toBe("a b");
  });

  it("formats valid dates and handles invalid input", () => {
    expect(formatDate(null)).toBe("—");
    expect(formatDate("not-a-date")).toBe("—");
    expect(formatDate("2026-01-02T00:00:00Z")).toContain("2026");
  });
});
