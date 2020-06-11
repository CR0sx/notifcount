import { Component, OnInit } from '@angular/core';
import { StatusesService } from './statuses.service';


@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.sass']
})
export class StatusesComponent implements OnInit {

  public statusText: string;
  public statuses: any[];
  public canPostStatus = false;


  constructor(public status: StatusesService) { }

  ngOnInit() {
    this.status.recent(50);
  }

  typingStatus() {
    this.canPostStatus = this.status.valid(this.statusText) && this.status.updating() === false;
  }

  postStatus() {
    // tslint:disable-next-line:no-unused-expression
    this.status.valid(this.statusText) && this.status.post(this.statusText);
  }

  react(reaction: string, status) {
    this.status.react(reaction, status);
  }

}
