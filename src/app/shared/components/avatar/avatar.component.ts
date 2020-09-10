import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';


@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements OnInit {
  @Input() imageSrc: string;
  @Input() size: string;
  @Input() colorClass: string = 'mdt-pr-color';
  @Input() bgColorClass: string = 'mdt-pr-bg-color';
  @Input() borderColorClass: string = 'mdt-pr-border-color';

  constructor() {
  }

  ngOnInit(): void {
  }
}
