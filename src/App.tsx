import React from "react";

// import { useReactToPrint } from "react-to-print";
// import GlobalParshaTable from "./components/ParshaTable";
import HomeScreen from "./screen/home/main";
// import { GlobalStyle } from "./styles/globalStyles";

const App: React.FC = () => (
  // const contentRef = useRef<HTMLDivElement>(null);
  // const reactToPrintFn = useReactToPrint({ contentRef });

  <>
    {/* <button onClick={() => reactToPrintFn()}>Print</button> */}
    {/* <GlobalStyle /> */}
    <HomeScreen />
  </>
);
export default App;
