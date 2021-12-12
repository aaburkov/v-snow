import { SceneConfig } from "./types";
export default class Scene {
    private config;
    private container;
    private densityByWidth;
    private canvas;
    private ctx;
    private initialised;
    private flakes;
    private flakesGeneratorTimeout;
    private isRun;
    private animationId;
    private RO;
    constructor(container?: string | HTMLElement, config?: Partial<SceneConfig>);
    private initContainer;
    updateConfig(config: Partial<SceneConfig>): void;
    private checkConfig;
    private calcDensityByWidth;
    private buildScene;
    destroyScene(): void;
    private generateFlakes;
    private loadImage;
    private checkImages;
    start(): void;
    stop(): void;
    private updateFrame;
    private createCanvas;
    private createResizeObserver;
}
