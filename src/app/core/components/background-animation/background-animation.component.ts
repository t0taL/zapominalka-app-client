import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, ChangeDetectionStrategy, AfterContentChecked } from '@angular/core';

import { Particle, config } from '../../classes/particle.model';


@Component({
  selector: 'app-background-animation',
  templateUrl: './background-animation.component.html',
  styleUrls: ['./background-animation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundAnimationComponent implements OnInit, AfterViewInit, AfterContentChecked {
  @Input() screenWidth: number;
  @Input() screenHeight: number;
  @ViewChild('canvas') private canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  private particleColor: string;
  private particleColorValues: string;
  private particles: Particle[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.update();
    this.init();
  }

  ngAfterContentChecked(): void {
    window.dispatchEvent(new Event('resize'));
  }

  private setActualColor(): void {
    this.particleColor = getComputedStyle(this.canvas.nativeElement).color;
    this.particleColorValues = this.particleColor.slice(4, this.particleColor.length - 1);
  }

  private renderBackground(): void {
    this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
  }

  private renderLine(particle1: Particle, particle2: Particle): void {
    const x1 = particle1.posX;
    const y1 = particle1.posY;
    const x2 = particle2.posX;
    const y2 = particle2.posY;
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    if (length < config.lineLength) {
      const opacity = 1 - length / config.lineLength;
      this.ctx.lineWidth = 0.5;
      this.ctx.strokeStyle = `rgba(${this.particleColorValues}, ${opacity})`;
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.closePath();
      this.ctx.stroke();
    }
  }

  private renderParticle(particle: Particle): void {
    particle.recalculateLifePeriod(this.screenWidth, this.screenHeight);
    particle.updatePosition(this.screenWidth, this.screenHeight);
    particle.render(this.ctx, this.particleColor);
  }

  private init(): void {
    this.setActualColor();
    setTimeout(() => {
      for (let i = 0; i < config.particleCount; i++) {
        this.particles.push(new Particle(this.screenWidth, this.screenHeight));
      }
    }, 1000);
  }

  private update(): void {
    this.setActualColor();
    this.renderBackground();
    this.particles.forEach((particle1: Particle) => {
      this.renderParticle(particle1);
      this.particles.forEach((particle2: Particle) => {
        this.renderLine(particle1, particle2);
      });
    });
    requestAnimationFrame(this.update.bind(this));
  }
}
