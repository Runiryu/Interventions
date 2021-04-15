import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
import { LongueurZoneValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: string;

  constructor(private fb: FormBuilder, private typesprobleme: TypeproblemeService) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
      prenom: ['', [LongueurZoneValidator.longueurMinimum(3), Validators.required]],
      nom: ['', [Validators.maxLength(50), Validators.required]],
      typeProbleme: ['', Validators.required],
      notification: ['NePasMeNotifier'],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}]
      }),
      telephone: [{value: '', disabled: true}],
    });

    this.typesprobleme.obtenirTypesProbleme()
    .subscribe(type => this.typesProbleme = type,
                error => this.errorMessage = <any>error);

    this.problemeForm.get('notification').valueChanges
    .subscribe(value => this.appliquerNotifications(value));
  }

  appliquerNotifications(typeNotification: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const courrielGroupControl = this.problemeForm.get('courrielGroup');
    const telephoneControl = this.problemeForm.get('telephone');

    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();
    
    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

    if (typeNotification === 'ParCourriel') {
      
      courrielControl.setValidators(Validators.compose([
        Validators.required, 
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')
      ]));
      courrielControl.enable();
      courrielConfirmationControl.setValidators(Validators.required);
      courrielConfirmationControl.enable();
      courrielGroupControl.setValidators(emailMatcherValidator.courrielDifferents());

    } else if (typeNotification === 'ParMessageTexte') {

      telephoneControl.setValidators(Validators.compose([
        Validators.required, 
        Validators.pattern('[0-9]+'), 
        Validators.minLength(10), 
        Validators.maxLength(10)
      ]));
      telephoneControl.enable();
    }

    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    courrielGroupControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
  }
}
