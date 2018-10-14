import { Component, OnInit } from "@angular/core";
import { Web3Service, PointService } from "services/services";

@Component({
  selector: "app-txtion",
  templateUrl: "./txtion.component.html",
  styleUrls: ["./txtion.component.css"]
})
export class TxtionComponent implements OnInit {
  constructor(
    private web3Service: Web3Service,
    private pointService: PointService
  ) {
    this.onReady();
  }
  account;
  send_sender;
  send_receiver;
  send_point;

  onReady() {
    // Get the initial account balance so it can be displayed.
    this.web3Service.getAccounts().subscribe(
      accs => {
        this.send_sender = accs[0];
      },
      err => alert(err)
    );
  }

  ngOnInit() {}

  givePointToOther(sender, receiver, point) {
    console.log(sender, receiver, point);

    this.pointService.transferPoint(sender, receiver, point).subscribe(
      ret => {
        console.log(ret);
      },
      e => console.log("Error sending coin; see log.")
    );
  }
}
