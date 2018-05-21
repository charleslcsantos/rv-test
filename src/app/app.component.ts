import { Component } from '@angular/core';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showLoader: boolean;

  constructor(
    loaderService: LoaderService
  ) {

    loaderService.loader$.subscribe(
      (arg) => {
        this.showLoader = arg;
      }
    );
  }
}
