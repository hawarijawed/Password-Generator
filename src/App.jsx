import { useState, useCallback, useEffect, useRef } from 'react'
import './index.css'


function App() {
  const [length, setLengh] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassowrd] = useState();
  const passRef = useRef(null);
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllowed) str += "0123456789";
    if(charAllowed) str +="~!@#$%^&*()_+?";

    for(let i=1; i<length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    //setpassword
    setPassowrd(pass);
  },[length,numAllowed,charAllowed,setPassowrd]);

  const copyToClipboard = useCallback(()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password]);

  useEffect(()=>{
    passwordGenerator();
  },[numAllowed, charAllowed,passwordGenerator]);
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 dark:bg-gray-800'
      >
        <h1 className='text-center text-white mb-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-3'>
          <input 
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3 bg-white'
            readOnly
            ref={passRef}
          />
          <button
            className='outline-none dark:bg-blue-800 text-white px-3 py-0.5 shrink-0'
            onClick={copyToClipboard}
            >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              min={8}
              type='range'
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{
                setLengh(e.target.value);
              }}
            />
            <label >length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type='checkbox'
              defaultChecked = {numAllowed}
              className='cursor-pointer'
              onChange={(e)=>{
                setNumAllowed((prev) => !prev);
              }}
            />
            <label >Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
              type='checkbox'
              defaultChecked = {charAllowed}
              className='cursor-pointer'
              onChange={(e)=>{
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
