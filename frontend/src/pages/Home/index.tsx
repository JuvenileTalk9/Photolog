import { usePhotos } from "../../hooks/usePhotos";
import PhotoCard from "../../components/PhotoCard";
import "./index.css";

function Home() {
  const { photos } = usePhotos();

  return (
    <main>
      <div className="photo-grid">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </main>
  );
}

export default Home;
