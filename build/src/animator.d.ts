export default class Animator {
    private interval;
    private multiplier;
    private animating;
    private direction;
    private prevTimestamp;
    private animate;
    accelerate(): number;
    decelerate(): number;
    isPlaying(): boolean;
    isPlayingForward(): boolean;
    isPlayingBackward(): boolean;
    play(): void;
    playForward(): void;
    playBackward(): void;
    stop(): void;
    toggle(): void;
}
