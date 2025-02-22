import { Photography } from "@/models/photography.model";
import { useRef, useState } from "react";
import marco from "@/assets/Marco.png";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Loader2 } from "lucide-react";

interface ImageWithFrameProps {
  imageData: Photography;
}

const ImageWithFrame: React.FC<ImageWithFrameProps> = ({ imageData }) => {
  const [includeFrame, setIncludeFrame] = useState(true);
  const [loading, setLoading] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    setLoading(true);
    if (!imageData) return;

    // Crear un canvas con el tamaño original de la imagen
    const canvas = document.createElement("canvas");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    try {
      // Cargar la imagen base en el canvas
      const baseImage = await loadImage(imageData.url);
      ctx.drawImage(baseImage, 0, 0, imageData.width, imageData.height);

      if (includeFrame) {
        // Cargar y dibujar el marco encima
        const frameImage = await loadImage(marco); // Ajusta la ruta si es necesario
        ctx.drawImage(frameImage, 0, 0, imageData.width, imageData.height);
      }

      // Convertir a JPG con calidad máxima
      const finalImage = canvas.toDataURL("image/jpeg", 1.0);

      // Crear enlace para la descarga
      const link = document.createElement("a");
      link.href = finalImage;
      link.download = `${imageData.code}_${includeFrame ? "con" : "sin"}_marco.jpg`;
      link.click();
    } catch (error) {
      console.error("Error al generar la imagen:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para cargar imágenes de forma asíncrona
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Para imágenes de servidores externos
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
      <div ref={captureRef} className="relative h-auto">
        <img
          src={imageData.url}
          alt="Base"
          className="w-full h-auto object-cover"
        />
        {includeFrame && (
          <img
            src={marco}
            alt="Marco"
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
          />
        )}
      </div>

      <div className="flex items-center space-x-2 w-full">
        <Checkbox
          id="terms"
          checked={includeFrame}
          onCheckedChange={() => setIncludeFrame(!includeFrame)}
        />
        <label
          htmlFor="terms"
          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          Incluir marco
        </label>
      </div>

      <Button onClick={handleDownload} className="w-full" disabled={loading}>
        {loading && <Loader2 size={16} className="mr-2 animate-spin" />}
        Descargar imágen
      </Button>
    </div>
  );
};

export default ImageWithFrame;
