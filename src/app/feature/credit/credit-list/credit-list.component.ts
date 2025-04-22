import { Component, OnDestroy, OnInit } from '@angular/core';
import { Credit } from '../../../model/credit';
import { Subscription } from 'rxjs';
import { CreditService } from '../../../service/credit.service';

@Component({
  selector: 'app-credit-list',
  standalone: false,
  templateUrl: './credit-list.component.html',
  styleUrl: './credit-list.component.css'
})
export class CreditListComponent implements OnInit, OnDestroy{
  title: string = 'Credit-List';
  credits! : Credit[];
  subscription! : Subscription;

constructor(
  private creditSvc: CreditService
){}

  ngOnInit(): void {
    this.subscription = this.creditSvc.list().subscribe((resp) => {
      this.credits = resp;}
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  delete(id: number) {
    this.subscription = this.creditSvc.delete(id).subscribe({
      next: () => {
        // refresh the movie list
        this.subscription = this.creditSvc.list().subscribe((resp) => {
          this.credits = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting credit for id: '+id);
        alert('Error deleting credit for id: '+id);
      }
    });
  }
}
