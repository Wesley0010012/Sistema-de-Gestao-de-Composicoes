import { expect, test } from "@playwright/test";
import {
  composerRow,
  createComposer,
  deleteComposerIfVisible,
  login,
  searchComposer,
  uniqueName,
} from "./support/app-web";

test.describe.serial("COMPOSITORES LISTAGEM", () => {
  const composerName = uniqueName("Pagina Compositor E2E");

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await login(page);
    await createComposer(page, composerName);
    await page.close();
  });

  test.afterAll(async ({ browser }) => {
    const page = await browser.newPage();
    await login(page);
    await deleteComposerIfVisible(page, composerName);
    await page.close();
  });

  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto("/admin/composers");
  });

  test("renderiza cards, filtros, tabela e acoes", async ({ page }) => {
    await expect(page.getByText("Gestão de compositores")).toBeVisible();
    await expect(page.getByText("Total de compositores adicionados")).toBeVisible();
    await expect(page.getByText("Adicionados Recentemente")).toBeVisible();
    await expect(page.getByPlaceholder("Digite o nome do compositor...")).toBeVisible();
    await expect(page.locator("select").nth(0)).toBeVisible();
    await expect(page.locator("select").nth(1)).toBeVisible();
    await expect(page.getByText("Compositores encontrados")).toBeVisible();
    await expect(page.getByRole("button", { name: /Novo compositor/ })).toBeVisible();
  });

  test("busca compositor por nome", async ({ page }) => {
    await searchComposer(page, composerName);
    await expect(composerRow(page, composerName)).toBeVisible();
  });

  test("exibe estado vazio para busca sem resultados", async ({ page }) => {
    await page
      .getByPlaceholder("Digite o nome do compositor...")
      .fill(`Nao Existe ${Date.now()}`);

    await expect(page.getByText("Nenhum resultado encontrado")).toBeVisible();
  });

  test("filtra por nacionalidade e periodo", async ({ page }) => {
    const nationality = page.locator("select").nth(0);
    const period = page.locator("select").nth(1);

    await nationality.selectOption({ index: 1 });
    await expect(page.getByText("Compositores encontrados")).toBeVisible();

    await period.selectOption({ index: 1 });
    await expect(page.getByText("Compositores encontrados")).toBeVisible();
  });

  test("abre tela de cadastro pelo botao novo compositor", async ({ page }) => {
    await page.getByRole("button", { name: /Novo compositor/ }).click();
    await expect(page).toHaveURL(/\/admin\/composers\/create$/);
    await expect(page.getByText("Cadastrar compositor")).toBeVisible();
  });
});
