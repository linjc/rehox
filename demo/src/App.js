import React from 'react'
import { Provider } from 'rehox'
import stores from './stores'
import Demo1 from './components/Demo1'
import Demo2 from './components/Demo2'
import Demo3 from './components/Demo3'

function App() {
  return (
    <Provider {...stores}>
      <Demo1 />
      <Demo2 />
      <Demo3 />
    </Provider>
  );
}

export default App;
