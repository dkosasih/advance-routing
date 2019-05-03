import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CompBComponent } from './comp-b.component';

import { Route } from '@angular/router';

// const routes: Route[] = [
//   {
//     path: '', children: [
//       {
//         path: 'bbb',
//         component: CompBComponent
//       }
//     ]
//   },
// ];
var i = 0;
const routes: Route[] = [
  {
    path: '',
    component: CompBComponent,
    outlet: 'bb_' + i++
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CompBComponent],
  providers: [],
  // entryComponents: [
  //   CompBComponent
  // ],
})
export class CompBModule { 


}
