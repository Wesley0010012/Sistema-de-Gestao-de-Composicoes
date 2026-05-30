import { expect, test } from "@playwright/test";
import {
  createComposer,
  createWork,
  deleteComposerIfVisible,
  deleteWorkIfVisible,
  fillPdfScore,
  login,
  scoreFixturePath,
  searchWork,
  selectFirstRealOption,
  uniqueName,
  workItem,
} from "./support/app-web";

test.describe.serial("OBRAS CRUD", () => {
  const composerName = uniqueName("Obras Compositor E2E");
  const workTitle = uniqueName("Obra CRUD E2E");
  const updatedWorkTitle = `${workTitle} Atualizada`;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await login(page);
    await createComposer(page, composerName);
    await page.close();
  });

  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test.afterAll(async ({ browser }) => {
    const page = await browser.newPage();
    await login(page);
    await deleteWorkIfVisible(page, workTitle);
    await deleteWorkIfVisible(page, updatedWorkTitle);
    await deleteComposerIfVisible(page, composerName);
    await page.close();
  });

  test("cria obra com relacoes, secao, partitura e PDF", async ({ page }) => {
    await createWork(page, workTitle, composerName);

    await expect(page.locator(".accordion-item", { hasText: workTitle }).first()).toBeVisible();
    await expect(page.getByText("Baixar PDF")).toHaveCount(0);
    await expect(page.locator("[download]")).toHaveCount(0);
  });

  test("lista, busca, filtra e visualiza detalhes da obra", async ({ page }) => {
    await searchWork(page, workTitle);
    await expect(page.locator(".accordion-item", { hasText: workTitle }).first()).toBeVisible();

    await page.locator("select").first().selectOption({ index: 1 });
    await expect(page.getByText("Obras encontradas")).toBeVisible();

    await searchWork(page, workTitle);
    const workItem = page.locator(".accordion-item", { hasText: workTitle }).first();
    await workItem.locator(".accordion-button").click();
    await expect(workItem.getByText("Seção 1")).toBeVisible();
    await expect(
      workItem.locator('a[href*="/api/works/scores/"]').first(),
    ).toBeVisible();
    await expect(page.getByText("Baixar PDF")).toHaveCount(0);
  });

  test("edita dados da obra e adiciona partitura nova com PDF", async ({ page }) => {
    await searchWork(page, workTitle);
    await workItem(page, workTitle)
      .locator(".mobile-action-row .btn-outline-success")
      .first()
      .click();
    await expect(page).toHaveURL(/\/admin\/works\/update\/\d+$/);

    await page.locator('input[name="title"]').fill(updatedWorkTitle);
    await page.locator('textarea[name="description"]').fill("Descricao alterada no E2E.");

    const section = page.locator(".border.rounded.mb-3.overflow-hidden.bg-white").first();
    await expect(section).toBeVisible();
    await section.getByRole("button", { name: /Adicionar/ }).click();
    await selectFirstRealOption(section.locator("select").last());
    await section
      .locator('input[type="file"][accept="application/pdf"]')
      .last()
      .setInputFiles(scoreFixturePath);

    await page.getByRole("button", { name: /Atualizar/ }).click();
    await expect(page).toHaveURL(/\/admin\/works$/);

    await searchWork(page, updatedWorkTitle);
    const updatedWorkItem = workItem(page, updatedWorkTitle);
    await expect(updatedWorkItem).toBeVisible();
    await updatedWorkItem.locator(".accordion-button").click();
    await expect(updatedWorkItem.getByText(/2 partitura\(s\)/).first()).toBeVisible();
  });

  test("remove partitura e secao durante edicao", async ({ page }) => {
    await searchWork(page, updatedWorkTitle);
    await workItem(page, updatedWorkTitle)
      .locator(".mobile-action-row .btn-outline-success")
      .first()
      .click();
    await expect(page).toHaveURL(/\/admin\/works\/update\/\d+$/);

    await page.locator(".border.rounded.p-3.mb-2 .btn-outline-danger").last().click();
    await expect(page.getByText(/1 partitura\(s\)/).first()).toBeVisible();

    await page.getByRole("button", { name: /Nova seção/ }).click();
    await fillPdfScore(page);
    await page.locator(".bg-light.border-bottom .btn-outline-danger").last().click();
    await expect(
      page.locator(".border.rounded.mb-3.overflow-hidden.bg-white"),
    ).toHaveCount(1);

    await page.getByRole("button", { name: /Atualizar/ }).click();
    await expect(page).toHaveURL(/\/admin\/works$/);
  });

  test("cancela e confirma exclusao da obra", async ({ page }) => {
    await searchWork(page, updatedWorkTitle);

    page.once("dialog", (dialog) => dialog.dismiss());
    await workItem(page, updatedWorkTitle)
      .locator(".mobile-action-row .btn-outline-danger")
      .first()
      .click();
    await expect(
      page.locator(".accordion-item", { hasText: updatedWorkTitle }).first(),
    ).toBeVisible();

    await deleteWorkIfVisible(page, updatedWorkTitle);
    await searchWork(page, updatedWorkTitle);
    await expect(page.getByText("Nenhuma obra encontrada")).toBeVisible();
  });
});
