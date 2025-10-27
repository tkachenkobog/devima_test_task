import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach, vi } from "vitest";

import { useVitalsStore } from "./useVitalsStore";
import * as api from "../api";

vi.mock("../api", () => ({
  getVitals: vi.fn(),
}));

describe("useVitalsStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it("fetches vitals data and stores it", async () => {
    const store = useVitalsStore();
    expect(store.vitals).toEqual([]);

    const mockVitals = { timestamp: "2025-10-26T12:00:00.000Z", heartRate: 22, temperature: 33., oxygenSaturation: 44 };
    (api.getVitals as vi.Mock).mockResolvedValue(mockVitals);

    await store.fetchVitals("1");

    expect(store.vitals).toEqual([mockVitals]);
  });
});
