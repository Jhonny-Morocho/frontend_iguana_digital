import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
@Component({
    providers: [MessageService],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {


    constructor(
        private messageService: MessageService) {
    }
    ngOnInit(): void {

    }

  

}
