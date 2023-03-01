/* ---------- External ---------- */
import { useRef, useState } from "react";

/* ---------- Assets ---------- */
import reactLogo from "./assets/react.svg";

/* ---------- Components ---------- */
import { IconButton } from "./components/IconButton";

/* ---------- Contexts ---------- */
import { useClippy } from "./contexts/clippy";

/* ---------- Styles ---------- */
import "./App.css";

function App() {
  /* ---------- Refs ---------- */
  const ref = useRef<HTMLButtonElement>(null);
  const button_ref = useRef<HTMLButtonElement>(null);

  /* ---------- Hooks ---------- */
  const { handleExplain, clearExplanation } = useClippy();

  /* ---------- States ---------- */
  const [count, setCount] = useState<number>(0);

  /* ---------- Handlers ---------- */
  const handleExplainIconButton = () => {
    handleExplain(ref, {
      title: "Now take a look at this",
      content: "nice icon button!!\nsuper duper cool",
      buttons: [
        {
          text: "yes, now end please",
          onClick: () => {
            clearExplanation();
          },
        },
      ],
      offset: { x: -210, y: 0 },
    });
  };

  const handleExplainButton = () => {
    handleExplain(button_ref, {
      title: "Cool button",
      content: "it's very cool, isn't it?",
      buttons: [
        {
          text: "yes!",
          onClick: () => {
            handleExplainIconButton();
          },
        },
        {
          text: "no!",
          onClick: () => {
            clearExplanation();
          },
        },
      ],
    });
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <IconButton onClick={() => alert("icon button function!")} ref={ref} />

      <button onClick={() => handleExplainButton()}>Clippy!</button>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)} ref={button_ref}>
          <span>count is {count}</span>
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
