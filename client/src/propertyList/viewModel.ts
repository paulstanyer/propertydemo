import { action, computed, observable, runInAction } from "mobx";
import {
  IPropertyApiClient,
  IPropertyDto,
} from "../core/client/propertyAPIClient";
import { MEDIA_SERVER_BASEURI } from "../core/constants";
import {
  InMemoryPaginator,
  IPaginationViewModel,
} from "../core/paginationViewModel";
import {
  IPropertyBaseViewModel,
  PropertyBaseViewModel,
} from "../core/propertyBaseViewModel";

export class PropertyListViewModel {
  client: IPropertyApiClient;

  @observable properties: IPropertyDto[] = [];
  @observable.ref propertyPagination: IPaginationViewModel<IPropertyDto>;

  @computed get propertiesInPage(): IPropertyCardViewModel[] {
    return this.properties
      ? this.properties.map((property) => new PropertyCardViewModel(property))
      : [];
  }

  constructor(client: IPropertyApiClient) {
    this.client = client;
    this.propertyPagination = new InMemoryPaginator(0, 10, 0);
  }

  @action.bound async loadProperties() {
    const propertyList = await this.client.getAllProperties();

    runInAction(() => {
      this.propertyPagination.page = 0;
      this.propertyPagination.totalResults = propertyList.properties.length;
      this.properties = propertyList.properties;
    });
  }
}

export interface IPropertyCardViewModel extends IPropertyBaseViewModel {
  cardTitle: string;
  thumbnail: string;
  lastUpdatedFormatted: string;
}
export class PropertyCardViewModel
  extends PropertyBaseViewModel
  implements IPropertyCardViewModel {
  constructor(property: IPropertyDto) {
    super();
    this.loadFromDto(property);
    this.thumbnail = `${MEDIA_SERVER_BASEURI}${property.thumbnail}`;
  }

  @observable thumbnail = "";

  @computed get lastUpdatedFormatted(): string {
    return this.lastUpdated
      ? this.lastUpdated.toLocaleDateString("en-GB", {})
      : "";
  }

  @computed get cardTitle(): string {
    return this.address.substring(0, this.address.indexOf("\n"));
  }
}
