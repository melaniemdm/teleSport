import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
            participations : country.participations
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

  isIdExist(countryId: string): Observable<boolean> {
    return this.getOlympicsPerCountry().pipe(
      map((countries: Country[]) => {
        // Filter to find country data corresponding to the ID
        return countries.some(country => country.id.toString() === countryId);
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
      map((olympics: Olympics[] | null) => {
        if (!olympics) {
          return []; 
        }
  
        // Transform the data to get the country name and medal total
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

