import { action, makeObservable, observable, runInAction } from "mobx";
import { IPropertyApiClient } from "../core/client/propertyAPIClient";
import { MEDIA_SERVER_BASEURI } from "../core/constants";
import {
  IPropertyBaseViewModel,
  PropertyBaseViewModel,
} from "../core/propertyBaseViewModel";

export class PropertyDetailsViewModel
  extends PropertyBaseViewModel
  implements IPropertyBaseViewModel {
  client: IPropertyApiClient;

  @observable mainImage: string = "";

  constructor(client: IPropertyApiClient) {
    super();
    this.client = client;
    makeObservable(this);
  }

  @action.bound
  async loadDetails(id: string) {
    const { property } = await this.client.getPropertyById(id);

    runInAction(() => {
      this.id = property.id;
      this.address = property.address;
      this.price = property.price;
      this.mainImage = `${MEDIA_SERVER_BASEURI}${property.image}`;
      this.lastUpdated = new Date(property.updatedOn);
    });
  }
}
