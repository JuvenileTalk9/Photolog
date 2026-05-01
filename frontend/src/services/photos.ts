import type { PhotoOverView } from "../types";

const apiBaseUrl = import.meta.env.VITE_API_URL;

export async function fetchPhotos(): Promise<PhotoOverView[]> {
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

export async function createPhoto(data: {
  image: File | null;
  title: string;
  location: string;
  comment: string;
}): Promise<void> {
  if (!data.image) throw new Error("アップロード画像が選択されていません");
  const formData = new FormData();
  formData.append("image", data.image);
  formData.append("title", data.title);
  formData.append("location", data.location);
  formData.append("comment", data.comment);

  const response = await fetch(`${apiBaseUrl}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error(`投稿に失敗しました：${response.status}`);
}
