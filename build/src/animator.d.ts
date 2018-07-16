export declare type Multiplier = .25 | .5 | 1 | 2 | 4 | 8 | 16;
export default class Animator {
    private interval;
    private multiplier;
    private animating;
    private direction;
    private prevTimestamp;
    multipliers: Multiplier[];
    private animate;
    accelerate(): number;
    decelerate(): number;
    speed(multiplier: string): void;
    isPlaying(): boolean;
    isPlayingForward(): boolean;
    isPlayingBackward(): boolean;
    play(): void;
    playForward(): void;
    playBackward(): void;
    stop(): void;
    toggle(): void;
}
