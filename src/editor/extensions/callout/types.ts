export enum CalloutType {
  info = "info",
  success = "success",
  warning = "warning"
}

export interface CalloutNodeAttrs {
  type: CalloutType;
}
