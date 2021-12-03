import { SceneConfig } from "./types";
export default class Scene {
    private config;
    private container;
    private densityByWidth;
    private canvas;
    private ctx;
    private initialised;
    private flakes;
    private isRun;
    private animationId;
    private RO;
    constructor(container?: string | HTMLElement, config?: Partial<SceneConfig>);
    private initContainer;
    updateConfig(config: Partial<SceneConfig>): void;
    private checkConfig;
    private calcDensityByWidth;
    private buildScene;
    private destroyScene;
    private generateFlakes;
    start(): void;
    stop(): void;
    restart(): void;
    private updateFrame;
    private createCanvas;
    private createResizeObserver;
}