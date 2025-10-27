import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach, vi } from "vitest";

import { usePatientStore } from "./usePatientStore";
import * as api from "../api";

vi.mock("../api", () => ({
  getPatient: vi.fn(),
}));

describe("usePatientStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it("fetches patient data and stores it", async () => {
    const store = usePatientStore();
    expect(store.patient).toBe(null);

    const mockPatient = { id: "1", name: "Joe Baiden", age: 30, gender: "male" };
    (api.getPatient as vi.Mock).mockResolvedValue(mockPatient);

    await store.fetchPatient("1");

    expect(store.patient).toEqual(mockPatient);
  });
});
