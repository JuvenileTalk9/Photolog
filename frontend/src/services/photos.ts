import type {
  FetchPhotoResponse,
  FetchPhotosResponse,
  PhotoOverView,
} from "../types";

const apiBaseUrl = import.meta.env.VITE_API_URL;

export async function fetchPhotos(): FetchPhotosResponse {
  console.log(`${apiBaseUrl}`);
  const response = await fetch(`${apiBaseUrl}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok)
    throw new Error(`投稿一覧の取得に失敗しました：${response.status}`);

  return response.json();
}
