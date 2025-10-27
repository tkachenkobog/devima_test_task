import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach } from "vitest";

import { useFeature1Store } from "./useFeature1Store";

describe("useFeature1Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("useFeature1Store works", () => {
    const store = useFeature1Store();
    store.increment();
    expect(store.count).toBe(1);
  });
});
