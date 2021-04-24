import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get('/probleme');
  }

  async getTitleText(): Promise<string> {
    return element(by.id('titreFormulaire')).getText();
  }

  // Permet de vider toutes les zones.  A appeller dans chaque test.
  async viderToutesLesZones() : Promise<void> {
    await element(by.id('prenomId')).clear();  
    await element(by.id('nomId')).clear();     
    // Sélectionner le premier élément dans la zone de liste déroulante (Sélectionner un type de problème (obligatoire))
    await element(by.id('typeProblemeId')).all(by.tagName('option')).get(0).click();      
    // Cliquer sur le bouton radio par défaut (Pas de notification)
    await element.all(by.id('notificationId')).get(0).click();
    //await element(by.id('courrielId')).clear();
    //await element(by.id('courrielConfirmationId')).clear();   
    //await element(by.id('telephoneId')).clear();       
    await element(by.id('noUniteId')).clear();
    await element(by.id('descriptionProblemeId')).clear();     
  }

  // Inscrire tous les renseignements obligatoires pour le scénario de base HAPPY PATH 
  // (saisie minimum obligatoire pour rendre le formulaire valide)
  async setChampsValidesScenarioNominal() : Promise<void> {
    await element(by.id('prenomId')).sendKeys('tonprenom');
    await element(by.id('nomId')).sendKeys('tonnom');    
    // Sélectionner le X élément dans la zone de liste déroulante
    await element(by.id('typeProblemeId')).all(by.tagName('option')).get(2).click();      
    // Cliquer sur le bouton radio voulu
    await element.all(by.id('notificationId')).get(0).click();  
    await element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  async setChampsValidesScenarioAlternatifParMessageTexte(): Promise<void> {
    await  element(by.id('prenomId')).sendKeys('tonprenom');
    await element(by.id('nomId')).sendKeys('tonnom');    
    await element(by.id('typeProblemeId')).all(by.tagName('option')).get(2).click();      
    await element.all(by.id('notificationId')).get(2).click();  
    await element(by.id('telephoneId')).sendKeys('5149990000');
    await element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  async setChampsValidesScenarioAlternatifParCourriel(): Promise<void> {
    await element(by.id('prenomId')).sendKeys('tonprenom');
    await element(by.id('nomId')).sendKeys('tonnom');    
    await element(by.id('typeProblemeId')).all(by.tagName('option')).get(2).click();      
    await element.all(by.id('notificationId')).get(1).click();  
    await element(by.id('courrielId')).sendKeys('abc@courriel.com');
    await element(by.id('courrielConfirmationId')).sendKeys('abc@courriel.com');
    await element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  async setZoneDescriptionProblemeCaracteresSuffisants(): Promise<void> {
    await element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  async setZoneDescriptionProblemeCaracteresInsuffisants(): Promise<void> {
    await element(by.id('descriptionProblemeId')).sendKeys('Prob');
  }

  // Permet d'obtenir toutes les propriétés et leurs valeurs du bouton Sauvegarder
  boutonSubmit() : ElementFinder { 
    return element(by.buttonText('Sauvegarder'));
  }  

  // Permet d'obtenir la classe appliquee actuellement dans la zone Description 
  // (entre autres is-valid ou is-invalid)
  obtenirClasseZoneDescriptionProbleme()   { 
    return element(by.id('descriptionProblemeId')).getAttribute("class");
  } 
}
