import cx from "classnames";
import React, { Ref } from "react";

import { EditorCalloutIcon } from "../EditorCalloutIcon/EditorCalloutIcon";
import { CalloutType } from "../../types";
import { calloutColors } from "../../constants";

import "./EditorCallout.sass";

export interface EditorCalloutProps {
  type: CalloutType;
  contentDOMRef: Ref<HTMLDivElement>;
}

export const EditorCallout: React.FC<EditorCalloutProps> = ({
  type,
  contentDOMRef
}) => {
  const className = cx("callout", `callout--${type}`);

  return (
    <div className={className} data-callout={type}>
      <div className="callout__icon">
        <EditorCalloutIcon color={calloutColors[type]} type={type} />
      </div>

      <div ref={contentDOMRef} className="callout__content" />
    </div>
  );
};
