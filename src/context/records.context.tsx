import React, { useState, createContext, ReactNode, useContext } from "react";

export enum EventType {
  ENTRY = "entry",
  EXIT = "exit",
}

export type RecordType = {
  id: number; 
  plate_number: string; 
  event_type:  EventType; 
  event_time: string; 
  metadata: Record<string, unknown>; 
};

export type StateType = {
  event_type: EventType | undefined;
  plate_number: string;
  event_time_start:string | undefined;
  event_time_end:string | undefined;
};

const initialState: StateType = {
  event_type: undefined,
  plate_number: "",
  event_time_start: undefined,
  event_time_end:undefined,
};

type RecordContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
  initialState: StateType;
  reset: () => void; 
};

const RecordContext = createContext<RecordContextType | undefined>(undefined);

const RecordProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<StateType>(initialState);

  const reset = () => {
    setState(initialState);
  };

  return (
    <RecordContext.Provider value={{ state, setState, initialState, reset }}>
      {children}
    </RecordContext.Provider>
  );
};

const useRecordContext = () => {
  const context = useContext(RecordContext);
  if (!context) {
    throw new Error("useRecordContext must be used within a RecordProvider");
  }
  return context;
};

export { RecordProvider, useRecordContext };