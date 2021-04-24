import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('#37 | Doit afficher le titre du formulaire Déclarer un problème', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('Déclarer un problème');
  });

  it('#38 | Doit activer le bouton Sauvegarder avec champs valides scénario nominal', async () => {
    await page.viderToutesLesZones();
    await page.setChampsValidesScenarioNominal();
    expect(await page.boutonSubmit().isEnabled()).toBeTruthy();
  });

  it('#39 | Doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par message TEXTE', async () => {
    await page.viderToutesLesZones();
    await page.setChampsValidesScenarioAlternatifParMessageTexte();
    expect(await page.boutonSubmit().isEnabled()).toBeTruthy();
  });

  it('#40 | Doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par courriel', async () => {
    await page.viderToutesLesZones();
    await page.setChampsValidesScenarioAlternatifParCourriel();
    expect(await page.boutonSubmit().isEnabled()).toBeTruthy();
  });

  it('#41 | Zone DESCRIPTION DU PROBLÈME a une bordure VERTE si nombre de caractères suffisant', async () => {
    await page.viderToutesLesZones();
    await page.setZoneDescriptionProblemeCaracteresSuffisants();
    expect(await page.obtenirClasseZoneDescriptionProbleme()).toContain('is-valid');
  });

  it('#42 | Zone DESCRIPTION DU PROBLÈME a une bordure ROUGE si nombre de caractères insuffisant', async () => {
    await page.viderToutesLesZones();
    await page.setZoneDescriptionProblemeCaracteresInsuffisants();
    expect(await page.obtenirClasseZoneDescriptionProbleme()).toContain('is-invalid');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
