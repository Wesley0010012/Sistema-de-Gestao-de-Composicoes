import { expect, test } from "@playwright/test";
import {
  composerRow,
  deleteComposerIfVisible,
  fillComposerForm,
  login,
  searchComposer,
  uniqueName,
} from "./support/app-web";

test.describe.serial("COMPOSITORES CRUD", () => {
  const composerName = uniqueName("CRUD Compositor E2E");
  const updatedComposerName = `${composerName} Atualizado`;

  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test.afterAll(async ({ browser }) => {
    const page = await browser.newPage();
    await login(page);
    await deleteComposerIfVisible(page, composerName);
    await deleteComposerIfVisible(page, updatedComposerName);
    await page.close();
  });

  test("cria compositor com dados obrigatorios e status vivo", async ({ page }) => {
    await page.goto("/admin/composers/create");
    await fillComposerForm(page, composerName, { alive: true });

    await expect(page.getByText("Status")).toBeVisible();
    await expect(page.getByText("Vivo", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: /Cadastrar/ }).click();
    await expect(page).toHaveURL(/\/admin\/composers$/);

    await searchComposer(page, composerName);
    await expect(composerRow(page, composerName)).toBeVisible();
    await expect(composerRow(page, composerName).getByText("N/A")).toBeVisible();
  });

  test("edita compositor, nacionalidade, periodo e data de falecimento", async ({
    page,
  }) => {
    await searchComposer(page, composerName);
    await composerRow(page, composerName).getByRole("button").first().click();
    await expect(page).toHaveURL(/\/admin\/composers\/update\/\d+$/);

    await fillComposerForm(page, updatedComposerName, {
      alive: false,
      secondNationality: true,
    });
    await page.getByRole("button", { name: /Atualizar/ }).click();
    await expect(page).toHaveURL(/\/admin\/composers$/);

    await searchComposer(page, updatedComposerName);
    await expect(composerRow(page, updatedComposerName)).toBeVisible();
    await expect(composerRow(page, updatedComposerName).getByText("N/A")).toHaveCount(0);
  });

  test("cancela exclusao de compositor", async ({ page }) => {
    await searchComposer(page, updatedComposerName);
    await composerRow(page, updatedComposerName).getByRole("button").last().click();
    await page.getByRole("button", { name: "Cancelar" }).click();

    await expect(composerRow(page, updatedComposerName)).toBeVisible();
  });

  test("exclui compositor", async ({ page }) => {
    await deleteComposerIfVisible(page, updatedComposerName);
    await searchComposer(page, updatedComposerName);

    await expect(page.getByText("Nenhum resultado encontrado")).toBeVisible();
  });
});
