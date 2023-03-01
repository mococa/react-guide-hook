/* ---------- External ---------- */
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useScrollLock } from "@mantine/hooks";
import styled from "styled-components";

/* ---------- Components ---------- */
import { Dialog } from "../components/Dialog";

/* ---------- Interfaces ---------- */
interface DialogProps {
  title: string;
  content: string;
  buttons: { text: string; onClick: () => void }[];
  offset?: {
    x: number;
    y: number;
  };
  onBackdropClick?: () => void;
  closeOnBackdropClick?: boolean;
}

interface ClippyProps {
  handleExplain: (ref: React.RefObject<HTMLElement>, d: DialogProps) => void;
  clearExplanation: () => void;
}

const ClippyContext = createContext<ClippyProps>({} as ClippyProps);

export const ClippyProvider = ({ children }: React.PropsWithChildren) => {
  /* ---------- Refs ---------- */
  const backdrop_ref = useRef<HTMLDivElement>(null);
  const dialog_ref = useRef<HTMLDivElement>(null);

  /* ---------- Hooks ---------- */
  const [scroll_locked, setScrollLocked] = useScrollLock();

  /* ---------- States ---------- */
  const [dialog, setDialog] = useState<DialogProps | null>(null);
  const [node_rect, setNodeRect] = useState<DOMRect | null>(null);
  const [clone, setClone] = useState<React.ReactElement | null>(null);

  /* ---------- Callbacks ---------- */
  const handleExplain = useCallback(
    async (
      ref: React.RefObject<HTMLElement>,
      {
        offset = { x: 120, y: -25 },
        closeOnBackdropClick = true,
        ...dialog_props
      }: DialogProps
    ) => {
        setScrollLocked(true);

      setDialog(null);
      setNodeRect(null);

      if (!ref.current) return;

      const ref_element = ref.current;
      const coordinates = ref_element.getBoundingClientRect();

      setDialog({ ...dialog_props, offset, closeOnBackdropClick });
      setNodeRect(coordinates);

      const { className } = ref_element;

      const style = {
        position: "absolute",
        left: `${coordinates.left}px`,
        top: `${coordinates.top}px`,

        width: `${coordinates.width}px`,
        height: `${coordinates.height}px`,
      };

      const react_clone_element = React.createElement(
        ref_element.tagName.toLocaleLowerCase(),
        { style, className },
        Array.from(ref_element.children).map((child, key) =>
          React.createElement(
            child.tagName.toLocaleLowerCase(),
            { key },
            ref_element.textContent
          )
        )
      );

      setClone(react_clone_element);
    },
    []
  );

  const clearExplanation = useCallback(() => {
    if (!backdrop_ref.current) return;

    backdrop_ref.current.replaceChildren();

    setDialog(null);
    setNodeRect(null);

    setScrollLocked(false);
  }, []);

  /* ---------- Memos ---------- */
  const value = useMemo(
    () => ({
      handleExplain,
      clearExplanation,
    }),
    [handleExplain, clearExplanation]
  );

  return (
    <ClippyContext.Provider value={value}>
      {children}

      {Boolean(dialog) && (
        <Backdrop
          ref={backdrop_ref}
          onClick={() => {
            if (dialog?.onBackdropClick) dialog.onBackdropClick();

            if (dialog?.closeOnBackdropClick) {
              setDialog(null);
              setScrollLocked(false);
            }
          }}
        >
          {dialog && (
            <>
              <Dialog
                ref={dialog_ref}
                {...dialog}
                position={{ x: node_rect?.left || 0, y: node_rect?.top || 0 }}
              />

              {clone}
            </>
          )}
        </Backdrop>
      )}
    </ClippyContext.Provider>
  );
};

/* ---------- Styled Components ---------- */
const Backdrop = styled.div`
  background: rgba(0, 0, 0, 0.3);

  height: 100vh;
  width: 100vw;

  position: fixed;
  left: 0;
  top: 0;
`;

export const useClippy = () => {
  const ctx = useContext(ClippyContext);

  if (!ctx) throw new Error("Could not instantiate useClippy");

  return ctx;
};
