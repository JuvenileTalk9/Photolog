import { memo } from "react";
import { Link } from "react-router-dom";
import type { PhotoOverview } from "../../types";
import "./index.css";

interface PhotoCardProps {
  photo: PhotoOverview;
}

function PhotoCard({ photo }: PhotoCardProps) {
  return (
    <Link to={`/detail/${photo.id}`}>
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
