import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers"; // ✅ Ensure correct import

// ✅ Ensure `expect` is globally available
globalThis.expect = expect;
expect.extend(matchers); // ✅ Apply matchers correctly