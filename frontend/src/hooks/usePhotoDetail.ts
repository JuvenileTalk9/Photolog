import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchPhotoById, updatePhoto } from "../services/photos";

export function usePhotoDetail() {
  const { id } = useParams();
  const [titleOverride, setTitle] = useState<string | undefined>(undefined);
  const [commentOverride, setComment] = useState<string | undefined>(undefined);
  const [locationOverride, setLocation] = useState<string | undefined>(
    undefined,
  );
  const [isEditting, setIsEditting] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) navigate("/");
  }, [id, navigate]);

  const { data: photo } = useQuery({
    queryKey: ["photo", id],
    queryFn: () => fetchPhotoById(id!),
    enabled: !!id,
  });

  const saveMutation = useMutation({
    mutationFn: (data: { title: string; comment: string; location: string }) =>
      updatePhoto(id!, data),
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.error("更新に失敗しました：", error);
    },
  });

  const title = titleOverride ?? photo?.title ?? "";
  const comment = commentOverride ?? photo?.comment ?? "";
  const location = locationOverride ?? photo?.location ?? "";
  const imageUrl = photo?.image;
  const postedAt = photo?.posted_at ?? "";

  const handleSave = () => {
    if (!id) return;
    saveMutation.mutate({ title, comment, location });
  };

  return {
    title,
    setTitle,
    comment,
    setComment,
    location,
    setLocation,
    isEditting,
    setIsEditting,
    imageUrl,
    postedAt,
    handleSave,
  };
}
