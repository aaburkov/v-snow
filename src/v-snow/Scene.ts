import { Flake } from "./Flake";
import { SceneConfig } from "./types";
import { _debounce } from "./utils";

const defaultSceneConfig: SceneConfig = {
  color: "#FFFFFF",
  opacity: 1,
  density: 50,
  fall_speed: 2,
  size: 20,
  zIndex: "999",
  show: true
};
const PIXEL_RATIO = 2;

export default class Scene {
  private config: SceneConfig;
  private container: HTMLElement;
  private densityByWidth: number;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private initialised: boolean;
  private flakes: Flake[];
  private isRun: boolean;
  private animationId: number;
  private RO: ResizeObserver;

  constructor(
    container: string | HTMLElement = "body",
    config?: Partial<SceneConfig>
  ) {
    this.initContainer(container);
    this.config = { ...defaultSceneConfig, ...config };
    this.checkConfig(this.config);
    this.buildScene();
  }
  private initContainer(container: string | HTMLElement = "body") {
    const containerEl =
      typeof container === "string"
        ? document.querySelector<HTMLElement>(container)
        : container;
    if (containerEl) {
      this.container = containerEl;
      if (
        !["absolute", "fixed", "relative", "sticky"].includes(
          window
            .getComputedStyle(this.container, null)
            .getPropertyValue("position")
        )
      ) {
        this.container.style.position = "relative";
      }
    } else {
      throw new Error(
        `Container can not be find ${
          typeof container === "string" ? "by string " + container : ""
        }`
      );
    }
  }
  public updateConfig(config: Partial<SceneConfig>) {
    this.destroyScene();
    this.config = { ...this.config, ...config };
    this.checkConfig(this.config);
    this.buildScene();
    this.start();
  }
  private checkConfig(config: SceneConfig) {
    if (config.density > 100 || config.density < 1) {
      throw new Error(
        `Density parameter must be between 1 and 100. Passed ${config.density}`
      );
    }
    if (config.fall_speed > 5 || config.fall_speed < 1) {
      throw new Error(
        `Speed parameter must be between 1 and 5. . Passed ${config.fall_speed}`
      );
    }
  }

  private calcDensityByWidth() {
    const resultDensity = Math.round(
      (this.canvas.width / (200 * PIXEL_RATIO)) * this.config.density
    );
    this.densityByWidth = resultDensity;
  }

  private buildScene(): void {
    this.createCanvas();
    this.calcDensityByWidth();
    this.createResizeObserver();
    this.checkImages();
    this.generateFlakes();
    this.initialised = true;
  }

  private destroyScene(): void {
    this.canvas?.remove();
    this.initialised = false;
  }

  private generateFlakes(): void {
    // generate flakes
    this.flakes = [];
    let iteration = 0;

    const interval = setInterval(() => {
      if (iteration === 3) clearInterval(interval);
      for (let i = 0; i < this.densityByWidth / 3; i++) {
        const flake = new Flake(this.canvas, this.config);
        this.flakes.push(flake);
      }
      iteration++;
    }, 1500);
  }

  private async loadImage(path: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = path;
      img.onload = () => resolve(img);
      img.onerror = () => {
        const msg = `Can't load image ${path}. I remove it from the list of images`;
        console.warn(msg);
        reject(new Error(msg));
      };
    });
  }

  private async checkImages(): Promise<void> {
    const images = this.config.images;
    if (!images || images.length == 0) return;

    const badImage: string[] = [];
    for (const imgPath of images) {
      try {
        await this.loadImage(imgPath);
      } catch (error) {
        badImage.push(imgPath);
      }
    }
    if (badImage.length > 0) {
      this.config.images = images.filter(img => !badImage.includes(img));
    }
  }

  start(): void {
    if (!this.initialised) {
      this.buildScene();
    }
    if (!this.config.show) {
      this.stop();
      return;
    }
    this.isRun = true;
    this.flakes.forEach(flake => {
      flake.draw();
    });
    if (!this.animationId) {
      this.animationId = requestAnimationFrame(() => this.updateFrame());
    }
  }
  public stop(): void {
    this.isRun = false;
    this.animationId = 0;
  }

  private updateFrame(): void {
    if (!this.canvas || !this.ctx) {
      return;
    }
    if (!this.isRun) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.flakes.forEach(flake => {
      flake.draw();
    });
    if (!this.isRun) {
      this.animationId = 0;
      this.destroyScene();
    } else {
      this.animationId = requestAnimationFrame(() => this.updateFrame());
    }
  }

  private createCanvas(): void {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.id = `v-snow_canvas_${new Date().getTime()}`;
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = this.config.zIndex || "999";
    canvas.style.width = this.container.clientWidth + "px";
    canvas.style.height = this.container.clientHeight + "px";
    canvas.width = this.container.clientWidth * PIXEL_RATIO;
    canvas.height = this.container.clientHeight * PIXEL_RATIO;

    this.canvas = canvas;
    this.container.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (ctx) {
      this.ctx = ctx;
    } else {
      throw new Error(
        "Canvas 2D context not found, please check it is running in Browser environment."
      );
    }
  }

  private createResizeObserver(): void {
    this.RO = new ResizeObserver(
      _debounce((entries: ResizeObserverEntry[]) => {
        for (let entry of entries) {
          this.canvas.width = entry.target.clientWidth * PIXEL_RATIO;
          this.canvas.height = entry.target.clientHeight * PIXEL_RATIO;
          this.canvas.style.width = entry.target.clientWidth + "px";
          this.canvas.style.height = entry.target.clientHeight + "px";
        }
      }, 100)
    );

    this.RO.observe(this.container);
  }
}
