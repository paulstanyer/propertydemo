import { observer } from "mobx-react";
import styled from "styled-components";
import { GridCell, GridWrapper } from "../core/components/atoms/grid";
import { Price } from "../core/components/atoms/price";
import { NavigationButton } from "../core/components/molecules/navigationButton";
import { PropertyDetailsViewModel } from "./viewModel";

export const PropertyDetails: React.FC<{
  model: PropertyDetailsViewModel;
}> = observer(({ model }) => (
  <>
    <NavigationButton to={`/properties`}>Back to list</NavigationButton>
    <GridWrapper>
      <GridCell cols="6">
        <PropertyImage src={model.mainImage} />
      </GridCell>
      <GridCell cols="6">
        Address:
        <pre>{model.address}</pre>
        Price:
        <Price price={model.price || 0} />
      </GridCell>
    </GridWrapper>
  </>
));

const PropertyImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 4/3;
  object-fit: cover;
`;
