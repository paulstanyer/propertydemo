import { observer } from "mobx-react";
import styled from "styled-components";
import { Price } from "../core/components/atoms/price";
import { NavigationButton } from "../core/components/molecules/navigationButton";
import { IPropertyCardViewModel } from "./viewModel";

export const PropertyCard: React.FC<{
  model: IPropertyCardViewModel;
}> = observer(({ model }) => (
  <Card>
    <PropertyThumbnail src={model.thumbnail} />
    <CardContent>
      <CardTitle>{model.cardTitle}</CardTitle>
      <PropertyPrice price={model.price} />
      <NavigationButton to={`/properties/${model.id}`}>
        View this Property &gt;
      </NavigationButton>
      <CardFooter>Last Updated {model.lastUpdatedFormatted}</CardFooter>
    </CardContent>
  </Card>
));

const Card = styled.article`
  grid-column: auto / span 3;
  border: 1px solid darkgray;
`;

const CardContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const CardFooter = styled.small`
  text-align: right;
`;

const CardTitle = styled.h1``;

const PropertyPrice = styled(Price)`
  display: block;
`;

const PropertyThumbnail = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 4/3;
  object-fit: cover;
  object-position: center;
`;
