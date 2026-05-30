import { expect, type Locator, type Page } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const adminEmail = "test@example.com";
export const adminPassword = "password";
const currentDir = path.dirname(fileURLToPath(import.meta.url));
export const scoreFixturePath = path.join(
  currentDir,
  "..",
  "fixtures",
  "score.pdf",
);

export function uniqueName(prefix: string) {
  return `${prefix} ${Date.now()} ${Math.floor(Math.random() * 10000)}`;
}

async function waitForRealOptions(select: Locator) {
  await expect(select).toBeVisible();
  await expect
    .poll(
      async () =>
        select.locator("option").evaluateAll(
          (options) =>
            options.filter((item) => item.getAttribute("value")).length,
        ),
      {
        message:
          "Aguardando o select carregar opcoes reais. Verifique se os seeders de dados auxiliares foram executados.",
      },
    )
    .toBeGreaterThan(0);
}

export async function login(page: Page) {
  await page.goto("/admin/login");
  await page.getByLabel("E-mail").fill(adminEmail);
  await page.getByLabel("Senha").fill(adminPassword);
  await page.getByRole("button", { name: /Entrar/ }).click();
  await expect(page).toHaveURL(/\/admin\/composers$/);
}

export async function clearSession(page: Page) {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
}

export async function selectFirstRealOption(select: Locator) {
  await waitForRealOptions(select);

  const value = await select.locator("option").evaluateAll((options) => {
    const option = options.find((item) => item.getAttribute("value"));
    return option?.getAttribute("value") || "";
  });

  expect(value).not.toBe("");
  await select.selectOption(value);
}

export async function selectSecondRealOption(select: Locator) {
  await waitForRealOptions(select);

  const value = await select.locator("option").evaluateAll((options) => {
    const realOptions = options.filter((item) => item.getAttribute("value"));
    return (
      realOptions[1]?.getAttribute("value") ||
      realOptions[0]?.getAttribute("value") ||
      ""
    );
  });

  expect(value).not.toBe("");
  await select.selectOption(value);
}

export function composerRow(page: Page, composerName: string) {
  return page.locator("tr", { hasText: composerName });
}

export async function searchComposer(page: Page, composerName: string) {
  await page.goto("/admin/composers");
  await page.getByPlaceholder("Digite o nome do compositor...").fill(composerName);
}

export async function fillComposerForm(
  page: Page,
  composerName: string,
  options: { alive?: boolean; secondNationality?: boolean } = {},
) {
  await page.locator('input[name="name"]').fill(composerName);
  await page.locator('input[name="birthDate"]').fill("1990-01-01");

  const nationalitySelect = page.locator('select[name="nationality"]');
  if (options.secondNationality) {
    await selectSecondRealOption(nationalitySelect);
  } else {
    await selectFirstRealOption(nationalitySelect);
  }

  const aliveCheckbox = page.locator('input[type="checkbox"]').first();
  await expect(aliveCheckbox).toBeVisible();

  if (options.alive) {
    await aliveCheckbox.check();
  } else {
    await aliveCheckbox.uncheck();
    await page.locator('input[name="deathDate"]').fill("2020-01-01");
  }

  const periodCheckbox = page.locator('input[type="checkbox"]').nth(1);
  await expect(periodCheckbox).toBeVisible();
  await periodCheckbox.check();
}

export async function createComposer(
  page: Page,
  composerName = uniqueName("Compositor E2E"),
) {
  await page.goto("/admin/composers/create");
  await fillComposerForm(page, composerName, { alive: true });
  await page.getByRole("button", { name: /Cadastrar/ }).click();
  await expect(page).toHaveURL(/\/admin\/composers$/);
  await page.getByPlaceholder("Digite o nome do compositor...").fill(composerName);
  await expect(composerRow(page, composerName)).toBeVisible();
  return composerName;
}

export async function deleteComposerIfVisible(page: Page, composerName: string) {
  await searchComposer(page, composerName);
  const row = composerRow(page, composerName);

  if ((await row.count()) === 0) return;

  await row.getByRole("button").last().click();
  await page.getByRole("button", { name: "Confirmar" }).click();
  await expect(page.getByText(`${composerName} removido com sucesso!`)).toBeVisible();
}

export async function chooseComposerInWorkForm(page: Page, composerName: string) {
  const composerSelect = page
    .locator(".css-13cymwt-control, .css-t3ipsp-control")
    .last();
  await composerSelect.scrollIntoViewIfNeeded();
  await composerSelect.locator("input").fill(composerName);

  const option = page
    .locator('[id^="react-select-"][id*="-option-"]', {
      hasText: composerName,
    })
    .last();

  await expect(option).toBeVisible();
  await option.click();
}

export async function fillPdfScore(page: Page) {
  const section = page.locator(".border.rounded.mb-3.overflow-hidden.bg-white").last();
  await expect(section).toBeVisible();

  const selects = section.locator("select");
  await selectFirstRealOption(selects.nth(0));
  await selectFirstRealOption(selects.nth(1));

  await section.getByRole("button", { name: /Adicionar/ }).click();
  await selectFirstRealOption(section.locator("select").last());
  await section
    .locator('input[type="file"][accept="application/pdf"]')
    .last()
    .setInputFiles(scoreFixturePath);
}

export async function createWork(
  page: Page,
  workTitle: string,
  composerName: string,
) {
  await page.goto("/admin/works/create");
  await page.locator('input[name="title"]').fill(workTitle);
  await page.locator('input[name="subtitle"]').fill("Fluxo automatizado");
  await page.locator('input[name="opusNumber"]').fill("10");
  await page.locator('input[name="catalogNumber"]').fill("20");
  await page.locator('input[name="yearComposition"]').fill("2026");
  await page.locator('textarea[name="description"]').fill("Teste E2E do app web.");
  await page.locator(".admin-genre-card").first().click();
  await chooseComposerInWorkForm(page, composerName);
  await page.getByRole("button", { name: /Nova seção/ }).click();
  await fillPdfScore(page);
  await page.getByRole("button", { name: /Cadastrar/ }).click();
  await expect(page).toHaveURL(/\/admin\/works$/);
  await searchWork(page, workTitle);
  await expect(page.locator(".accordion-item", { hasText: workTitle }).first()).toBeVisible();
}

export async function searchWork(page: Page, workTitle: string) {
  await page.goto("/admin/works");
  await page.getByPlaceholder("Digite o nome da obra...").fill(workTitle);
}

export function workItem(page: Page, workTitle: string) {
  return page.locator(".accordion-item", { hasText: workTitle }).first();
}

export async function deleteWorkIfVisible(page: Page, workTitle: string) {
  await searchWork(page, workTitle);
  const item = workItem(page, workTitle);
  const header = item.locator(".accordion-button");

  if ((await header.count()) === 0) return;

  page.once("dialog", (dialog) => dialog.accept());
  await item.locator(".mobile-action-row .btn-outline-danger").first().click();
  await expect(page.locator(".accordion-item", { hasText: workTitle })).toHaveCount(0);
}
