import { Injectable } from '@angular/core';
import { Route } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RouteService {
  compRoutes: Route[] = [];

  routeFactory() {
    const a = this.compRoutes.find(x => x.data.routed === false);
    a.data.routed = true;
    
    // keeping compRoutes clean - only contain unrouted routes
    this.compRoutes = this.compRoutes.filter(x => x.data.routed === false);

    return a;
  }

  overrideRouteOutlet(outletName: string, componentType: any) {
    this.compRoutes.push(
      {
        path: '',
        component: componentType,
        outlet: outletName,
        data: { routed: false }
      });
  }
  constructor() { }

}