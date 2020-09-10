export const config = {
  particleRadius: 2,
  particleCount: 45,
  particlesMaxVelocity: 0.2,
  particleLifePeriod: 15,
  lineLength: 120
};

export class Particle {
  posX: number;
  posY: number;
  velX: number;
  velY: number;
  lifePeriod: number;

  constructor(screenWidth: number, screenHeight: number) {
    this.posX = Math.random() * screenWidth;
    this.posY = Math.random() * screenHeight;
    this.velX = Math.random() * (config.particlesMaxVelocity * 2) - config.particlesMaxVelocity;
    this.velY = Math.random() * (config.particlesMaxVelocity * 2) - config.particlesMaxVelocity;
    this.lifePeriod = Math.random() * config.particleLifePeriod * 60;
  }

  updatePosition(screenWidth: number, screenHeight: number): void {
    if (this.posX + this.velX > screenWidth && this.velX > 0 || this.posX + this.velX < 0 && this.velX < 0) {
      this.velX *= -1;
    }

    if (this.posY + this.velY > screenHeight && this.velY > 0 || this.posY + this.velY < 0 && this.velY < 0) {
      this.velY *= -1;
    }

    this.posX += this.velX;
    this.posY += this.velY;
  }

  recalculateLifePeriod(screenWidth: number, screenHeight: number): void {
    if (this.lifePeriod < 1) {
      this.posX = Math.random() * screenWidth;
      this.posY = Math.random() * screenHeight;
      this.velX = Math.random() * (config.particlesMaxVelocity * 2) - config.particlesMaxVelocity;
      this.velY = Math.random() * (config.particlesMaxVelocity * 2) - config.particlesMaxVelocity;
      this.lifePeriod = Math.random() * config.particleLifePeriod * 60;
    }

    this.lifePeriod--;
  }

  render(ctx: CanvasRenderingContext2D, particleColor: string): void {
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, config.particleRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = particleColor;
    ctx.fill();
  }
}
