import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  group = [
    {name: 'Gabriele Fulgaro', mail: 'gabriele.fulgaro', image: 'gabriele', matricola: '0000772024'},
    {name: 'Francesco Fornari', mail: 'francesco.fornari2', image: 'francesco', matricola: '0000759275'},
    {name: 'Arianna Avoni', mail: 'arianna.avoni', image: 'arianna', matricola: '0000767045'},
    {name: 'Mattia Polverini', mail: 'mattia.polverini', image: 'mattia', matricola: '0000757994'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
