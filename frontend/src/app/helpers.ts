const backendLink = "http://localhost:3333";
import { MenuSectionsType } from "@/lib/types/databaseReturnTypes";

export async function getSections(): Promise<[Error | null | unknown, MenuSectionsType[] | null]> {
  try {
    const response = await fetch(`${backendLink}/menu/sections`, {
      method: "GET",
    });

    // Check if the response is OK (status code in the range 200-299)
    if (!response.ok) {
      // Return the error code and message in the first element of the array
      return [new Error(`Error ${response.status}: ${response.statusText}`), null];
    }

    // If response is OK, parse the JSON and return it in the second element
    const data = await response.json();
    return [null, data];

  } catch (error) {
    // In case of network error or other issues, return the error
    return [error, null];
  }
}
