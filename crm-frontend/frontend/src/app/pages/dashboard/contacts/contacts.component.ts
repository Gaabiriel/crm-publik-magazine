import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { PhoneData, Contact, RecentUser } from '../../../@core/interfaces/iot/phone';

@Component({
  selector: 'ngx-contacts',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnDestroy {

  private alive = true;

  contacts: any[];
  recent: any[];

  constructor(private phoneService: PhoneData) {
    forkJoin(
      this.phoneService.getContacts(),
      this.phoneService.getRecentUsers(),
    )
      .pipe(takeWhile(() => this.alive))
      .subscribe(([contacts, recent]: [Contact[], RecentUser[]]) => {
        this.contacts = contacts;
        this.recent = recent;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
