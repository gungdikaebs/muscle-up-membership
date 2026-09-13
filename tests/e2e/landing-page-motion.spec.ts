import { expect, test } from "@playwright/test";

test("the opening stays interactive and hands off to the Stats beat", async ({
  page,
}) => {
  await page.goto("/");

  const heroHeading = page.getByRole("heading", { name: /build a stronger you/i });
  const startTraining = page.getByRole("link", { name: /start training/i }).first();
  const statsSection = page.locator("section").filter({ hasText: "450+" });

  await expect(heroHeading).toBeVisible();
  await expect(startTraining).toBeEnabled();
  await expect(statsSection).toHaveCSS("opacity", "0");

  await statsSection.scrollIntoViewIfNeeded();
  await expect(statsSection).toHaveCSS("opacity", "1");
});

test("About reveals once when the visitor scrolls it into view", async ({
  page,
}) => {
  await page.goto("/");

  const aboutHeading = page.getByRole("heading", {
    name: /a stronger community together/i,
  });

  await expect(aboutHeading).toHaveCSS("opacity", "0");

  await aboutHeading.scrollIntoViewIfNeeded();
  await expect(aboutHeading).toHaveCSS("opacity", "1");

  await page.getByRole("heading", { name: /build a stronger you/i }).scrollIntoViewIfNeeded();
  await expect(aboutHeading).toHaveCSS("opacity", "1");
});

test("Programs reveal in reading order without replacing hover feedback", async ({
  page,
}) => {
  await page.goto("/");

  const strengthCard = page.getByRole("link", { name: /strength/i }).first();
  const strengthImage = strengthCard.locator("img");

  await expect(strengthCard).toHaveCSS("opacity", "0");

  await strengthCard.scrollIntoViewIfNeeded();
  await expect(strengthCard).toHaveCSS("opacity", "1");

  await strengthCard.hover();
  await expect(strengthImage).toHaveCSS("filter", "grayscale(0)");
});

test("Facilities and Coaches reveal while portrait hover stays responsive", async ({
  page,
}) => {
  await page.goto("/");

  const facilityImage = page.getByAltText("Muscle Up training facility");
  const andreCard = page.getByRole("article").filter({ hasText: "Andre" });
  const andreImage = andreCard.locator("img");

  await expect(facilityImage).toHaveCSS("opacity", "0");
  await facilityImage.scrollIntoViewIfNeeded();
  await expect(facilityImage).toHaveCSS("opacity", "1");

  await expect(andreCard).toHaveCSS("opacity", "0");
  await andreCard.scrollIntoViewIfNeeded();
  await expect(andreCard).toHaveCSS("opacity", "1");

  await andreCard.hover();
  await expect(andreImage).toHaveCSS("filter", "grayscale(0)");
});

test("Pricing and Contact reveal without delaying conversion controls", async ({
  page,
}) => {
  await page.goto("/");

  const standardPlan = page.getByRole("article").filter({ hasText: "Standard" });
  const standardCta = standardPlan.getByRole("link", { name: /choose plan/i });
  const contactHeading = page.getByRole("heading", { name: /ready to start/i });
  const footerBrand = page.locator("footer").getByText("Muscle Up.");

  await expect(standardPlan).toHaveCSS("opacity", "0");
  await standardPlan.scrollIntoViewIfNeeded();
  await expect(standardPlan).toHaveCSS("opacity", "1");
  await expect(standardCta).toBeEnabled();

  await expect(contactHeading).toHaveCSS("opacity", "0");
  await contactHeading.scrollIntoViewIfNeeded();
  await expect(contactHeading).toHaveCSS("opacity", "1");
  await expect(page.getByRole("button", { name: /send message/i })).toBeEnabled();

  await expect(footerBrand).toHaveCSS("opacity", "1");
});

test("responsive media prioritizes the Hero and defers below-fold images", async ({
  page,
}) => {
  await page.goto("/");

  const heroImage = page.locator("#home img");
  const belowFoldImages = page.locator("main section:not(#home) img");

  await expect(heroImage).toHaveAttribute("fetchpriority", "high");
  await expect(heroImage).toHaveAttribute("loading", "eager");
  await expect(heroImage).toHaveAttribute("srcset", /\d+w/);

  await expect(belowFoldImages.first()).toHaveAttribute("loading", "lazy");
  await expect(belowFoldImages.first()).toHaveAttribute("decoding", "async");
  await expect(belowFoldImages.first()).toHaveAttribute("srcset", /\d+w/);

  expect(await belowFoldImages.count()).toBeGreaterThan(0);
  for (const image of await belowFoldImages.all()) {
    await expect(image).toHaveAttribute("loading", "lazy");
  }
});

test("fast scrolling resolves every passed section to its final state", async ({
  page,
}) => {
  await page.goto("/");

  const aboutHeading = page.getByRole("heading", {
    name: /a stronger community together/i,
  });
  const strengthCard = page.getByRole("link", { name: /strength/i }).first();

  await expect(aboutHeading).toHaveCSS("opacity", "0");
  await expect(strengthCard).toHaveCSS("opacity", "0");

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  await expect(aboutHeading).toHaveCSS("opacity", "1");
  await expect(strengthCard).toHaveCSS("opacity", "1");
});

test("all content and primary actions remain visible when JavaScript is disabled", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");

  const heroHeading = page.getByRole("heading", { name: /build a stronger you/i });
  const startTraining = page.getByRole("link", { name: /start training/i }).first();
  const statsSection = page.locator("section").filter({ hasText: "450+" });

  await expect(heroHeading).toBeVisible();
  await expect(startTraining).toBeEnabled();
  await expect(statsSection).toBeVisible();
  await expect(statsSection).toHaveCSS("opacity", "1");

  await context.close();
});

test("respects prefers-reduced-motion without hiding content or playing animations", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const heroHeading = page.getByRole("heading", { name: /build a stronger you/i });
  const startTraining = page.getByRole("link", { name: /start training/i }).first();
  const statsSection = page.locator("section").filter({ hasText: "450+" });

  await expect(heroHeading).toBeVisible();
  await expect(startTraining).toBeEnabled();
  await expect(statsSection).toHaveCSS("opacity", "1");
});

test("native anchor navigation scrolls to intended sections", async ({ page }) => {
  await page.goto("/");

  const startTraining = page.getByRole("link", { name: /start training/i }).first();
  await startTraining.click();

  await expect(page).toHaveURL(/#pricing/);
  const pricingSection = page.locator("#pricing");
  await expect(pricingSection).toBeInViewport();
});

test("reveals content properly on mobile viewport with reduced choreography", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");

  const heroHeading = page.getByRole("heading", { name: /build a stronger you/i });
  const startTraining = page.getByRole("link", { name: /start training/i }).first();
  await expect(heroHeading).toBeVisible();
  await expect(startTraining).toBeEnabled();

  const statsSection = page.locator("section").filter({ hasText: "450+" });
  await statsSection.scrollIntoViewIfNeeded();
  await expect(statsSection).toHaveCSS("opacity", "1");

  const standardPlan = page.getByRole("article").filter({ hasText: "Standard" });
  await standardPlan.scrollIntoViewIfNeeded();
  await expect(standardPlan).toHaveCSS("opacity", "1");
});


