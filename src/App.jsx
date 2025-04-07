import { useState } from 'react';
import { TodoProvider } from "./context/contextprovider.jsx";
import Input from "./component/input.jsx";
import List from "./component/list.jsx";
import Button from './component/todobtn.jsx';

function App() {
  return (
    <TodoProvider>
      <div className='flex items-center justify-start flex-col min-h-screen bg-grey-200'>
       <div className='m-4'>
        <Button/>
       </div>
        <Input />
        <List />
      </div>
    </TodoProvider>
  );
}

export default App;
