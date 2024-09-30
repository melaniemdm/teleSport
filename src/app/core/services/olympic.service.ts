import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympics } from '../models/Olympic';
import { Participation } from '../models/Participation';
import { Country } from '../models/Country';
import { CountryMedals } from '../models/CountryMedals';


@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympics[]>([]);
  public Country: Country[] = [];

  constructor(private http: HttpClient) { }


  /**
   * Retrieves the initial data for the application by calling getOlympics and
   * updating the observable olympics$ with the received data.
   * @returns Observable of the retrieved data
   */
  loadInitialData() {
    return this.getOlympics();
  }

  
  /**
   * Loads the olympics data from the json file and updates the
   * olympics$ observable with the received data.
   * If an error occurs, it logs the error and sets the observable to an empty array.
   * @returns Observable of the retrieved data
   */
  private getOlympics(): Observable<Olympics[]> {
    return this.http.get<Olympics[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        console.error(error);
        this.olympics$.next([]);
        return throwError(() => error); 
      })
    );
  }





  /**
   * Returns an observable of the number of unique olympic years.
   * It takes the array of Olympics from the olympics$ observable and
   * extracts all years from all participations.
   * It then uses a Set to have unique years and returns the number of unique years.
   * @returns Observable of the number of unique olympic years
   */
  getTotalUniqueOlympics(): Observable<number> {
    return this.olympics$.pipe(
      map((olympics: Olympics[]) => {
        // Extract all years from all participations
        const allYears = olympics.flatMap((country: Olympics) =>
          country.participations.map((participation: Participation) => participation.year)
        );
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
      map((olympics: Olympics[]) => olympics.length)
    );
  }

  /** Returns a list of countries with their Olympic participations (or an empty list if not loaded) including id, name, participations, medals, and athletes. */

  getOlympicsPerCountry(): Observable<Country[]> {
    return this.olympics$.pipe(
      map((olympics: Olympics[]) => {

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
            participations: country.participations
          };
        });
      })
    );
  }

  /** Returns data for a specific country filtered by its ID. */
  getOlympicsForCountry(countryId: string): Observable<Country | undefined> {
    return this.getOlympicsPerCountry().pipe(
      map((countries: Country[]) => countries.find(country => country.id.toString() === countryId))
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
          const isIdExist: boolean = countries.some(country => country.id.toString() === countryId); // corrected to boolean
          console.log(isIdExist);
          return !isIdExist;
        }
        return false;
      })
    );
  }


  /**
   * Returns an array of objects with country id, name and total medals count.
   * The data is retrieved from the olympics$ observable and transformed
   * to create the CountryMedals objects.
   */
  getAllCountryMedals(): Observable<CountryMedals[]> {
    return this.olympics$.pipe(
      map((olympics: Olympics[]) => {

        return olympics.map((country: Olympics) => {
          const totalMedals = country.participations.reduce(
            (sum, participation) => sum + participation.medalsCount,
            0
          );

          return {
            id: country.id,
            name: country.country,
            value: totalMedals,
          };
        });
      })
    );
  }

}

