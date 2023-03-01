/* ---------- External ---------- */
import React, { PropsWithChildren } from "react";

/* ---------- Styles ---------- */
import { ButtonIconContainer } from "./styles";

/* ---------- Interfaces ---------- */
interface Props extends PropsWithChildren {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const IconButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ onClick, children }, ref) => {
    return (
      <ButtonIconContainer onClick={onClick} ref={ref}>
        <span>{children}</span>
      </ButtonIconContainer>
    );
  }
);
