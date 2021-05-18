import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  showSpinner: boolean = false;
  constructor(private loaderService: LoaderService,  private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.loaderService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = (status === 'start');
      this.cdRef.detectChanges();
    });

  }


}
