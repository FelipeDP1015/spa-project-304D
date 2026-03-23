import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";

/**
 * Test del componente App.jsx
 *
 * Instalación:
 *   npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
 *
 * En vite.config.js agregar:
 *   test: { environment: "jsdom", globals: true, setupFiles: "./test/setup.js" }
 *
 * Crear test/setup.js con:
 *   import "@testing-library/jest-dom";
 */

describe("App", () => {
  it("muestra los planes cuando el fetch es exitoso", async () => {
    vi.stubGlobal("fetch", () =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { id: 1, nombre: "Relajación Total", descripcion: "Masajes y aromaterapia", precio: 49990 },
          ]),
      })
    );

    render(<App />);

    await waitFor(() =>
      expect(screen.queryByText("Cargando planes...")).not.toBeInTheDocument()
    );

    expect(screen.getByText("Relajación Total")).toBeInTheDocument();
    expect(screen.getByText("Masajes y aromaterapia")).toBeInTheDocument();
    expect(screen.getByText("49990")).toBeInTheDocument();

    vi.restoreAllMocks();
  });
});