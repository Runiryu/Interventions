import { AbstractControl, ValidatorFn } from "@angular/forms";

export class LongueurZoneValidator {
  static longueurMinimum(longueur: number): ValidatorFn {
    return (valeurControle: AbstractControl): { [key: string]: boolean } | null => {
      if (valeurControle.value && valeurControle.value.trim().length >= longueur) {
        return null;
      }

      return { nbreCaracteresInsuffisants: true };
    }
  }
}