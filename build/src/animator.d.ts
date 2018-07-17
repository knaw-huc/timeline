export declare type Multiplier = .25 | .5 | 1 | 2 | 4 | 8 | 16;
export default class Animator {
    private readonly elapsedTimeThreshold;
    private readonly interval;
    readonly multipliers: Multiplier[];
    private multiplier;
    private direction;
    private prevTimestamp;
    private elapsedTimeTotal;
    private animate;
    private resetElapsedTimeTotal();
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
