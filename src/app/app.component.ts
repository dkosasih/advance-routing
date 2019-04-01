import { Component } from '@angular/core';
import {Route} from '@angular/router';

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
  tabs: Tabs[];


  addTab(component:string){
    console.log(component);
  }
}
