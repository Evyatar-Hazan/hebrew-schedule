import React from 'react';
import { GlobalStyle } from './styles/globalStyles';
import GlobalParshaTable from './components/ParshaTable';
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

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