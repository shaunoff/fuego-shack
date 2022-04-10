import React from "react";
import { useMatches } from "remix";
import invariant from "tiny-invariant";

export type BaseRouteHandle = {
  pageTitle: string;
  subtitle?: string;
  Logo: React.ElementType;
};

/** Handles are loosely typed as any. This guard provides compile time type safety */
const isBaseRouteHandle = (handle: unknown): handle is BaseRouteHandle => {
  return (
    !!handle &&
    typeof (handle as BaseRouteHandle).pageTitle === "string" &&
    "Logo" in (handle as BaseRouteHandle)
  );
};

/** using the guard and an invariant we catch any runtime errors and returns a typed handle*/
const useBaseRouteHandle = () => {
  const matches = useMatches();

  /** Base routes currently have an id the format 'routes/__index/[baseRoute]/...'
   *  This finds the active current active base route
   */
  const activeBaseRoute = matches.find(
    (route) => route.id.split("/").length >= 3
  );
  invariant(activeBaseRoute, "No Base Route found");

  invariant(
    isBaseRouteHandle(activeBaseRoute.handle),
    "No Base Route handle found. Base page route needs a pageTitle"
  );

  return activeBaseRoute.handle;
};

export default useBaseRouteHandle;
