import { ResponseError } from "@/models/responseError";

const BASE_URL = `${import.meta.env.VITE_API_URL}/photographies`;

export const getPhotographyByCode = async (code: string) => {
  const response = await fetch(`${BASE_URL}/code/${code}`);

  if (!response.ok) {
    if (response.status === 404)
      throw new ResponseError("No se encontró la imágen", response.status);
    throw new ResponseError("Error al obtener la imágen", response.status);
  }

  const { data } = await response.json();
  return data;
};

export const getPhotographyById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    if (response.status === 404)
      throw new ResponseError("No se encontró la imágen", response.status);
    throw new ResponseError("Error al obtener la imágen", response.status);
  }

  const { data } = await response.json();
  return data;
};
