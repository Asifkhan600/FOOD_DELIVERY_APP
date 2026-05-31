/**
 * Hydrate authentication state from server JWT cookie on app initialization.
 * This runs client-side to verify the server knows about the user and sync Zustand.
 */

export async function hydrateAuthFromServer(setUser) {
  try {
    // Call /api/auth/me to verify JWT and get user data from server
    const res = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include", // Include cookies
    });

    if (res.ok) {
      const { data } = await res.json();
      if (data) {
        setUser(data);
      }
    }
    // If not ok, user is not authenticated (JWT missing or invalid)
    // Zustand will remain null
  } catch (err) {
    // Network error or /api/auth/me doesn't exist yet - that's okay
    // Zustand will use localStorage persist as fallback
  }
}
