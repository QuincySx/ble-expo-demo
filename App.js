import React from "react";
import { LogBox } from "react-native";
import AppNav from "./src/components/nav/App";
import * as ErrorRecovery from "expo-error-recovery";
import { Provider } from "mobx-react";
import stores from "./src/stores";

LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews",
]);

const defaultErrorHandler = ErrorUtils.getGlobalHandler();

const globalErrorHandler = (err, isFatal) => {
  console.log("globalErrorHandler called!");
  ErrorRecovery.setRecoveryProps({ info: err });
  defaultErrorHandler(err, isFatal);
};

ErrorUtils.setGlobalHandler(globalErrorHandler);

const App = () => {
  return <AppNav />;
};

export default App;
