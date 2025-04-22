import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Credit } from '../../../model/credit';
import { CreditService } from '../../../service/credit.service';
import { ActorService } from '../../../service/actor.service';
import { MovieService } from '../../../service/movie.service';
import { Movie } from '../../../model/movie';
import { Actor } from '../../../model/actor';

@Component({
  selector: 'app-credit-create',
  standalone: false,
  templateUrl: './credit-create.component.html',
  styleUrl: './credit-create.component.css'
})
export class CreditCreateComponent implements OnInit, OnDestroy {
  title: string = "Credit-Create";
  newCredit: Credit = new Credit();
  subscription!: Subscription;
  movies: Movie[] = [];
  actors: Actor[] = []
  
  constructor(
    private creditSvc: CreditService,
    private movieSvc: MovieService,
    private actorSvc: ActorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //populate list of movies
    this.subscription = this.movieSvc.list().subscribe({
      next: (resp) => {
        this.movies = resp;
      },
      error: (err) => {
        console.error(
          'Credit Create Error: error loading movies.' + err.message
        );
      },
    });
    //populate list of actors
    this.subscription = this.actorSvc.list().subscribe({
      next: (resp) => {
        this.actors = resp;
      },
      error: (err) => {
        console.error(
          'Credit Create Error: error loading actors.' + err.message
        );
      },
    });
  }

  addCredit() {
    this.subscription = this.creditSvc.add(this.newCredit).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/credit-list');
      },
      error: (err) => {
        console.error('Error creating credit: ' + err.message);
      },
    });
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}