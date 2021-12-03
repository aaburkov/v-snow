import { SceneConfig } from "./types";
export declare class Flake {
    private config;
    private canvas;
    private ctx;
    private x;
    private y;
    private xs;
    private ys;
    private size;
    private position;
    private image;
    constructor(canvas: HTMLCanvasElement, config: SceneConfig);
    draw(): void;
    private checkPosition;
    arrange(): void;
}
