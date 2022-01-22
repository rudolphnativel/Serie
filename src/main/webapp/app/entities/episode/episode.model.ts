import { ISaison } from 'app/entities/saison/saison.model';

export interface IEpisode {
  id?: number;
  nom?: string | null;
  duree?: number | null;
  saison?: ISaison | null;
}

export class Episode implements IEpisode {
  constructor(public id?: number, public nom?: string | null, public duree?: number | null, public saison?: ISaison | null) {}
}

export function getEpisodeIdentifier(episode: IEpisode): number | undefined {
  return episode.id;
}
