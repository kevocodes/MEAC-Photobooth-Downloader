import { Button } from "@/components/ui/button";
import { photographySchema } from "@/schemas/photography.schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { ResponseError } from "@/models/responseError";
import { toast } from "sonner";
import { getPhotographyByCode } from "@/services/photographies.service";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES } from "@/constants/routes";

function Home() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof photographySchema>>({
    resolver: zodResolver(photographySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof photographySchema>) => {
    try {
      const photography = await getPhotographyByCode(values.code);
      navigate(`${PUBLIC_ROUTES.PHOTOGRAPHY}/${photography.id}`);
    } catch (error) {
      if (error instanceof ResponseError) return toast.error(error.message);
      toast.error("Ocurrió un error inesperado al buscar la fotografía");
    }
  };

  return (
    <section className="min-h-[calc(100dvh-80px)] flex flex-col justify-center items-center p-4 gap-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Ingrese su código, ej. ABC" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 size={16} className="mr-2 animate-spin" />
            )}
            Buscar
          </Button>
        </form>
      </Form>
    </section>
  );
}

export default Home;
