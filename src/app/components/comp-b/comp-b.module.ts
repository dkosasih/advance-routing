import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CompBComponent } from './comp-b.component';
import { ROUTES } from '@angular/router';
import { Route } from '@angular/router';
import { RouteService } from '../../route.service';

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
      useFactory: ((routeService) => routeService.routeFactory()),
      deps: [RouteService],
      multi: true
    }
  ],
  entryComponents: [
    CompBComponent
  ],
})
export class CompBModule {
  constructor(routeService: RouteService){
  
  }
}
