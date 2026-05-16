import type { Composer } from "../../types/Composer";
import type { Nationality } from "../../types/Nationality";
import type { Page } from "../../types/Page";
import type { Period } from "../../types/Period";
import { api } from "../api";

export type ComposerData = {
  name: string;
  birthDate: string;
  deathDate?: string;
  nationalityId: number;
  periods: number[];
  photo?: File | null;
};

export async function getTotalOfComposers(): Promise<number> {
  return await api
    .get("/composers/count")
    .then((response) => response.data.total);
}

export async function getRecentTotalOfComposers(): Promise<number> {
  return await api
    .get("/composers/count/recent")
    .then((response) => response.data.total);
}

export async function getAllComposersPaginated(
  pageNumber: number,
  nationality: Nationality | null,
  period: Period | null,
  name: string | null,
  perPage?: number,
): Promise<Page<Composer[]>> {
  const page = Math.max(1, pageNumber);
  const params = new URLSearchParams({
    page: String(page),
  });

  if (perPage) params.set("perPage", String(perPage));
  if (nationality) params.set("nationality_id", String(nationality.id));
  if (period) params.set("period_id", String(period.id));
  if (name) params.set("name", name);

  return await api
    .get(`/composers/paginated?${params.toString()}`)
    .then((response) => response.data);
}

export async function findComposerById(id: number): Promise<Composer> {
  return await api.get(`/composers/${id}`).then((response) => response.data);
}

export async function deleteById(id: number): Promise<void> {
  return await api.delete(`/composers/${id}`);
}

function buildFormData(data: ComposerData): FormData {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("birth_date", data.birthDate);

  if (data.deathDate) {
    formData.append("death_date", data.deathDate);
  }

  formData.append("nationality_id", String(data.nationalityId));

  data.periods.forEach((id) => {
    formData.append("periods_ids[]", String(id));
  });

  if (data.photo) {
    formData.append("photo", data.photo);
  }

  return formData;
}

export async function addComposer(data: ComposerData): Promise<Composer> {
  const formData = buildFormData(data);

  return await api
    .post("/composers", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
}

export async function updateComposer(
  id: number,
  data: ComposerData,
): Promise<Composer> {
  const formData = buildFormData(data);

  return await api
    .put(`/composers/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
}
