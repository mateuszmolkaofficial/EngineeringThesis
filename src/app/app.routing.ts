import { Routes, RouterModule } from "@angular/router";
import {SigninComponent} from "./signin/signin.component";
import { MainviewComponent } from './mainview/mainview.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {MAIN_ROUTES} from "./mainviewchildren/mainview.routing";


    const APP_ROUTES: Routes = [
      { path: '',
        redirectTo: '/login',
        pathMatch: 'full' },
      { path: 'login',
        component: SigninComponent },
      { path: 'main',
        component: MainviewComponent,
        children: MAIN_ROUTES
       },
      { path: '**',
        component: PageNotFoundComponent }


    ];
    export const routing = RouterModule.forRoot(APP_ROUTES);
