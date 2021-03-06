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
  selector: 'bla'
})
export class CustomRouterOutletDirectiveDirective {

    outlet: RouterOutlet;
    @Input() outletName: string;

    @Output()
    activate = new EventEmitter();
    @Output()
    deactivate = new EventEmitter();

    constructor(private parentContexts: ChildrenOutletContexts, private location: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
        private changeDetector: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.outlet = new RouterOutlet(this.parentContexts, this.location, this.resolver, this.outletName, this.changeDetector);
        this.outlet.activateEvents.subscribe((d: any) => { this.activate.emit(d); });
        this.outlet.deactivateEvents.subscribe((d: any) => { this.deactivate.emit(d); });
this.outlet.activateEvents
    }
    ngOnDestroy(): void {
        if (this.outlet) {
            this.outlet.activateEvents.unsubscribe();
            this.outlet.deactivateEvents.unsubscribe();
            this.outlet.ngOnDestroy();
        }
    }

}