import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actor } from '../../../model/actor';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ActorService } from '../../../service/actor.service';

@Component({
  selector: 'app-actor-create',
  standalone: false,
  templateUrl: './actor-create.component.html',
  styleUrl: './actor-create.component.css'
})
export class ActorCreateComponent implements OnInit, OnDestroy {
  title: string = "Actor-Create";
  newActor: Actor = new Actor();
  subscription!: Subscription;
  genders: string[] = ['M', 'F'];
  
constructor(private actorSvc: ActorService,
            private router: Router
){}
  
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  this.subscription.unsubscribe();

  }
  
  addActor(): void {
    this.subscription = this.actorSvc.add(this.newActor).subscribe((resp) => {
      this.router.navigateByUrl('/actor-list');
    } );
  }

}


