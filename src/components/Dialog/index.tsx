/* ---------- External ---------- */
import { forwardRef } from "react";

/* ---------- Styles ---------- */
import { DialogContainer } from "./styles";

/* ---------- Interfaces ---------- */
interface DialogProps {
  title: string;
  content: string;
  buttons: { text: string; onClick: () => void }[];
}

interface Coordinates {
  x: number;
  y: number;
}

interface Props extends DialogProps {
  position: Coordinates;
  offset?: Coordinates;
}

export const Dialog = forwardRef<HTMLDivElement, Props>(
  ({ title, content, buttons, position, offset }, ref) => (
    <DialogContainer
      ref={ref}
      p={position}
      o={offset}
      onClick={(e) => e.stopPropagation()}
    >
      <h4>{title}</h4>

      <p>{content}</p>

      <footer>
        {buttons.map(({ text, onClick }) => (
          <button onClick={onClick} key={text}>
            {text}
          </button>
        ))}
      </footer>
    </DialogContainer>
  )
);
