import {Component, OnDestroy} from '@angular/core';
import {Observable, Subscription, timer} from 'rxjs';
import {CompleterData, CompleterService} from 'ng-uikit-pro-standard';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'app';

  lineManagerSubscribtion: Subscription;
  // requesterSubscribtion: Subscription;

  lineManagers: CompleterData;
  requesters: CompleterData;
  lineManagerStr: string;
  requesterStr: string;
  lmkeycounter = 0;
  reqkeycounter = 0;

  constructor(private completerService: CompleterService, private http: HttpClient) {
  }


  subscribeToProfileSearch() {
    this.lmkeycounter = this.lmkeycounter + 1;
    if (this.lineManagerSubscribtion) {
      this.lineManagerSubscribtion.unsubscribe();
    }
    this.lineManagerSubscribtion = timer(350).subscribe(() => this.getLineManagers());
  }

  getLineManagers() {
      this.getObject().subscribe(data => {
        this.lineManagers = this.completerService.local(data.people, 'label', 'label');
      });
  }

/*  subscribeToRequesterSearch() {
    this.reqkeycounter = this.reqkeycounter + 1;
    if (this.requesterSubscribtion) {
      this.requesterSubscribtion.unsubscribe();
    }
    this.requesterSubscribtion = timer(500).subscribe(() => this.getRequesters());
  }

  getRequesters() {
      this.getObject().subscribe(data => {
        this.requesters = this.completerService.local(data.people, 'label', 'label');
      });
  }*/

  ngOnDestroy(): void {
    if (this.lineManagerSubscribtion) {
      this.lineManagerSubscribtion.unsubscribe();
    }
/*    if (this.requesterSubscribtion) {
      this.requesterSubscribtion.unsubscribe();
    }*/
  }

  getObject(): Observable<any> {
    const url = 'https://api.myjson.com/bins/d2h50';
    return this.http.get(url);
  }

}
