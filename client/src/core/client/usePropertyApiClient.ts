import { useState } from "react";
import { IPropertyApiClient, PropertyApiClient } from "./propertyAPIClient";

export function usePropertyApiClient(): IPropertyApiClient {
  const [client] = useState<IPropertyApiClient>(() => new PropertyApiClient());

  return client;
}
