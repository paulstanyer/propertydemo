import styled from "styled-components";

export const GridWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: 32px;
  row-gap: 48px;
`;

export const GridCell = styled.div<{
  start?: string;
  cols?: string;
  end?: string;
}>`
  grid-column: ${({ start = "auto", cols, end = "auto" }) =>
    `${start} / ${cols ? `span ${cols}` : `${end || "auto"}`}`};
`;
