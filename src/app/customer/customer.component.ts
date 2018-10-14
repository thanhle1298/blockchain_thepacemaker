import { Component, OnInit } from "@angular/core";
import { PointService, Web3Service } from "services/services";
import BigNumber from "bignumber.js";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"]
})
export class CustomerComponent implements OnInit {
  constructor(private pointSv: PointService, private web3Service: Web3Service) {
  }

  address: string;
  name;
  $customer;

  ngOnInit() {
    this.web3Service.getAccounts().subscribe(
      accs => {
        
        this.address = accs[0];
        this.pointSv.customers(this.address).subscribe((data)=>{
          var n = new BigNumber(data[1])

          console.log(n.toNumber())
        })
        this.$customer = this.pointSv.customers(this.address);
      },
      err => {
        alert(err);
      }
    );
  }

  updateUser() {
    this.pointSv
      .createUser(this.address, this.name)
      .subscribe(() => alert("Updated!"), er => console.log("err", er));
  }

  addPoint(partner,user,point:number){
    // console.log(partner,user, point)
    this.pointSv
      .changePoint(partner, user, point)
      .subscribe(() => alert("Updated!"), er => console.log("err", er));

    this.pointSv.transacts_count().subscribe(val => console.log(val))
  }
}
