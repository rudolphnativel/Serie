export interface IUtilisateur {
  id?: number;
  nom?: string | null;
  duree?: number | null;
}

export class Utilisateur implements IUtilisateur {
  constructor(public id?: number, public nom?: string | null, public duree?: number | null) {}
}

export function getUtilisateurIdentifier(utilisateur: IUtilisateur): number | undefined {
  return utilisateur.id;
}
