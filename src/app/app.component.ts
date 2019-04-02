import { Component } from '@angular/core';
import {Route, Router, ActivatedRoute} from '@angular/router';
import {ICustomRoute, customRouteTemplates} from './app.module';

interface Tabs {
  outletName: string;
  route: Route;  
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  alteredTemplate: {[key: string]: ICustomRoute}
  tabs: Tabs[];


  addTab(component:string){
    console.log(component);

  }
}
