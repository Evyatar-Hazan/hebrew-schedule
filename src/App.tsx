import html2canvas from "html2canvas";
import React, { useRef, useState } from "react";
import { flushSync } from "react-dom";

import pkg from "../package.json";
import logoSrc from "./assets/logo512.png";
import NavBar from "./navBar/NavBar";
import NestedTable from "./table/components/NestedTable";

const appVersion: string = pkg.version;

const App: React.FC = () => {
  const [dates, setDates] = useState<string[]>([]);
  const [isPrint, setIsPrint] = React.useState(false);
  const tableRef = useRef<HTMLTableElement>(null);

  const handleImage = async () => {
    flushSync(() => setIsPrint(true));
    if (tableRef.current) {
      try {
        const canvas = await html2canvas(tableRef.current, {
          scale: 3,
          useCORS: true,
          backgroundColor: null,
          scrollX: 0,
          scrollY: 0,
          width: tableRef.current.clientWidth,
          height: tableRef.current.clientHeight,
        });

        const imgData = canvas.toDataURL("image/jpg");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "table-screenshot.jpg";
        link.click();
      } catch (error) {
        /* empty */
      }
    }
    setIsPrint(false);
  };

  const handleDateChange = (newDates: string[]) => {
    setDates(newDates);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <NavBar
        version={appVersion}
        logoSrc={logoSrc}
        onScreenshotClick={handleImage}
        dates={dates}
        setDates={handleDateChange}
      />
      {
        <NestedTable
          dates={dates}
          setDates={handleDateChange}
          isPrint={isPrint}
          tableRef={tableRef}
        />
      }
    </div>
  );
};
export default App;
