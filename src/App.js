import { useEffect, useState } from 'react';
import './styles/App.css';

function App() {
  const [level, setLevel] = useState(1);
  const [value, setValue] = useState(generateNumber());
  const [color, setColor] = useState(getColor(value));

  var lose = "";
  const [millis, setMillis] = useState(15000);
  const isDanger = millis < 3000;
  const seconds = String(Math.floor(millis/1000)).padStart(2, "0");
  const mlss = String(millis%1000).padStart(3, "0");
  if(millis === 0){
    lose="You lose";
  }
  useEffect(() => {
    setInterval(()=>{
      setMillis((m)=> Math.max(m-1, 0));
    }, 1)
  }, [])
  
  function getColor(value){
    var color = "#ffffff";
    if(value>0)
      {
        color ="#33d1a9";
      }
    else if(value<0){
        color ="#ff4f4f";
      }
      return color;
  }

  function generateNumber(){
    var UpOrDown = Math.random() < 0.5 ? 0 : 1;;
    var value = 0;
    var levels = level*2;
    if(UpOrDown === 1)
    {
      value = Math.floor(Math.random() * 15*levels) + levels*5;
    
    }
    else{
      value = Math.floor(Math.random() * (-15*levels)) - levels*5;
   
    }
    
    return value;
  }

  function changeColorB(){
    setValue(value - 1);
    if(value-1===0){
      setLevel(level+1);
      setColor("#FFFFFF");
      setTimeout(() => {
        const newValue = generateNumber();
        setValue(newValue);
        setColor(getColor(newValue));
        setMillis(15000); // Генерация нового значения через 100 мс
      }, 100);
    }
    

  }

  function changeColorW(){
    setValue(value + 1);
    if(value+1===0){
      setLevel(level+1);
      setColor("#FFFFFF");
      setTimeout(() => {
        const newValue = generateNumber();
        setValue(newValue);
        setColor(getColor(newValue))
        setMillis(15000); // Генерация нового значения через 100 мс
      }, 100);
    }
   
  
  }

  
  
    
  
  return (
    <div className="App">
      <div className='child'>
        <div className="labelV" style={{ color: color, textShadow: `0px 0px 20px ${color}` }}>{value}</div>
        <p></p>
        <div className='Buttons'>
          <button className="ButtonUp" type='button'onClick={changeColorW}>UP</button><button className="ButtonDown" type='button' onClick={changeColorB}>Down</button>
        </div>
        <div className='Timer'>
          <h1 className={isDanger ? "text-danger" : "text-default"}>{seconds}:{mlss}</h1>
          <h1 className='text-danger'>{lose}</h1>
          <h1 className='text-default'>level:{level}</h1>
        </div>
      </div>

    </div>
    
  );
}

export default App;
