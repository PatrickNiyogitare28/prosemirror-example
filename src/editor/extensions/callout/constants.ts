import { CalloutType } from "./types";

/**
 * A list of all callout types
 */
export const calloutTypes: CalloutType[] = [
  CalloutType.info,
  CalloutType.success,
  CalloutType.warning
];

export const calloutTitles: Record<CalloutType, string> = {
  [CalloutType.info]: "Info",
  [CalloutType.success]: "Success",
  [CalloutType.warning]: "Warning"
};

export const calloutColors: Record<CalloutType, string> = {
  [CalloutType.info]: "#3a86ff",
  [CalloutType.success]: "#3EAC40",
  [CalloutType.warning]: "#FFB938"
};

export const removeCalloutTitle = "Delete";
export const removeCalloutColor = "#ff5757";
