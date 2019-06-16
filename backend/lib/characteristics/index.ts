import { Peripheral, Characteristic } from "@abandonware/noble";
import { mapValues } from "lodash";
import * as nobleAsPromised from "../noble-as-promised";
import state from "./parsers/state";

const SERVICE_UUID = "a000";

interface Specs {
  state: Spec;
}

interface Spec {
  uuid: string;
  parse: (buffer: Buffer) => ParsedValue;
  properties: Properties;
}

interface Properties {
  read: boolean;
  write: boolean;
  notify: boolean;
}
export interface ParsedValue {
  [name: string]: any;
}

export interface CharacteristicApi {
  read?: () => Promise<ParsedValue>;
  write?: (data: Buffer) => Promise<void>;
  subscribe?: (callback: (value: ParsedValue) => void) => void;
}

const specs: Specs = {
  state: {
    uuid: "a002",
    parse: state,
    properties: { read: true, write: true, notify: true }
  }
};

export default async function getCharacteristics(peripheral: Peripheral) {
  const service = await nobleAsPromised.getService(peripheral, [SERVICE_UUID]);
  const characteristics = await nobleAsPromised.getCharacteristics(service);
  return {
    state: apiFromSpec(specs.state, characteristics)
  };
}

function apiFromSpec(
  spec: Spec,
  characteristics: Characteristic[]
): CharacteristicApi {
  const characteristic = characteristics.find(({ uuid }) => uuid === spec.uuid);
  const read = readApi(spec, characteristic);
  const write = writeApi(spec, characteristic);
  const subscribe = subscribeApi(spec, characteristic);
  return { read, write, subscribe };
}

function readApi(
  { properties, parse }: Spec,
  characteristic: Characteristic
): () => Promise<ParsedValue> {
  return !properties.read
    ? undefined
    : async () =>
        parse(await nobleAsPromised.readCharacteristic(characteristic));
}

function writeApi(
  { properties }: Spec,
  characteristic: Characteristic
): (data: Buffer) => Promise<void> {
  return !properties.write
    ? undefined
    : nobleAsPromised.writeCharacteristic(characteristic);
}

function subscribeApi(spec: Spec, characteristic: Characteristic) {
  return () => {
    throw new Error("Not implemented yet");
  };
}
