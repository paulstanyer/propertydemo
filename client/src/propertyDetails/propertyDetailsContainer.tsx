import { useCallback, useState } from "react";
import { Async } from "react-async";
import { useParams } from "react-router";
import { PropertyDetailsViewModel } from "./viewModel";
import { PropertyDetails } from "./propertyDetails";
import { usePropertyApiClient } from "../core/client/usePropertyApiClient";

export const PropertyDetailsContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const model = usePropertyDetailViewModel();

  const loadPropertyDetails = useCallback(() => {
    return model.loadDetails(id);
  }, [model, id]);

  return (
    <Async promiseFn={loadPropertyDetails}>
      <Async.Loading></Async.Loading>
      <Async.Resolved>{<PropertyDetails model={model} />}</Async.Resolved>
    </Async>
  );
};

export function usePropertyDetailViewModel(): PropertyDetailsViewModel {
  const client = usePropertyApiClient();
  const [model] = useState(() => new PropertyDetailsViewModel(client));

  return model;
}
