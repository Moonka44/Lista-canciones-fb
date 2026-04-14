import react, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Spinner } from "reactstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Config/FirebaseConfig";

const getYoutubeEmbedUrl = (url) => {
  if (!url) return null;
  const trimmedUrl = url.trim();

  try {
    const parsedUrl = new URL(trimmedUrl);
    const host = parsedUrl.hostname;

    if (host.includes("youtu.be")) {
      const videoId = parsedUrl.pathname.replace("/", "");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    if (host.includes("youtube.com")) {
      if (parsedUrl.searchParams.get("v")) {
        return `https://www.youtube.com/embed/${parsedUrl.searchParams.get("v")}`;
      }

      if (parsedUrl.pathname.startsWith("/embed/")) {
        return `https://www.youtube.com${parsedUrl.pathname}`;
      }

      if (parsedUrl.pathname.startsWith("/shorts/")) {
        const [, , videoId] = parsedUrl.pathname.split("/");
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }
    }
  } catch (error) {
    return trimmedUrl;
  }

  return trimmedUrl;
};

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) {
        setError("No se encontró el identificador de la canción.");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "canciones", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError("La canción solicitada no existe.");
          setLoading(false);
          return;
        }

        setItem({ id: docSnap.id, ...docSnap.data() });
      } catch (err) {
        setError("No se pudo cargar la canción. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="p-4 text-center">
        <Spinner color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p>{error}</p>
        <Button color="primary" onClick={handleBack}>
          Volver
        </Button>
      </div>
    );
  }

  const embedUrl = getYoutubeEmbedUrl(item?.link);
 

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>{item?.campo01 || "Reproductor"}</h3>
        <Button color="secondary" onClick={handleBack}>
          Volver
        </Button>
      </div>
      <p className="text-muted">{item?.campo02}</p>
      {embedUrl ? (
        <div className="ratio ratio-16x9">
          <iframe
            title={item?.campo01 || "Reproductor"}
            src={embedUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <p>No se encontró un enlace válido para reproducir.</p>
      )}
    </div>
  );
};

export default Player;