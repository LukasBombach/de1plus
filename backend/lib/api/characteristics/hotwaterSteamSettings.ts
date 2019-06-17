import parse, { BinaryDesc } from "../parse";

// prettier-ignore
export const binaryDesc: BinaryDesc[] = [
  { name: "steamSettings", type: "char" },
  { name: "targetSteamTemp", type: "char" },
  { name: "targetSteamLength", type: "char" },
  { name: "targetHotWaterTemp", type: "char" },
  { name: "targetHotWaterVol", type: "char" },
  { name: "targetHotWaterLength", type: "char" },
  { name: "targetEspressoVol", type: "char" },
  { name: "targetGroupTemp", type: "short", process: v => v / 256 }
];

export default (buffer: Buffer) => {
  return parse(buffer, binaryDesc);
};
