import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TxtionComponent } from "./txtion/txtion.component";
import { AnalyzeComponent } from "./analyze/analyze.component";
import { CustomerComponent } from "./customer/customer.component";
import { PartnerComponent } from "./partner/partner.component";

const routes: Routes = [
  { path: "", redirectTo: "/", pathMatch: "full" },
  { path: "tx", component: TxtionComponent },
  { path: "partner", component: PartnerComponent },
  { path: "customer", component: CustomerComponent },
  { path: "analyze", component: AnalyzeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
