/// <reference types="node" />
export declare class WebsocketHeartBeat {
    instance: WebSocket | null;
    heartBeat: Worker;
    heartBeatFn: Function;
    heartBeatContent: string;
    heartBeatInterval: number;
    pongTimeout: number;
    pongTimeoutId: NodeJS.Timeout;
    reconnectTimeout: number;
    reconnectTimeoutId: NodeJS.Timeout;
    reconnectLimit: number;
    reconnectCount: number;
    dontReconnect: boolean;
    networkError: boolean;
    openError: boolean;
    url: string;
    config: {
        open?: any;
        message?: any;
        error?: any;
        close?: any;
        beforeunload?: any;
        heartBeat?: any;
        reconnect?: any;
        key?: any;
    };
    protocols: any[];
    logkey: any;
    onbeforeunload: any;
    constructor(url: any, config?: {}, protocols?: any[]);
    init(url?: string, config?: {
        open?: any;
        message?: any;
        error?: any;
        close?: any;
        beforeunload?: any;
        heartBeat?: any;
        reconnect?: any;
        key?: any;
    }, protocols?: any[]): void;
    startHeartBeat(): void;
    stopHeartBeat(): void;
    reconnect(): void;
    tReconnect: {
        (...args: any[]): any;
        cancel: () => void;
        flush: () => any;
        pending: () => boolean;
    };
    stopReconnect(): void;
    kill(): void;
    reInit(url?: any): void;
    checkNetwork(): void;
    print(...args: any[]): void;
}
