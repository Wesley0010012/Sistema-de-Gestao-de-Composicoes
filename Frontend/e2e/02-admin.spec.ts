import { expect, test } from "@playwright/test";
import { adminEmail, adminPassword, clearSession, login } from "./support/app-web";

test.describe("ADMIN", () => {
  test.beforeEach(async ({ page }) => {
    await clearSession(page);
  });

  test("redireciona rotas administrativas para login quando nao autenticado", async ({
    page,
  }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/admin\/login$/);

    await page.goto("/admin/composers");
    await expect(page).toHaveURL(/\/admin\/login$/);

    await page.goto("/admin/works");
    await expect(page).toHaveURL(/\/admin\/login$/);
  });

  test("exibe erro com credenciais invalidas", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel("E-mail").fill("erro@example.com");
    await page.getByLabel("Senha").fill("senha-errada");
    await page.getByRole("button", { name: /Entrar/ }).click();

    await expect(page.getByText("E-mail ou senha inválidos.")).toBeVisible();
    await expect(page).toHaveURL(/\/admin\/login$/);
  });

  test("autentica com usuario seedado e acessa dashboard de compositores", async ({
    page,
  }) => {
    await page.goto("/admin/login");
    await page.getByLabel("E-mail").fill(adminEmail);
    await page.getByLabel("Senha").fill(adminPassword);
    await page.getByRole("button", { name: /Entrar/ }).click();

    await expect(page).toHaveURL(/\/admin\/composers$/);
    await expect(page.getByText("Gestão de compositores")).toBeVisible();
  });

  test("redireciona /admin para compositores quando autenticado", async ({ page }) => {
    await login(page);
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/admin\/composers$/);
  });
});
