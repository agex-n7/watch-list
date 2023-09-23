import { Router as Wouter } from "wouter";
import {
  useLocationProperty,
  navigate,
  BaseLocationHook
} from "wouter/use-location";
import * as React from "react";

const hashLocation = () => window.location.hash.replace(/^#/, "") || "/";

const hashNavigate = (to: string) => navigate("#" + to);

const useHashLocation: BaseLocationHook = () => {
  const location = useLocationProperty(hashLocation);
  return [location, hashNavigate];
};

export const Router = React.memo(function Router(props: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element {
  return <Wouter hook={useHashLocation}> {props.children}</Wouter>;
});
