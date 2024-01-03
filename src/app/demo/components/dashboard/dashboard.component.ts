import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Product } from '../../api/product';
import { Subscription } from 'rxjs';
import { IntermediarioDTO, LitarIntermediariosDTO } from 'src/app/admin/intermediario/intermediario.model';
import { IntermediarioService } from 'src/app/admin/servicios/intermediario.service';
declare var google: any

@Component({
    providers: [MessageService],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    options: any;
    overlays: any[] = [];
    dialogVisible: boolean = false;
    markerTitle?: string | null;
    selectedPosition: any;
    infoWindow: any;
    draggable: boolean = false;









    subCargarProductores!:Subscription;
    totalProductores: number=0;

    //variables globales
    subCargarCantones!:Subscription;
    totalCantones: number=0;


    listarIntermediarios:LitarIntermediariosDTO[] = [];
    subCargarIntermediarios!:Subscription;
    totalIntermediarios: number=0;


    loading: boolean = false;
    selectedCustomer3!: IntermediarioDTO;

    objGeneroModel!: Product[]

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;
    subCargarCostoProduccion!:Subscription;

    subscription!: Subscription;

    constructor(
        private intermediarioService:IntermediarioService,
        private messageService: MessageService) {
    }

    ngOnInit() {
        if (!navigator.onLine) {
            console.log('No hay conexión a internet.');
            this.messageService.add({severity:'error', summary: 'Error', detail: 'No hay conexión a internet.'});
          }

        this.options = {
            center: {lat: -3.989530079515933, lng: -79.20430183410645},
            zoom: 9
        };

        this.initOverlays();

        this.infoWindow = new google.maps.InfoWindow();
        this.cargarIntermediarios();
    }



    handleOverlayClick(event: any) {
        let isMarker = event.overlay.getTitle != undefined;

        if (isMarker) {
            let title = event.overlay.getTitle();
            this.infoWindow.setContent('' + title + '');
            this.infoWindow.open(event.map, event.overlay);
            event.map.setCenter(event.overlay.getPosition());

            this.messageService.add({severity:'info', summary:'Marker Selected', detail: title});
        }
        else {
            this.messageService.add({severity:'info', summary:'Shape Selected', detail: ''});
        }
    }



    handleDragEnd(event: any) {
        this.messageService.add({severity:'info', summary:'Marker Dragged', detail: event.overlay.getTitle()});
    }

    initOverlays() {

        if (!this.overlays||!this.overlays.length) {
            this.overlays = [
            ];
        }
    }

    zoomIn(map: any) {
        map.setZoom(map.getZoom()+1);
    }

    zoomOut(map: any) {
        map.setZoom(map.getZoom()-1);
    }

    clear() {
        this.overlays = [];
    }




      cargarIntermediarios():void{
        this.subCargarIntermediarios=this.intermediarioService.obtenerTodos().subscribe(cantones=>{
          console.log(cantones);
          this.loading=false;
          this.listarIntermediarios=cantones.data;
          this.totalIntermediarios = this.listarIntermediarios.length;
        },error=>{
          let message= error.error.message;
        this.messageService.add({severity:'error', summary: 'Error', detail: message});
        });

      }
}
