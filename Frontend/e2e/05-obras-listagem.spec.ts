import { expect, test } from "@playwright/test";
import {
  chooseComposerInWorkForm,
  createComposer,
  createWork,
  deleteComposerIfVisible,
  deleteWorkIfVisible,
  login,
  searchWork,
  uniqueName,
} from "./support/app-web";

test.describe.serial("OBRAS LISTAGEM", () => {
  const composerName = uniqueName("Pagina Obras Compositor E2E");
  const workTitle = uniqueName("Pagina Obras E2E");

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
    await login(page);
    await page.goto("/admin/works");
  });

  test("renderiza cards, filtros, accordion e acoes", async ({ page }) => {
    await expect(page.getByText("Gestão de obras")).toBeVisible();
    await expect(page.getByText("Total de obras adicionadas")).toBeVisible();
    await expect(page.getByText("Adicionadas recentemente")).toBeVisible();
    await expect(page.getByPlaceholder("Digite o nome da obra...")).toBeVisible();
    await expect(page.locator("select").first()).toBeVisible();
    await expect(page.getByText("Obras encontradas")).toBeVisible();
    await expect(page.getByRole("button", { name: /Nova obra/ })).toBeVisible();
  });

  test("busca obra por titulo", async ({ page }) => {
    await searchWork(page, workTitle);
    await expect(
      page.locator(".accordion-item", { hasText: workTitle }).first(),
    ).toBeVisible();
  });

  test("exibe estado vazio para busca sem resultados", async ({ page }) => {
    await page
      .getByPlaceholder("Digite o nome da obra...")
      .fill(`Obra inexistente ${Date.now()}`);

    await expect(page.getByText("Nenhuma obra encontrada")).toBeVisible();
  });

  test("filtra por genero e compositor", async ({ page }) => {
    await page.locator("select").first().selectOption({ index: 1 });
    await expect(page.getByText("Obras encontradas")).toBeVisible();

    await chooseComposerInWorkForm(page, composerName);
    await expect(page.getByText("Obras encontradas")).toBeVisible();
    await expect(page.locator(".accordion-item", { hasText: workTitle }).first()).toBeVisible();
  });

  test("abre accordion e visualiza detalhes da obra", async ({ page }) => {
    await searchWork(page, workTitle);
    const workItem = page.locator(".accordion-item", { hasText: workTitle }).first();
    await workItem.locator(".accordion-button").click();

    await expect(workItem.getByText("Seção 1")).toBeVisible();
    await expect(workItem.locator('a[href*="/api/works/scores/"]').first()).toBeVisible();
    await expect(workItem.getByText("Baixar PDF")).toHaveCount(0);
  });

  test("abre tela de cadastro pelo botao nova obra", async ({ page }) => {
    await page.getByRole("button", { name: /Nova obra/ }).click();
    await expect(page).toHaveURL(/\/admin\/works\/create$/);
    await expect(page.getByText("Cadastrar obra")).toBeVisible();
  });
});
