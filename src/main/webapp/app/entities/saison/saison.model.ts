import { IEpisode } from 'app/entities/episode/episode.model';
import { ISerie } from 'app/entities/serie/serie.model';

export interface ISaison {
  id?: number;
  nom?: string | null;
  episodes?: IEpisode[] | null;
  serie?: ISerie | null;
}

export class Saison implements ISaison {
  constructor(public id?: number, public nom?: string | null, public episodes?: IEpisode[] | null, public serie?: ISerie | null) {}
}

export function getSaisonIdentifier(saison: ISaison): number | undefined {
  return saison.id;
}
