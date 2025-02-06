import { Routes } from '@angular/router';
import { CreateCampainComponent } from './features/campain/pages/create-campain/create-campain.component';
import { ViewComponentComponent } from './features/campain/pages/view-component/view-component.component';

export const routes: Routes = [
    {
        path: 'create-campain',
        component: CreateCampainComponent
    },
    {
        path: 'view-campain',
        component: ViewComponentComponent
    }
];
