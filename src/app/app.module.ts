import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { PrincipalModule } from './principal/principal.module';
import { AdminModule } from './admin/admin.module';
import {MenubarModule} from 'primeng/menubar';
import {TabViewModule} from 'primeng/tabview';
import {CarouselModule} from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { GMapModule } from 'primeng/gmap';
import { ChartModule } from 'primeng/chart';
import { DashboardModule } from './demo/components/dashboard/dashboard.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import {ImageModule} from 'primeng/image';
@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,

    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        AdminModule,
        MenubarModule,
        TabViewModule,
        CarouselModule,
        ButtonModule,
        GMapModule,
        ChartModule,
        PrincipalModule,
        DashboardModule,
        PdfViewerModule,
        DialogModule,
        TableModule,
        ImageModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
