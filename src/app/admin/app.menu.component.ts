import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../services/app.layout.service';


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Modulo de Administrador',
                items: [
                    {
                        label: 'Usuarios',
                        items: [
                            {
                                label: 'Administrar Usuarios', icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['/admin/usuario']
                            }
                        ]
                    },
                ]
            },
        ];
    }
}
