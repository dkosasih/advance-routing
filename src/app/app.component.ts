import { Component, OnInit, OnDestroy, ApplicationRef, ChangeDetectorRef, ViewChildren, QueryList } from '@angular/core';
import { Route, Router, ActivatedRoute, NavigationStart, GuardsCheckEnd, NavigationEnd, RouterStateSnapshot, ActivatedRouteSnapshot, RouterOutlet, ActivationStart } from '@angular/router';
import { ICustomRoute, customRouteTemplates } from './app.module';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CustomRouterOutletDirectiveDirective } from './directives/custom-router-outlet-directive.directive';
import { CompBComponent } from './components/comp-b/comp-b.component';
import { RouteService } from './route.service';

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
  i = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private routeService: RouteService,
    private cd: ChangeDetectorRef,
  ) {
    customRouteTemplates.forEach((f) => {
      this.convertedTemplate[f.path] = f;
    });
  }

  ngOnInit() {
    // this.router.events.subscribe(e => {
    //   if (e instanceof ActivationStart) {
    //     this.outlets.forEach(x => {
    //       const a = this.outlets.find(x => x.outletName === e.snapshot.outlet);
    //       if (a != null) {
    //         console.log('outlet deactivated');
    //         a.outlet.deactivate();
    //       }
    //     });
    //   }
    // });

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        const rootChildren = this.router.parseUrl(event.url).root.children;

        Object.keys(rootChildren).forEach((key) => {
          if(key === 'primary'){
            return;
          }

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

          // set lazy loading component router outlet
          if(shallowCopiedRouteTemplate.loadChildren) {
            this.routeService.overrideRouteOutlet(key, CompBComponent);
          }

          this.router.config.push(shallowCopiedRouteTemplate);
          this.tabs.push({ outletName: key, route: null });
        
          // detect changes needed to mark another work of change detection after tab has been rendered
          this.cd.detectChanges();
        });
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addTab(outletBase: string, componentPath: string) {
    const on = `${outletBase}_${this.i++}`;
    
    const param = [
      componentPath,
    ];

    let ol = {};
    ol[on] = param /* this is reserve for parameters */;

    this.router.navigate([{ outlets: ol }]);
  }
}