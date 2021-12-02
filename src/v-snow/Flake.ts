import { FlakeEdgePosition, SceneConfig } from "./types";

export class Flake {
  private config: SceneConfig;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private xs: number;
  private ys: number;
  private size: number;
  private position: FlakeEdgePosition;
  private image: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement, config: SceneConfig) {
    this.canvas = canvas;
    this.config = config;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      this.ctx = ctx;
    } else {
      throw new Error(
        "Canvas 2D context not found, please check it is running in Browser environment."
      );
    }

    this.arrange();
  }

  draw() {
    this.checkPosition();
    if (
      this.position === FlakeEdgePosition.BOTTOM_BOUNDARY ||
      this.position === FlakeEdgePosition.RIGHT_BOUNDARY ||
      this.position === FlakeEdgePosition.LEFT_BOUNDARY
    ) {
      this.arrange();
      return;
    }

    if (this.y > -this.size) {
      this.x += this.xs;
    }
    this.y += this.ys;

    if (!this.image) {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2, false);
      this.ctx.closePath();
      this.ctx.fillStyle = this.config.color;
      this.ctx.globalAlpha = this.config.opacity;
      this.ctx.fill();
    } else {
      try {
        this.ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        this.ctx.globalAlpha = this.config.opacity;
      } catch (error) {}
    }
  }

  private checkPosition() {
    if (this.y < -this.size) this.position = FlakeEdgePosition.TOP_BOUNDARY;
    if (this.y > this.canvas.height + this.size)
      this.position = FlakeEdgePosition.BOTTOM_BOUNDARY;
    if (this.x < -this.size) this.position = FlakeEdgePosition.RIGHT_BOUNDARY;
    if (this.x > this.canvas.width + this.size)
      this.position = FlakeEdgePosition.RIGHT_BOUNDARY;
  }
  arrange() {
    this.x = Math.random() * this.canvas.width;
    if (Math.random() < 0.05) {
      this.y = (0.5 + Math.random()) * -150;
    } else {
      this.y = Math.random() * -this.canvas.height - 300;
    }

    this.xs = 0.5 - Math.random();
    this.ys = (0.5 + Math.random()) * this.config.fall_speed;
    this.size = (0.5 + Math.random()) * this.config.size;

    if (this.config.images) {
      const imgCount = this.config.images.length;
      const img = new Image();
      img.src = this.config.images[Math.floor(Math.random() * imgCount)];
      img.onload = () => {
        this.image = img;
      };
    }
  }
}
