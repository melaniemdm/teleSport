import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympics } from '../models/Olympic';
import { Participation } from '../models/Participation';
import { Country } from '../models/Country';


@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);
  public Country: Country[] = [];

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.getOlympics();
  }

  private getOlympics() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

   /**
   * Retourne le nombre total d'olympiades uniques.
   * Si la liste des pays n'est pas encore chargée, retourne 0.
   * Sinon, extrait toutes les années de toutes les participations,
   * utilise un Set pour avoir les années uniques, et retourne le nombre d'années uniques.
   */

  getTotalUniqueOlympics(): Observable<number> {
    return this.olympics$.pipe(
      map((olympics: Olympics[] | null) => {
        if (!olympics) {
          return 0; // Retourne 0 si aucune donnée
        }

        // Extraire toutes les années de toutes les participations
        const allYears = olympics.flatMap((country: Olympics) =>
          country.participations.map((participation: Participation) => participation.year)
        );
        console.log(allYears);
        // Utiliser un Set pour avoir les années uniques
        const uniqueYears = new Set(allYears);

        // Retourner le nombre d'années uniques
        return uniqueYears.size;
      })
    );
  }

  /**
   * Retourne le nombre total de pays.
   * Si la liste des pays n'est pas encore chargée, retourne 0.
   * Sinon, retourne le nombre de pays (chaque objet dans olympics représente un pays).
   */

  getTotalCountries(): Observable<number> {
    return this.olympics$.pipe(
      map((olympics: Olympics[] | null) => {
        if (!olympics) {
          return 0;
        }

        // Retourner le nombre de pays (chaque objet dans olympics représente un pays)
        return olympics.length;
      })
    );
  }

  /**
   * Retourne une liste de pays avec des informations sur leurs participations
   * aux JO. Si la liste des pays n'est pas encore chargée, retourne une liste
   * vide.
   * Sinon, retourne une liste de pays avec les informations suivantes :
   * - id : l'identifiant du pays
   * - country : le nom du pays
   * - totalEntries : le nombre total de participations du pays
   * - totalMedalsCount : le nombre total de médailles remportées par le pays
   * - totalAthleteCount : le nombre total d'athlètes qui ont participé pour le
   *   pays
   */

  getOlympicsPerCountry(): Observable<Country[]> {
    return this.olympics$.pipe(
      map((olympics: Olympics[] | null) => {
        if (!olympics) {
          return [];
        }

        // Transformer les données en Country
        return olympics.map((country: Olympics) => {
          const totalMedalsCount = country.participations.reduce(
            (sum, participation) => sum + participation.medalsCount, 0
          );
          const totalAthleteCount = country.participations.reduce(
            (sum, participation) => sum + participation.athleteCount, 0
          );

          return {
            id: country.id,
            country: country.country, // Nom du pays correct
            totalEntries: country.participations.length, // Nombre total de participations
            totalMedalsCount: totalMedalsCount, // Total des médailles
            totalAthleteCount: totalAthleteCount, // Total des athlètes
          };
        });
      })
    );
  }
  /**
     * Retourne les données d'un pays spécifique par son ID.
     * Cette méthode filtre les données pour renvoyer les informations
     * d'un seul pays.
     */
  getOlympicsForCountry(countryId: string): Observable<Country | undefined> {
    return this.getOlympicsPerCountry().pipe(
      map((countries: Country[]) => {
        // Filtrer pour trouver les données du pays correspondant à l'ID
        return countries.find(country => country.id.toString() === countryId);
      })
    );
  }

}
