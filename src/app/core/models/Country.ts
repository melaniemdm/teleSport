import { Participation } from "./Participation";

export interface Country {
  id: number;
  country: string;
  totalEntries: number;
  totalMedalsCount: number;
  totalAthleteCount: number;
  participations: Participation[];
  
}