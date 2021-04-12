import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LongueurZoneValidator } from '../shared/longueur-minimum/longueur-minimum.component';

import { ProblemeComponent } from './probleme.component';
import { TypeproblemeService } from './typeprobleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers: [TypeproblemeService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#1 | Zone PRÉNOM invalide avec 2 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  });

  it('#2 | Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('#3 | Zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });

  it('#4 | Zone PRÉNOM invalide avec aucune valeur', () => {
    let zone = component.problemeForm.controls['prenom'];
    let errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('#5 | Zone PRÉNOM invalide avec 10 espaces', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(10));

    let validator = LongueurZoneValidator.longueurMinimum(3);
    let result = validator(zone);

    expect(result['nbreCaracteresInsuffisants']).toBeTrue();
  });

  it('#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('  a');

    let validator = LongueurZoneValidator.longueurMinimum(3);
    let result = validator(zone);

    expect(result['nbreCaracteresInsuffisants']).toBeTrue();
  });

  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasMeNotifier');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasMeNotifier');

    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toBeNull();
  });

  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasMeNotifier');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasMeNotifier');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.enabled).toBeTruthy();
  });

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.enabled).toBeTruthy();
  });

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let errors = zone.errors || {};

    expect(errors['required']).toBeTruthy();
  });

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let errors = zone.errors || {};

    expect(errors['required']).toBeTruthy();
  });

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('ryan');
    let errors = zone.errors || {};

    expect(errors['pattern']).toBeTruthy();
  });

  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zoneConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneConfirmation.setValue('courriel123@abc.ca');

    let zoneGroup = component.problemeForm.get('courrielGroup');
    let errors = zoneGroup.errors;

    expect(errors).toBeNull();
  });

  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('courriel123@abc.ca');

    let zoneConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let zoneGroup = component.problemeForm.get('courrielGroup');
    let errors = zoneGroup.errors;

    expect(errors).toBeNull();
  });

  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('courriel123@abc.ca');

    let zoneConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneConfirmation.setValue('123courriel@abc.ca');

    let zoneGroup = component.problemeForm.get('courrielGroup');

    expect(zoneGroup.valid).toBeFalsy();
  });

  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel ', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('courriel123@abc.ca');

    let zoneConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneConfirmation.setValue('courriel123@abc.ca');

    let zoneGroup = component.problemeForm.get('courrielGroup');

    expect(zoneGroup.valid).toBeTruthy();
  });
});
