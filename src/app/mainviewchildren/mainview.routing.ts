import { Routes, RouterModule } from "@angular/router";
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {UserComponent} from "./user/user.component";
import {WelcomePageComponent} from "./welcome-page.component";
import {CreateUserComponent} from "./create-user/create-user.component";
import {ShowUsersComponent} from "./show-users/show-users.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {TestComponentComponent} from "./test-component/test-component.component";
import {CreateProjectComponent} from "./create-project/create-project.component";
import {ShowProjectsComponent} from "./show-projects/show-projects.component";
import {ProjectFilesComponent} from "./project-files/project-files.component";
import {UserFilesComponent} from "./user-files/user-files.component";


    export const MAIN_ROUTES: Routes = [
      { path: '',
        redirectTo: 'welcome',
        pathMatch: 'full' },
      { path: 'welcome',
        component: WelcomePageComponent },
      { path: 'user-create',
        component: CreateUserComponent },
      { path: 'user-current',
        component: UserComponent },
      { path: 'user-show',
        component: ShowUsersComponent },
      { path: 'user-profile/:username',
        component: UserProfileComponent
        },
      { path: 'project-create',
        component: CreateProjectComponent
      },
      { path: 'project-show',
        component: ShowProjectsComponent
      },
      { path: 'user-files/:fileUser',
        component: UserFilesComponent
      },
      { path: 'project-files/:projectName',
        component: ProjectFilesComponent
      },
      { path: '**',
       component: PageNotFoundComponent }
    ];
