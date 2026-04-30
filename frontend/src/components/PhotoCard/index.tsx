import { memo } from "react";
import { Link } from "react-router-dom";
import type { PhotoOverView } from "../../types";
import "./index.css";

interface PhotoCardProps {
  photo: PhotoOverView;
}

function PhotoCard({ photo }: PhotoCardProps) {
  return (
    <Link to="">
      <div className="photo-card">
        <div className="photo-thumb">
          <img src={photo.thumbnail} />
        </div>
        <div className="photo-info">
          <p className="photo-title">{photo.title}</p>
          <p className="photo-date">{photo.posted_at}</p>
        </div>
      </div>
    </Link>
  );
}

export default memo(PhotoCard);
