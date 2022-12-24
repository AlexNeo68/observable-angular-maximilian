import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  firstSubscription: Subscription = new Subscription();

  constructor() {}

  ngOnInit() {
    // this.firstSubscription = interval(1000).subscribe((count) =>
    //   console.log(count)
    // );

    const customObserver = Observable.create((observer: any) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);

        if (count === 2) {
          observer.complete();
        }

        if (count > 3) {
          observer.error(new Error('Count is greater than 3'));
        }
        count++;
      }, 1000);
    });

    this.firstSubscription = customObserver
      .pipe(
        filter((data: number) => {
          return data > 0;
        }),
        map((data: number): string => {
          return 'Round - ' + data;
        })
      )
      .subscribe(
        (data: any) => console.log(data),
        (err: { message: any }) => {
          console.log(err);
          alert(err.message);
        },
        () => {
          console.log('Completed!');
        }
      );
  }

  ngOnDestroy(): void {
    this.firstSubscription.unsubscribe();
  }
}
