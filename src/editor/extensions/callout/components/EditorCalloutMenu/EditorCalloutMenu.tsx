import React, { useCallback } from "react";
import { MdCancel } from "react-icons/md";

import {
  calloutColors,
  calloutTitles,
  calloutTypes,
  removeCalloutColor,
  removeCalloutTitle
} from "../../constants";
import { CalloutType } from "../../types";
import { EditorCalloutIcon } from "../EditorCalloutIcon/EditorCalloutIcon";

import "./EditorCalloutMenu.sass";

export interface EditorCalloutMenuProps {
  type: CalloutType;
  onTypeChange(newType: CalloutType): void;
  onRemove(): void;
}

export const EditorCalloutMenu: React.FC<EditorCalloutMenuProps> = ({
  onTypeChange,
  onRemove
}) => {
  const handleTypeChange = useCallback(
    (calloutType: CalloutType) => () => {
      onTypeChange(calloutType);
    },
    [onTypeChange]
  );

  const handleRemove = useCallback(() => {
    onRemove();
  }, [onRemove]);

  return (
    <div className="callout__menu">
      {calloutTypes.map((calloutType) => (
        <EditorCalloutIcon
          key={calloutType}
          type={calloutType}
          color={calloutColors[calloutType]}
          title={calloutTitles[calloutType]}
          onClick={handleTypeChange(calloutType)}
        />
      ))}
      <span>|</span>
      <MdCancel
        color={removeCalloutColor}
        title={removeCalloutTitle}
        onClick={handleRemove}
      />
    </div>
  );
};
