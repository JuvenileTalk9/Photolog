import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPhotos } from "../services/photos";

export function usePhotos() {
  const { data, isError, error } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetchPhotos(),
  });

  useEffect(() => {
    if (isError) {
      console.error("写真一覧の取得に失敗しました：", error);
    }
  }, [isError, error]);

  return {
    photos: data ?? [],
  };
}
