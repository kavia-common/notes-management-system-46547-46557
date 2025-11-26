//
//
//
/**
 * Normalize base URL: remove trailing slash for predictable joining.
 * @param {string} base
 */
function normalizeBase(base) {
  if (!base) return "";
  return base.endsWith("/") ? base.slice(0, -1) : base;
}

// PUBLIC_INTERFACE
/**
 * Lightweight API client for the Notes backend.
 * Uses REACT_APP_API_BASE to configure base URL (default http://localhost:3001).
 * Exposes helper methods for notes CRUD along with generic request().
 *
 * To point to a different backend, set REACT_APP_API_BASE in .env before starting:
 *   REACT_APP_API_BASE=https://api.example.com
 */
const RAW_API_BASE =
  (typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_API_BASE) ||
  "http://localhost:3001";

const API_BASE = normalizeBase(RAW_API_BASE);

/**
 * Build request options with JSON headers and optional body.
 * @param {string} method HTTP method
 * @param {object} body Optional JSON body
 * @returns {RequestInit}
 */
function buildOptions(method = "GET", body) {
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (body !== undefined) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

/**
 * Handle fetch response, throwing on !ok with JSON error if present.
 * @param {Response} res
 */
async function handleResponse(res) {
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      if (isJson) {
        const data = await res.json();
        message =
          data?.detail ||
          data?.message ||
          data?.error ||
          JSON.stringify(data) ||
          message;
      } else {
        message = await res.text();
      }
    } catch (_) {
      // ignore parse errors
    }
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }
  if (res.status === 204) return null;
  return isJson ? res.json() : res.text();
}

/**
 * Join base and path safely (avoid accidental double slashes).
 * @param {string} base
 * @param {string} path
 */
function joinUrl(base, path) {
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Execute a request relative to the API base.
 * @param {string} path
 * @param {RequestInit} options
 */
async function request(path, options = {}) {
  const url = joinUrl(API_BASE, path);
  const res = await fetch(url, options);
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export const notesApi = {
  /** List notes with optional search query and pagination */
  async list({ q, skip = 0, limit = 100 } = {}) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (skip) params.set("skip", String(skip));
    if (limit) params.set("limit", String(limit));
    const suffix = params.toString() ? `?${params.toString()}` : "";
    return request(`/notes${suffix}`, buildOptions("GET"));
  },
  /** Get a single note by ID */
  async get(id) {
    return request(`/notes/${id}`, buildOptions("GET"));
  },
  /** Create a note: { title, content? } */
  async create(payload) {
    return request(`/notes`, buildOptions("POST", payload));
  },
  /** Update a note: { title?, content? } */
  async update(id, payload) {
    return request(`/notes/${id}`, buildOptions("PUT", payload));
  },
  /** Delete a note by ID */
  async remove(id) {
    return request(`/notes/${id}`, buildOptions("DELETE"));
  },
};

// PUBLIC_INTERFACE
export function getApiBase() {
  /** Returns the configured API base URL (normalized without trailing slash). */
  return API_BASE;
}

export default request;
