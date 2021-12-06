export interface SceneConfig {
    fall_speed: number;
    density: number;
    size: number;
    color: string;
    images?: string[];
    opacity: number;
    zIndex?: string;
    show?: boolean;
}
export declare enum FlakeEdgePosition {
    TOP_BOUNDARY = 0,
    BOTTOM_BOUNDARY = 1,
    LEFT_BOUNDARY = 2,
    RIGHT_BOUNDARY = 3
}
