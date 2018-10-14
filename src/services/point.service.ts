import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import { Web3Service } from "./web3.service";

const pointArtifacts = require("../../build/contracts/Point.json");
const contract = require("truffle-contract");

@Injectable()
export class PointService {
  Point = contract(pointArtifacts);

  constructor(private web3Ser: Web3Service) {
    // Bootstrap the Point abstraction for Use
    this.Point.setProvider(web3Ser.web3.currentProvider);

    // IN CONTRACT
    this.Point.deployed().then(data => console.log(data.contract));
  }

  transacts_count(): Observable<any> {
    return Observable.create(observer => {
      this.Point.deployed()
        .then(meta => {
          // GOI HAM SOLIDITY
          return meta.transacts_count.call();
        })
        .then(value => {
          observer.next(value);
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }

  customers(addr): Observable<any> {
    return Observable.create(observer => {
      this.Point.deployed()
        .then(meta => {
          // GOI HAM SOLIDITY
          return meta.customers.call(addr);
        })
        .then(value => {
          observer.next(value);
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }

  partners(addr): Observable<any> {
    return Observable.create(observer => {
      this.Point.deployed()
        .then(meta => {
          // GOI HAM SOLIDITY
          return meta.customers.call(addr);
        })
        .then(value => {
          observer.next(value);
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }

  transacts(id): Observable<any> {
    return Observable.create(observer => {
      this.Point.deployed()
        .then(meta => {
          // GOI HAM SOLIDITY
          return meta.transacts.call(id);
        })
        .then(value => {
          observer.next(value);
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }

  createPartner(name): Observable<any> {
    return Observable.create(observer => {
      this.Point.deployed()
        .then(meta => {
          // GOI HAM SOLIDITY
          return meta.createPartner.call(name);
        })
        .then(value => {
          console.log("Đã gửi thông tin thành công!");
          observer.next(value);
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }

  createUser(from, name): Observable<any> {
	console.log("run")
    return Observable.create(observer => {
      this.Point.deployed()
        .then(meta => {
		  // GOI HAM SOLIDITY
          return meta.createUser(name,{from: from});
        })
        .then(value => {
          observer.next(value);
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }

  changePoint(partner, user, point): Observable<any> {
    let meta;
    return Observable.create(observer => {
      this.Point.deployed()
        .then(instance => {
          meta = instance;
          return meta.changePoint(partner, user, point,{from: partner});
        })
        .then(() => {
          observer.next();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }


  transferPoint(sender, receiver, point): Observable<any> {
      return Observable.create(observer => {
        this.Point.deployed()
          .then(meta => {
        // GOI HAM SOLIDITY
          return meta.transferPoint(sender, receiver, point,{from: sender});
          })
          .then(value => {
            observer.next(value);
          })
          .catch(e => {
            console.log(e);
            observer.error(e);
          });
      });
    }

    getTX(caller): Observable<any> {
      return Observable.create(observer => {
        this.Point.deployed()
          .then(meta => {
        // GOI HAM SOLIDITY
          return meta.transacts.call({from:caller});
          })
          .then(value => {
            observer.next(value);
          })
          .catch(e => {
            console.log(e);
            observer.error(e);
          });
      });
    }
  

  
}
