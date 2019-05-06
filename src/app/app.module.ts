import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { Route } from '@angular/router';
import { CompAComponent } from './components/comp-a/comp-a.component';
import { CompBComponent } from './components/comp-b/comp-b.component';
import { CompBModule } from './components/comp-b/comp-b.module';
import { CustomRouterOutletDirectiveDirective } from './directives/custom-router-outlet-directive.directive';
import {CanActivateGuard} from './can-activate.guard';
import { RouteService } from './route.service';

export interface ICustomRoute extends Route {
}

export const customRouteTemplates: ICustomRoute[] = [
  {path: 'aaa', component: CompAComponent, outlet:'aa', canActivate: [CanActivateGuard]},
  {
    path: 'bbb', outlet:'bb', loadChildren:'./components/comp-b/comp-b.module#CompBModule'
  },
];

const routes: Route[] = [
  { path: '', redirectTo: 'hello', pathMatch: 'full'},
  { path: 'hello', component: HelloComponent},
];

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, 
    // CompBModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [ AppComponent, HelloComponent, CompAComponent, CustomRouterOutletDirectiveDirective ],
  providers:[CanActivateGuard],
  entryComponents: [
    CompAComponent,
  ],
  bootstrap:    [ AppComponent,  ]
})
export class AppModule { }
