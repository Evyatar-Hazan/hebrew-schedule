import React from 'react';
import { GlobalStyle } from './styles/globalStyles';
import GlobalParshaTable from './components/ParshaTable';

const App: React.FC = () => {

  return (
    <>
      <GlobalStyle />
    <GlobalParshaTable />
    </>
  );
};

export default App;