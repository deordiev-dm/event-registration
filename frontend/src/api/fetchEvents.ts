import { SortOptionType } from "../pages/EventBoard";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function fetchEvents(
  page = 1,
  limit = 12,
  sortOption: SortOptionType | null,
) {
  try {
    let url = `${BACKEND_URL}/api/events?page=${page}&limit=${limit}`;

    if (sortOption) {
      url += `&sortField=${sortOption.field}&sortOrder=${sortOption.order}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}
