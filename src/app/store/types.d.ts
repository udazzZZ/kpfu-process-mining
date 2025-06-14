type Dispatch = import(".").AppDispatch;
type State = import(".").RootState;

declare type AppDispatch = Dispatch;
declare type RootState = State;
declare type AppGetState = () => State;
