export declare type Target = Document | Window | HTMLElement;
export declare class EventBus {
    private eventsListeners;
    register(type: any, listener: any, target?: Target): void;
    flush(): void;
}
declare const _default: EventBus;
export default _default;
