import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { Route } from '@angular/router';
import { CompAComponent } from './components/comp-a/comp-a.component';
import { CompBComponent } from './components/comp-b/comp-b.component';
import { CustomRouterOutletDirectiveDirective } from './directives/custom-router-outlet-directive.directive';
import {CanActivateGuard} from './can-activate.guard';

export interface ICustomRoute extends Route {
}

export const customRouteTemplates: ICustomRoute[] = [
  {path: 'aaa', component: CompAComponent, outlet:'aa', canActivate: [CanActivateGuard]},
  {path: 'bbb', component: CompBComponent, outlet:'bb', canActivate: [CanActivateGuard]},
];

const routes: Route[] = [
  { path: '', component: HelloComponent, canActivate: [CanActivateGuard]},
];

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, 
    RouterModule.forRoot(customRouteTemplates),
  ],
  declarations: [ AppComponent, HelloComponent, CompAComponent, CompBComponent, CustomRouterOutletDirectiveDirective ],
  providers:[CanActivateGuard],
  entryComponents: [
    CompAComponent,
    CompBComponent
  ],
  bootstrap:    [ AppComponent,  ]
})
export class AppModule { }
