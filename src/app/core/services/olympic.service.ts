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

  constructor(private http: HttpClient) { }

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

  /** Returns the number of unique Olympiads (or 0 if the list of countries is empty) using a Set for years of participation. */

  getTotalUniqueOlympics(): Observable<number> {
    return this.olympics$.pipe(
      map((olympics: Olympics[] | null) => {
        if (!olympics) {
          return 0; // Return 0 if no data
        }

        // Extract all years from all participations
        const allYears = olympics.flatMap((country: Olympics) =>
          country.participations.map((participation: Participation) => participation.year)
        );
        console.log(allYears);
        // Use a Set to have unique years
        const uniqueYears = new Set(allYears);

        // Return the number of unique years
        return uniqueYears.size;
      })
    );
  }

  /** Returns the number of countries (or 0 if the list is not loaded), with each object in olympics representing a country. */
  getTotalCountries(): Observable<number> {
    return this.olympics$.pipe(
      map((olympics: Olympics[] | null) => {
        if (!olympics) {
          return 0;
        }

        // Return the number of countries (each object in olympics represents a country)
        return olympics.length;
      })
    );
  }

  /** Returns a list of countries with their Olympic participations (or an empty list if not loaded) including id, name, participations, medals, and athletes. */

  getOlympicsPerCountry(): Observable<Country[]> {
    return this.olympics$.pipe(
      map((olympics: Olympics[] | null) => {
        if (!olympics) {
          return [];
        }

        // Transform data into Country
        return olympics.map((country: Olympics) => {
          const totalMedalsCount = country.participations.reduce(
            (sum, participation) => sum + participation.medalsCount, 0
          );
          const totalAthleteCount = country.participations.reduce(
            (sum, participation) => sum + participation.athleteCount, 0
          );

          return {
            id: country.id,
            country: country.country,
            totalEntries: country.participations.length,
            totalMedalsCount: totalMedalsCount,
            totalAthleteCount: totalAthleteCount,
          };
        });
      })
    );
  }

  /** Returns data for a specific country filtered by its ID. */
  getOlympicsForCountry(countryId: string): Observable<Country | undefined> {
    return this.getOlympicsPerCountry().pipe(
      map((countries: Country[]) => {
        // Filter to find country data corresponding to the ID
        return countries.find(country => country.id.toString() === countryId);
      })
    );
  }


  /**
   * Returns an observable that emits a boolean indicating whether the country with the given id exists in the list of countries.
   * If the list of countries is not loaded, the observable will emit false.
   * @param countryId The id of the country to check
   * @returns An observable that emits a boolean indicating whether the country exists
   */

  isIdMissing(countryId: string): Observable<boolean> {
    
    return this.getOlympicsPerCountry().pipe(
      map((countries: Country[]) => {
        console.log(countries)
        if (countries.length > 0) {
          // Filter to find country data corresponding to the ID. Return false if found
          const isIdExist: boolean = countries.some(country => country.id.toString() === countryId); // corrected to boolean
          console.log(isIdExist);
          return !isIdExist;
        }
        return false;
      })
    );
  }
}
