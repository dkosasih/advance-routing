import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, Router, ActivatedRoute, NavigationStart, GuardsCheckEnd, ActivatedRouteSnapshot } from '@angular/router';
import { ICustomRoute, customRouteTemplates } from './app.module';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators'

interface Tabs {
  outletName: string;
  route: Route;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  convertedTemplate: { [key: string]: ICustomRoute } = {};
  tabs: Tabs[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    customRouteTemplates.forEach((f) => {
      this.convertedTemplate[f.path] = f;
    });
  }

  ngOnInit() {
     this.router.events
      .pipe(filter((event: any) => event instanceof GuardsCheckEnd))
      .subscribe((event: GuardsCheckEnd) => {
        console.log('end', this.activatedRoute.snapshot)
      });

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        const rootChildren = this.router.parseUrl(event.url).root.children;

        console.log('rc', rootChildren);
        Object.keys(rootChildren).forEach((key) => {
          // find route with outlet
          const route: Route = this.router.config
            // get existing with same path and prefix
            .find((f) => f.outlet === key);

          // found - all good
          if (route) {
            return;
          }

          // get outletName to query against template
          const prefix: string = key.substr(0, key.indexOf("_"));

          // find the template
          const routeTemplate: Route | undefined = customRouteTemplates
            // filter by model route outlet
            .find((f) => {
              return f.outlet === prefix;
            });

          let shallowCopiedRouteTemplate = { ...routeTemplate };
          shallowCopiedRouteTemplate.outlet = key;

          console.log('snap', this.activatedRoute);
          console.log('templ', shallowCopiedRouteTemplate);
          console.log('key', key);
          this.router.config.push(shallowCopiedRouteTemplate);

          
    // this.tabs.push({ outletName: key, route: null });
        });
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addTab(outletBase:string, componentPath: string) {
    const on = `${outletBase}_${Date.now()}`;
    this.tabs.push({ outletName: on, route: null });

    const param = [
      componentPath,
    ];

    let ol = {};
    ol[on] = param /* this is reserve for parameters */;

    this.router.navigate([{ outlets: ol }]);
  }
}