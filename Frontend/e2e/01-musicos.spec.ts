import { expect, test } from "@playwright/test";
import {
  createComposer,
  createWork,
  deleteComposerIfVisible,
  deleteWorkIfVisible,
  login,
  uniqueName,
} from "./support/app-web";

test.describe.serial("MÚSICOS", () => {
  const composerName = uniqueName("Musicos Compositor E2E");
  const workTitle = uniqueName("Musicos Obra E2E");

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await login(page);
    await createComposer(page, composerName);
    await createWork(page, workTitle, composerName);
    await page.close();
  });

  test.afterAll(async ({ browser }) => {
    const page = await browser.newPage();
    await login(page);
    await deleteWorkIfVisible(page, workTitle);
    await deleteComposerIfVisible(page, composerName);
    await page.close();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renderiza pagina publica de partituras sem download", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Partituras" })).toBeVisible();
    await expect(page.getByText("Partituras disponíveis")).toBeVisible();
    await expect(page.getByText("Baixar PDF")).toHaveCount(0);
    await expect(page.locator("[download]")).toHaveCount(0);
  });

  test("abre e fecha leitor de PDF de uma partitura", async ({ page }) => {
    await expect(page.getByText(workTitle).first()).toBeVisible();
    await page.locator(".musician-score-card", { hasText: workTitle }).first()
      .getByRole("button", { name: /Abrir partitura/ })
      .click();

    await expect(page.locator(".modal.show")).toBeVisible();
    await expect(page.getByRole("button", { name: "Fechar" })).toBeVisible();
    await expect(page.getByText("Baixar PDF")).toHaveCount(0);
    await page.getByRole("button", { name: "Fechar" }).click();
    await expect(page.locator(".modal.show")).toHaveCount(0);
  });

  test("navega por obras completas e retorna para lista", async ({ page }) => {
    await page.getByRole("button", { name: "Obras completas" }).click();
    await expect(page.getByRole("heading", { name: "Obras completas" })).toBeVisible();

    const workCard = page.locator(".musician-work-card", { hasText: workTitle }).first();
    await expect(workCard).toBeVisible();
    await workCard.click();

    await expect(page.getByRole("button", { name: /Voltar para obras completas/ })).toBeVisible();
    await expect(page.locator(".musician-score-card", { hasText: workTitle }).first()).toBeVisible();
    await page.getByRole("button", { name: /Voltar para obras completas/ }).click();
    await expect(workCard).toBeVisible();
  });

  test("navega por compositores ate uma obra", async ({ page }) => {
    await page.getByRole("button", { name: "Compositores" }).click();
    await expect(page.getByText("Toque em um compositor")).toBeVisible();

    const composerCard = page
      .locator(".musician-composer-card", { hasText: composerName })
      .first();
    await expect(composerCard).toBeVisible();
    await composerCard.click();

    await expect(page.getByText("Obras em que este compositor atuou.")).toBeVisible();
    const composerWorkCard = page
      .locator(".musician-work-card", { hasText: workTitle })
      .first();
    await expect(composerWorkCard).toBeVisible();
    await composerWorkCard.click();

    await expect(page.getByText(workTitle).first()).toBeVisible();
    await expect(page.locator(".musician-score-card", { hasText: workTitle }).first()).toBeVisible();
  });

  test("filtra por genero e instrumento pelas abas publicas", async ({ page }) => {
    await page.getByRole("button", { name: "Gêneros" }).click();
    await expect(page.getByRole("heading", { name: "Todos os gêneros" })).toBeVisible();
    await page.locator(".musician-filter-section-card").nth(1).click();
    await expect(page.getByText("Partituras disponíveis")).toBeVisible();
    await expect(page.locator(".musician-score-card", { hasText: workTitle }).first()).toBeVisible();

    await page.getByRole("button", { name: "Instrumentos" }).click();
    await expect(page.getByRole("heading", { name: "Todos os instrumentos" })).toBeVisible();
    await page.locator(".musician-filter-section-card").nth(1).click();
    await expect(page.getByText("Partituras disponíveis")).toBeVisible();
    await expect(page.locator(".musician-score-card", { hasText: workTitle }).first()).toBeVisible();
  });
});
