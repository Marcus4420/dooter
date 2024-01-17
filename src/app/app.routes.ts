import { Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {ChatpageComponent} from "./chatpage/chatpage.component";

export const routes: Routes = [{path: '', component: HomepageComponent}, {path: 'chatpage', component: ChatpageComponent}];
