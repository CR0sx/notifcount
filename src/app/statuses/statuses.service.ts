import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusesService {

  private inProgress = false;
  private reactions: string[] = ['like', 'love', 'dislike'];
  public statuses: AngularFireList<any>;
  public maxLength = 500;
  public minLength = 0;
  public statusTextValid = false;

  constructor(private af: AngularFireDatabase) { }

  post(status: string) {
    if ( ! this.updating()) {
      this.inProgress = true;
      const payload = {text: status, like: 0, dislike: 0, love: 0, createdAt: {'.sv': 'timestamp'}};
      this.statuses.push(payload).then( snapshot => {
        this.inProgress = false;
      });
    }
  }

  react(reaction: string, status) {
    // tslint:disable-next-line:no-bitwise
    if (~this.reactions.indexOf(reaction)) {
      const reactions: any = {};
      // tslint:disable-next-line:radix
      const count: number = isNaN(parseInt(status[reaction])) ? 0 : parseInt(status[reaction]);
      reactions[reaction] = count + 1;
      this.statuses.update(status.$key, reactions);
    }
  }

  recent(amount: number): AngularFireList<any[]> {
    return this.statuses = this.af.list('/statuses').map(arr => arr.reverse()) as AngularFireList<any[]>;
  }

  valid(status: string): boolean {
    return status.length >= this.minLength && status.length <= this.maxLength;
  }

  updating(): boolean {
    return this.inProgress;
  }

}
