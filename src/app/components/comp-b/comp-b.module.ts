import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CompBComponent } from './comp-b.component';
import { ROUTES } from '@angular/router';
import { Route } from '@angular/router';

export let compBRoutes: Route[] = [
  {
    path: '',
    component: CompBComponent,
    outlet: 'bb'
  }
];

export function overrideRouteOutlet(outletName: string){
  compBRoutes[0].outlet = outletName;
}

function routeFactory(){
  const a = [{
    path: '',
    component: CompBComponent,
    outlet: compBRoutes[0].outlet
  }];

  return a;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([]),
  ],
  declarations: [CompBComponent],
   providers: [
    {
      provide: ROUTES,
      useFactory: (routeFactory),
      multi: true
    }
  ],
  entryComponents: [
    CompBComponent
  ],
})
export class CompBModule { 
}
