import { device, element, by, expect } from 'detox';

describe(`Historical Places App - E2E`, () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  it(`TC-01: should display list of places`, async () => {
    await expect(element(by.id(`dashboardList`))).toBeVisible();
    await expect(element(by.id(`place-1`))).toBeVisible();
  });

  it(`TC-02: should navigate to place details`, async () => {
    await device.reloadReactNative();
    await element(by.id(`place-1`)).tap();
    await expect(element(by.id(`placeName`))).toBeVisible();
  });

  it(`TC-03: should mark place as visited`, async () => {
    await device.reloadReactNative();
    await element(by.id(`place-1`)).tap();
    await element(by.id(`visitButton`)).tap();
    await expect(element(by.text(`Visited ✅`))).toBeVisible();
  });

  it(`TC-04: should preserve visited state after back navigation`, async () => {
    await element(by.id(`backButton`)).tap();
    await element(by.id(`place-1`)).tap();
    await expect(element(by.text(`Visited ✅`))).toBeVisible();
  });

  it(`TC-05: should open place details via deep link (cold start)`, async () => {
    await device.launchApp({
      newInstance: true,
      url: `historicalplaces://place/5`,
    });

    await expect(element(by.text(`Stonehenge`))).toBeVisible();
    await element(by.id(`backButton`)).tap();
    await expect(element(by.id(`dashboardList`))).toBeVisible();
  });
});
