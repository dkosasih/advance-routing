import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CompBComponent } from './comp-b.component';
import { ROUTES } from '@angular/router';
import { Route } from '@angular/router';

export let compBRoutes: Route[] = [
];

export function overrideRouteOutlet(outletName: string) {
  compBRoutes.push(
    {
      path: '',
      component: CompBComponent,
      outlet: outletName,
      data: { routed: false }
    });
}

function routeFactory() {
  const a = compBRoutes.find(x => x.data.routed === false);
  a.data.routed = true;
  console.log('fact', a);
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
      useFactory: (() => routeFactory()),
      //deps: [SomeService, SOME_TOKEN] // deps is optional, in the case you need no params - delete it; otherwise pass 'em
      multi: true
    }
  ],
  entryComponents: [
    CompBComponent
  ],
})
export class CompBModule {
}
