import { observer } from "mobx-react";
import React, { useCallback, useState } from "react";
import { Async } from "react-async";
import { usePropertyApiClient } from "../core/client/usePropertyApiClient";
import { GridCell, GridWrapper } from "../core/components/atoms/grid";
import { PropertyCard } from "./propertyCard";
import { PropertyListViewModel } from "./viewModel";

export const PropertyListContainer = () => {
  const model = usePropertyListViewModel();
  console.log(typeof model);
  const loadProperties = useCallback(() => {
    return model.loadProperties();
  }, [model]);

  return (
    <Async promiseFn={loadProperties}>
      <Async.Loading>Loading Property List...</Async.Loading>
      <Async.Resolved>
        <PropertyList model={model} />
      </Async.Resolved>
      <Async.Rejected>
        {(err) => (
          <>
            <h1>Error!</h1>
            <p>{err.message}</p>
          </>
        )}
      </Async.Rejected>
    </Async>
  );
};

export const PropertyList: React.FC<{
  model: PropertyListViewModel;
}> = observer(({ model }) => {
  const { propertiesInPage, propertyPagination } = model;

  return (
    <section>
      <h1>Properties:</h1>
      <GridWrapper>
        {propertiesInPage.map((propertyModel) => (
          <GridCell cols="4">
            <PropertyCard key={propertyModel.id} model={propertyModel} />
          </GridCell>
        ))}
      </GridWrapper>

      <footer>
        Showing page {propertyPagination.page}. Total properties:{" "}
        {propertyPagination.totalResults}
      </footer>
    </section>
  );
});

function usePropertyListViewModel(): PropertyListViewModel {
  const client = usePropertyApiClient();
  const [model] = useState(() => new PropertyListViewModel(client));

  return model;
}
