// import React from 'react';

// const Message: React.FC = () => {
//   return <div>
// <h1>Bonjour, TypeScript !</h1>
//   </div>;
// };

// export default Message;






// import React, { useState } from 'react';

// const Counter: React.FC = () => {
//   const [count, setCount] = useState<number>(0);

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//     </div>
//   );
// };

// export default Counter;


// import React, { useState } from 'react';

// const TextInput: React.FC = () => {
//   const [text, setText] = useState<string>('');

//   return (
//     <div>
//       <input 
//         type="text" 
//         value={text} 
//         onChange={(e) => setText(e.target.value)} 
//       />
//       <p>You typed: {text}</p>
//     </div>
//   );
// };

// export default TextInput;



// import  { React , useState} from 'react';


// const TextInput: React.FC = () => {
//   const [ text , setText] = useState<String>('');

//   return(
//     <div>
//      <input type="text"
//      value={text}
//      onChange={(e) => setText (e.target.value)} />
//      <p>Your text is : {text}</p>
//      </div>
//   );
// };
// export default TextInput ;



// import React from 'react';

// const FruitList: React.FC = () => {
//   const fruits: string[] = ['Apple', 'Banana', 'Orange', 'Mango'];

//   return (
//     <ul>
//       {fruits.map((fruit, index) => (
//         <li key={index}>{fruit}</li>
//       ))}
//     </ul>
//   );
// };

// export default FruitList;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AcceuilPage from './components/AcceuilPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AcceuilPage />} />
        <Route path="/home" element={<Home />} />
      </Routes> 
    </Router>
  );
}

export default App;












