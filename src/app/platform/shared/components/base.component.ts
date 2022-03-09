import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppRoutes } from 'src/app/routes';

@Component({ template:'' })
export abstract class BaseComponent implements OnDestroy {
  private subscriptions: Subscription = new Subscription();
  /**
   * The component name. The default value is the class name
   */

  constructor() {
    // override ngOnDestroy in order to perform unsubscription of the passed subscriptions
    const f = this.ngOnDestroy.bind(this);
    this.ngOnDestroy = () => {
      f();
      this.subscriptions.unsubscribe();
    };
  }

  /**
   * The subscription passed will be unsubscribed on the ngOnDestroy method.
   * If the subscription is already added nothing happens.
   * @param sub - the subscription to unsubscribe
   */
  protected addSafeSubscription(...sub: Subscription[]): void {
    if (!sub) {
      return;
    }
    sub.forEach((subscription) => this.subscriptions.add(subscription));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  get getAppRoutes() {
    return AppRoutes;
  }
}
