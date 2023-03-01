import styled from "styled-components";

export const ButtonIconContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  --size: 50px;
  min-height: var(--size);
  min-width: var(--size);
  max-width: var(--size);
  max-height: var(--size);
  aspect-ratio: 1/1;

  border-radius: 50%;
  border: 1px solid #dedede;

  background-color: white;

  span {
    color: green;
  }
`;
