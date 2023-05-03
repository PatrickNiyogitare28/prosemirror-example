import React, { ReactText, useContext, useReducer } from "react";

type State = { [key: string]: any };
type ProseMirrorProviderProps = React.FC<{ providers: { [key: string]: any } }>;
interface ProseMirrorContextValue {
  createPortal: (portal: any) => void;
  state: Partial<State>;
  providers: { [key: string]: any };
}

const reducer = (
  state: State,
  action: { type: "createPortal"; key: ReactText; portal: any }
) => {
  switch (action.type) {
    case "createPortal":
      return { ...state, [action.key]: { portal: action.portal } };
    default:
      return state;
  }
};

const ProseMirrorContext = React.createContext<ProseMirrorContextValue>({
  createPortal: () => {},
  state: {},
  providers: {}
});

export const ProseMirrorProvider: ProseMirrorProviderProps = ({
  providers,
  children
}) => {
  const [data, dispatch] = useReducer(reducer, {});

  return (
    <ProseMirrorContext.Provider
      value={{
        createPortal: (portal: any) =>
          dispatch({ type: "createPortal", key: portal.key!, portal }),
        state: data,
        providers
      }}
    >
      {children}
      {Object.values(data).map((obj) => obj.portal)}
    </ProseMirrorContext.Provider>
  );
};

export const useProseMirrorContext = () => useContext(ProseMirrorContext);
