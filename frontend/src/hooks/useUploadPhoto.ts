import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPhoto } from "../services/photos";

export function useUploadPhoto() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [comment, setComment] = useState("");

  const fileInpuitRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "新規投稿 | Photolog";
    return () => {
      document.title = "Photolog";
    };
  }, []);

  const createMutation = useMutation({
    mutationFn: () => createPhoto({ image, title, location, comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
      navigate("/");
    },
    onError: (error) => {
      console.error("投稿に失敗しました：", error);
    },
  });

  const handleUploadAreaClick = () => {
    fileInpuitRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    setImage(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = () => {
    if (!image) return;
    createMutation.mutate();
  };

  return {
    image,
    setImage,
    title,
    setTitle,
    location,
    setLocation,
    comment,
    setComment,
    fileInpuitRef,
    previewUrl,
    handleUploadAreaClick,
    handleFileChange,
    handleDrop,
    handleUpload,
  };
}
