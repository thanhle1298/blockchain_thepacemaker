import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";

import { PointService, Web3Service } from "../services/services";
import { TxtionComponent } from "./txtion/txtion.component";
import { AppRoutingModule } from "./app-routing.module";
import { PartnerComponent } from "./partner/partner.component";
import { CustomerComponent } from "./customer/customer.component";
import { AnalyzeComponent } from "./analyze/analyze.component";

const SERVICES = [PointService, Web3Service];

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, AppRoutingModule],
  declarations: [
    AppComponent,
    TxtionComponent,
    PartnerComponent,
    CustomerComponent,
    AnalyzeComponent
  ],
  providers: [SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule {}
