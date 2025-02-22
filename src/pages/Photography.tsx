import LoaderSpinner from "@/components/common/LoaderSpinner";
import ImageWithFrame from "@/components/Photography/ImageWithFrame";
import { Button } from "@/components/ui/button";
import { PUBLIC_ROUTES } from "@/constants/routes";
import { Photography as PhotographyModel } from "@/models/photography.model";
import { ResponseError } from "@/models/responseError";
import { getPhotographyById } from "@/services/photographies.service";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

function Photography() {
  const { photographyId } = useParams();
  const [photography, setPhotography] = useState<PhotographyModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPhotography() {
      try {
        setLoading(true);
        const photography = await getPhotographyById(photographyId!);
        setPhotography(photography);
      } catch (error) {
        if (error instanceof ResponseError) return toast.error(error.message);
        toast.error("Ocurrió un error inesperado al buscar la fotografía");
      } finally {
        setLoading(false);
      }
    }

    getPhotography();
  }, [photographyId]);

  return (
    <section className="min-h-[calc(100dvh-80px)] flex flex-col p-4 gap-4">
      <Link to={PUBLIC_ROUTES.HOME} className="w-fit">
        <Button variant="outline">
          <ArrowLeft size={24} />
          <span className="ml-2">Volver</span>
        </Button>
      </Link>
      <div className="flex-1 flex justify-center items-center">
        {loading && (
          <div className="flex flex-col gap-6 items-center">
            <LoaderSpinner />
            <p className="text-center text-xl text-muted-foreground font-bold">
              Cargando imágen...
            </p>
          </div>
        )}

        {!loading && photography && <ImageWithFrame imageData={photography} />}
      </div>
    </section>
  );
}

export default Photography;
