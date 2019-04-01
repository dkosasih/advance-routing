import {
    ViewContainerRef,
    ComponentFactoryResolver,
    Directive,
    Input,
    Output,
    OnInit,
    OnDestroy,
    Attribute,
    ChangeDetectorRef,
    EventEmitter
} from "@angular/core";

import { Router, RouterOutlet, ActivatedRoute, ChildrenOutletContexts } from "@angular/router";

@Directive({
  selector: '[appCustomRouterOutletDirective]'
})
export class CustomRouterOutletDirectiveDirective {

  private outlet: RouterOutlet;
    @Input() private outletname: string;

    @Output()
    activate = new EventEmitter();
    @Output()
    deactivate = new EventEmitter();

    constructor(private parentContexts: ChildrenOutletContexts, private location: ViewContainerRef,
        private resolver: ComponentFactoryResolver, @Attribute("name") private name: string,
        private changeDetector: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.outlet = new RouterOutlet(this.parentContexts, this.location, this.resolver, this.outletname, this.changeDetector);
        this.outlet.activateEvents.subscribe((d: any) => { this.activate.emit(d); });
        this.outlet.deactivateEvents.subscribe((d: any) => { this.deactivate.emit(d); });

    }
    ngOnDestroy(): void {
        if (this.outlet) {
            this.outlet.activateEvents.unsubscribe();
            this.outlet.deactivateEvents.unsubscribe();
            this.outlet.ngOnDestroy();
        }
    }

}