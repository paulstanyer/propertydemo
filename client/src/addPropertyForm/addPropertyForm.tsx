import { observer } from "mobx-react";
import React from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import { Button } from "../core/components/atoms/button";
import { GridCell, GridWrapper } from "../core/components/atoms/grid";

import {
  AddEditPropertyViewModel,
  usePropertyFormViewModel,
} from "./viewModel";

export const AddPropertyFormContainer: React.FC = () => {
  const model = usePropertyFormViewModel();

  return <AddPropertyForm model={model} />;
};

export const AddPropertyForm: React.FC<{
  model: AddEditPropertyViewModel;
}> = observer(({ model }) => {
  return (
    <>
      <h1>Add a property</h1>

      <GridWrapper>
        <GridCell cols="6">
          <label>Image:</label>
          <Dropzone
            maxFiles={1}
            accept={["image/jpeg", "image/png"]}
            onDrop={(acceptedFiles) => {
              console.log(acceptedFiles);
              model.setFile(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <DropzoneStyled>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </DropzoneStyled>
            )}
          </Dropzone>
        </GridCell>
        <GridCell cols="6">
          <FormRow>
            <label>Address:</label>
            <AddressEntryField
              onChange={(e) => {
                model.address = e.currentTarget.value;
              }}
              value={model.address}
            ></AddressEntryField>
          </FormRow>
          <FormRow>
            <label htmlFor="priceInput">Price: </label>
            <input
              id="priceInput"
              type="text"
              onChange={(e) => {
                model.setPrice(e.currentTarget.value);
              }}
              value={model.price}
            />

            <ErrorMessage>{model.priceValidationError}</ErrorMessage>
          </FormRow>
          <Button onClick={() => model.saveProperty()}>Save</Button>
        </GridCell>
      </GridWrapper>
    </>
  );
});

const FormRow = styled.div`
  margin-bottom: 32px;

  & > label {
    display: block;
  }
`;

const ErrorMessage = styled.small`
  display: block;
  color: red;
`;

const AddressEntryField = styled.textarea`
  width: 100%;
  height: 8em;
`;

const DropzoneStyled = styled.section`
  border: 1px solid darkgray;
  & > div {
    aspect-ratio: 4/3;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
