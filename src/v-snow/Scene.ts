import { Flake } from "./Flake";
import { SceneConfig } from "./types";
import { _debounce } from "./utils";

const defaultSceneConfig: SceneConfig = {
  color: "#FFFFFF",
  opacity: 1,
  density: 100,
  fall_speed: 2,
  size: 10
};

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
      (this.canvas.width / 200) * this.config.density
    );
    this.densityByWidth = resultDensity;
  }

  private buildScene(): void {
    this.createCanvas();
    this.calcDensityByWidth();
    this.createResizeObserver();
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
    for (let i = 0; i < this.densityByWidth; i++) {
      const flake = new Flake(this.canvas, this.config);
      this.flakes.push(flake);
    }
  }

  start(): void {
    if (!this.initialised) {
      this.buildScene();
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
  }
  public restart(): void {
    this.isRun = true;
    this.animationId = requestAnimationFrame(() => this.updateFrame());
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
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";

    canvas.width = this.container.clientWidth;
    canvas.height = this.container.clientHeight;
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
          this.canvas.width = entry.contentRect.width;
          this.canvas.height = entry.contentRect.height;
        }
      }, 100)
    );

    this.RO.observe(this.container);
  }
}
