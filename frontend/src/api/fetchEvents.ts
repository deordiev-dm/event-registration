export async function fetchEvents(page = 1, limit = 12) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/events?page=${page}&limit=${limit}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}
