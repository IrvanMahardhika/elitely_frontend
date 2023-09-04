import React from 'react';
import './App.css';

import DocumentHead from 'containers/DocumentHead';
import Pages from 'pages';

function App() {
  return (
    <div className="App">
      <DocumentHead />
      <Pages />
    </div>
  );
}

export default App;
