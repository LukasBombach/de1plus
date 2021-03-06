/* /// <reference types="node" />

declare module "@abandonware/noble" {
  namespace Noble {
    export interface Peripheral {
      connect: (callback: (error: Error) => void) => void;
      disconnect: (callback: (error: Error) => void) => void;
      discoverServices: (
        uuids: string[] | null,
        callback: (error: Error, services: Service[]) => void
      ) => void;
      advertisement: Advertisement;
      state: string;
      uuid: string;
    }

    export interface Advertisement {
      localName: string;
    }

    export interface Service {
      discoverCharacteristics: (
        uuids: string[] | null,
        callback: (error: Error, characteristics: Characteristic[]) => void
      ) => void;
    }

    export interface Characteristic {
      uuid: string;
      read: (callback: (error: Error, data: Buffer) => void) => void;
      write: (
        data: Buffer,
        withoutResponse: boolean,
        callback: (error: Error) => void
      ) => void;
      subscribe: (callback: (error: Error) => void) => void;
    }

    export function startScanning(): void;
    export function stopScanning(): void;
    export function on(eventName: string, callback: Function): void;
    export function removeAllListeners(eventName: string): void;
  }

  export default Noble;
}
 */
