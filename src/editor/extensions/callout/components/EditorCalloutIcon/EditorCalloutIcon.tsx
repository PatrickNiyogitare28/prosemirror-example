import React from "react";
import { MdInfo, MdCheckCircle, MdWarningAmber } from "react-icons/md";

import { CalloutType } from "../../types";

export interface EditorCalloutIconProps {
  type: CalloutType;
}

export const EditorCalloutIcon: React.FC<EditorCalloutIconProps> = ({
  type,
  ...props
}) => {
  return (
    <>
      {type === CalloutType.info && <MdInfo {...props} />}
      {type === CalloutType.success && <MdCheckCircle {...props} />}
      {type === CalloutType.warning && <MdWarningAmber {...props} />}
    </>
  );
};
