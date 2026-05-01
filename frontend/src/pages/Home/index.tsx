import { usePhotos } from "../../hooks/usePhotos";
import PhotoCard from "../../components/PhotoCard";
import "./index.css";

function Home() {
  const { photos } = usePhotos();

  return (
    <div className="main-page">
      <div className="photo-grid">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
}

export default Home;
