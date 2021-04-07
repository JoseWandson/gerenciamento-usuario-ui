import { Component, OnInit } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';

import { Constants } from './shared/Constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private config: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.config.setTranslation(Constants.pt);
  }

}
