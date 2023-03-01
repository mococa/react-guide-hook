import styled from "styled-components";

interface Coordinates {
  x: number;
  y: number;
}

interface DialogContainerProps {
  p: Coordinates; // Position
  o?: Coordinates; // Offset
}

export const DialogContainer = styled.div<DialogContainerProps>`
  display: flex;
  flex-flow: column;
  gap: 4px;

  padding: 4px;

  position: absolute;
  top: ${({ p, o }) => p.y + (o?.y || 0)}px;
  left: ${({ p, o }) => p.x + (o?.x || 0)}px;

  background-color: white;

  color: #222222;

  border-radius: 4px;

  h4 {
    text-align: start;

    margin-bottom: 0;
  }

  p {
    margin: 0;

    white-space: pre-line;
    text-align: start;
  }

  footer {
    display: flex;
    gap: 4px;
  }
`;
