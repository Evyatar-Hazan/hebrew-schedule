import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import GlobalParshaTable from "./components/ParshaTable";
import { GlobalStyle } from "./styles/globalStyles";

const App: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <>
      <button onClick={() => reactToPrintFn()}>Print</button>
      <GlobalStyle />
      <div ref={contentRef} className="print-content">
        <GlobalParshaTable />
      </div>
    </>
  );
};

export default App;
