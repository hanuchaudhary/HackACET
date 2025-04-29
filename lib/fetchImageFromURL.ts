import axios from "axios";

export async function fetchImageFromUrl(url: string): Promise<Buffer> {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer", // Ensures the response is a binary buffer
    });
    return Buffer.from(response.data); // Convert the arraybuffer to a Buffer
  } catch (error: any) {
    console.error(`Error fetching image from URL ${url}:`, error.message);
    throw new Error(`Failed to fetch image from URL: ${url}`);
  }
}