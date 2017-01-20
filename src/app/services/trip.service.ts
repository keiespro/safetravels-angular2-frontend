import {Injectable} from '@angular/core';
import {AppService} from "./app.service";
import {Observable} from "rxjs";
import {Trip} from "../models/trip.model";

@Injectable()
export class TripService {

  constructor(private appService: AppService) {

  }


  listTrips(include?: string): Observable<Trip[]> {
    let endpoint = '/trips?role=user';
    if (include) {
      endpoint = '/trips?role=user&include=' + include;
    }
    return this.appService.get(endpoint).map(res => this.formatTrips(res.json().data)).catch(err => Observable.throw(err))

  }

  get(id: number, include?: string): Observable<Trip> {

    let endpoint = '/trips/' + id;
    if (include) {
      endpoint = '/trips/' + id + '?include=' + include;
    }
    return this.appService.get(endpoint).map(res => res.json().data).catch(err => Observable.throw(err));
  }

  formatTrips(trips: Trip[]): Trip[] {


    for (let x = 0; x < trips.length; x++) {

      if (trips[x].admin && trips[x].admin.data) {
        trips[x].admin = trips[x].admin.data;
      }
      if (trips[x].guide && trips[x].guide.data) {
        trips[x].guide = trips[x].admin.data;
      }

    }

    return trips;

  }

}
