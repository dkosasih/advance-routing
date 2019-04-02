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

interface ICustomRoute {
  path: string;
  component: Function, 
}

const customRouteTemplates: ICustomRoute[] = [
  {path: 'aaa', component: CompAComponent},
  {path: 'bbb', component: CompBComponent},
];

const routes: Route[] = [
  { path: "hello", component: HelloComponent },
];

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, 
    RouterModule.forRoot(routes),
  ],
  declarations: [ AppComponent, HelloComponent, CompAComponent, CompBComponent, CustomRouterOutletDirectiveDirective ],
  entryComponents: [
    CompAComponent,
    CompBComponent
  ],
  bootstrap:    [ AppComponent,  ]
})
export class AppModule { }
