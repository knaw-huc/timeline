export declare type Target = Document | Window | HTMLElement;
export declare class EventBus {
    private eventsListeners;
    register(type: string, listener: EventListenerOrEventListenerObject, target?: Target): void;
    flush(): void;
}
declare const _default: EventBus;
export default _default;
