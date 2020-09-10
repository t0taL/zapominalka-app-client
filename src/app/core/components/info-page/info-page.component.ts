import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoPageComponent implements OnInit {
  infoMessage: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.infoMessage = window.history.state.data;

    if (!this.infoMessage) {
      this.router.navigateByUrl('/auth/sign-in');
    }
  }
}
