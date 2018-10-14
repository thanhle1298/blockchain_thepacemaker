import { Component, HostListener, NgZone } from "@angular/core";
import { Web3Service, PointService } from "../services/services";
import { canBeNumber } from "../util/validation";
import { BigNumber } from "bignumber.js";

declare var window: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  // TODO add proper types these variables
  account: any;
  accounts: any;
  balance: number;
  name: string;

  sendingAmount: number;
  recipientAddress: string;
  status: string;
  canBeNumber = canBeNumber;

  constructor(
    private _ngZone: NgZone,
    private web3Service: Web3Service,
    private pointService: PointService
  ) {
    this.onReady();
  }

  onReady() {
    // Get the initial account balance so it can be displayed.
    this.web3Service.getAccounts().subscribe(
      accs => {
        this.accounts = accs;
        this.account = this.accounts[0];
        // This is run from window:load and ZoneJS is not aware of it we
        // need to use _ngZone.run() so that the UI updates on promise resolution
        this._ngZone.run(() => this.refreshBalance());
      },
      err => alert(err)
    );
  }

  refreshBalance() {
    this.pointService.customers(this.account).subscribe(
      value => {
        var count = new BigNumber(value[1]);
        this.balance = count.toNumber();
        this.name = value[0]
      },
      e => {
        this.setStatus("Error getting balance; see log.");
      }
    );
  };

  setStatus(message) {
    this.status = message;
  }

  // sendCoin(){
  //   this.setStatus('Initiating transaction... (please wait)');

  //   this.pointService.sendCoin(this.account, this.recipientAddress, this.sendingAmount)
  //     .subscribe(() =>{
  //       this.setStatus('Transaction complete!');
  //       this.refreshBalance();
  //     }, e => this.setStatus('Error sending coin; see log.'))
  // };
}
