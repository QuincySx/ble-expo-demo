import { Platform } from "react-native";

export function requestMaxMTU() {
  // ios 187,android 247
  return Platform.OS == "ios" ? 187 : 247;
}

export function requestPalyloadMax() {
  // ios 128,android 192
  return Platform.OS == "ios" ? 128 : 192;
}
