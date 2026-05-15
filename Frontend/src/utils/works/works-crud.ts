import type { Composer } from "../../types/Composer";
import type { Genre } from "../../types/Genre";
import type { Page } from "../../types/Page";
import type { Work } from "../../types/Work";
import { api } from "../api";

export type WorkScoreData = {
  id?: number;
  instrumentId: number;
  path?: string;
  file?: File | null;
};

export type WorkSectionData = {
  id?: number;
  keyRoot: string;
  keyMode: string;
  scores: WorkScoreData[];
};

export type WorkData = {
  title: string;
  subtitle?: string;
  catalogNumber?: number | null;
  opusNumber?: number | null;
  yearComposition?: number | null;
  description?: string;
  genres: number[];
  composers: number[];
  sections: WorkSectionData[];
};

export async function getAllWorksPaginated(
  pageNumber: number,
  genre: Genre | null,
  composer: Composer | null,
  title: string,
  subtitle: string,
): Promise<Page<Work[]>> {
  return await api
    .get(
      `/works/paginated?page=${pageNumber}${genre ? `&genre_id=${genre.id}` : ""}${composer ? `&composer_id=${composer.id}` : ""}${title.length > 0 ? `&title=${title}` : ""}${subtitle.length > 0 ? `&subtitle=${subtitle}` : ""}`,
    )
    .then((response) => response.data);
}

export async function getTotalOfWorks(): Promise<number> {
  return await api.get("/works/count").then((response) => response.data.total);
}

export async function getRecentTotalOfWorks(): Promise<number> {
  return await api
    .get("/works/count/recent")
    .then((response) => response.data.total);
}

export async function deleteWorkById(id: number): Promise<void> {
  await api.delete(`/works/${id}`);
}

export async function findWorkById(id: number): Promise<Work> {
  return await api.get(`/works/${id}`).then((response) => response.data);
}

function appendNullableNumber(
  formData: FormData,
  key: string,
  value?: number | null,
) {
  if (value !== undefined && value !== null) {
    formData.append(key, String(value));
  }
}

function buildFormData(data: WorkData): FormData {
  const formData = new FormData();

  formData.append("title", data.title);

  if (data.subtitle) {
    formData.append("subtitle", data.subtitle);
  }

  appendNullableNumber(formData, "catalog_number", data.catalogNumber);
  appendNullableNumber(formData, "opus_number", data.opusNumber);
  appendNullableNumber(formData, "year_composition", data.yearComposition);

  if (data.description) {
    formData.append("description", data.description);
  }

  data.genres.forEach((id) => {
    formData.append("genres_ids[]", String(id));
  });

  data.composers.forEach((id) => {
    formData.append("composers_ids[]", String(id));
  });

  data.sections.forEach((section, sectionIndex) => {
    formData.append(`sections[${sectionIndex}][key_root]`, section.keyRoot);
    formData.append(`sections[${sectionIndex}][key_mode]`, section.keyMode);

    section.scores.forEach((score, scoreIndex) => {
      formData.append(
        `sections[${sectionIndex}][scores][${scoreIndex}][instrument_id]`,
        String(score.instrumentId),
      );
      formData.append(
        `sections[${sectionIndex}][scores][${scoreIndex}][path]`,
        score.path || "",
      );
    });
  });

  return formData;
}

async function uploadPendingScorePdfs(work: Work, data: WorkData): Promise<Work> {
  let updatedWork = work;

  for (const [sectionIndex, section] of data.sections.entries()) {
    const persistedSection = updatedWork.sections[sectionIndex];
    if (!persistedSection) continue;

    for (const [scoreIndex, score] of section.scores.entries()) {
      if (!score.file) continue;

      const persistedScore = persistedSection.scores[scoreIndex];
      if (!persistedScore) continue;

      updatedWork = await uploadScorePdf(
        updatedWork.id,
        persistedScore.id,
        score.file,
      );
    }
  }

  return updatedWork;
}

export async function addWork(data: WorkData): Promise<Work> {
  const createdWork = await api
    .post("/works", buildFormData(data), {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);

  return uploadPendingScorePdfs(createdWork, data);
}

export async function updateWork(id: number, data: WorkData): Promise<Work> {
  const updatedWork = await api
    .put(`/works/${id}`, buildFormData(data), {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);

  return uploadPendingScorePdfs(updatedWork, data);
}

export async function uploadScorePdf(
  workId: number,
  scoreId: number,
  file: File,
): Promise<Work> {
  const formData = new FormData();
  formData.append("file", file);

  return await api
    .post(`/works/${workId}/scores/${scoreId}/pdf`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
}
