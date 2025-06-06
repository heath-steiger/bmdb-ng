import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actor } from '../../../model/actor';
import { Subscription } from 'rxjs';
import { ActorService } from '../../../service/actor.service';

@Component({
  selector: 'app-actor-list',
  standalone: false,
  templateUrl: './actor-list.component.html',
  styleUrl: './actor-list.component.css'
})
export class ActorListComponent implements OnInit, OnDestroy {
  title: string = "Actor-List";
  actors! : Actor[];
  subscription!: Subscription;
  
  constructor(
    private actorSvc: ActorService
  ){}

  ngOnInit(): void {
    this.subscription = this.actorSvc.list().subscribe((resp) => {
      this.actors = resp;}
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  delete(id: number) {
    this.subscription = this.actorSvc.delete(id).subscribe({
      next: () => {
        // refresh the actor list
        this.subscription = this.actorSvc.list().subscribe((resp) => {
          this.actors = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting actor for id: '+id);
        alert('Error deleting actor for id: '+id);
      }
    });
  }

}
