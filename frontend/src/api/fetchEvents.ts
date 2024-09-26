export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function fetchEvents(page = 1, limit = 12) {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/events?page=${page}&limit=${limit}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}
