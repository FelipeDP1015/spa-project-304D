import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("App – pruebas", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("siempre muestra el título SPA relax", () => {
    vi.stubGlobal("fetch", () => new Promise(() => {}));

    render(<App />);

    expect(screen.getByRole("heading", { name: /SPA relax/i })).toBeInTheDocument();
  });

  it("muestra un mensaje de error cuando el fetch falla", async () => {
    vi.stubGlobal("fetch", () =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve([]),
      })
    );

    render(<App />);

    expect(await screen.findByText(/Error:/i)).toBeInTheDocument();
    expect(screen.getByText(/Error al obtener planes/i)).toBeInTheDocument();
  });

  it("renderiza la lista de planes (ul)", () => {
    vi.stubGlobal("fetch", () => new Promise(() => {}));

    render(<App />);

    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});