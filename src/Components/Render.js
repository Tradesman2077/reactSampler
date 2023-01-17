import React, { useRef, useEffect } from 'react';


const normalize = (val, max, min) => { 

  return (val - min) / (max - min); 
}

const Render = (props) => {
    
    const canvasRef = useRef(null)
    const draw = ctx => {

    try{
      console.log(props.wave);
    }
    catch(error){
      console.log(error);
    }
      var arr = props.wave;
      console.log(arr.length);
      ctx.clearRect(0, 0, window.innerWidth, 400);
      ctx.strokeStyle = "#aa0404";
      ctx.moveTo(0, 50);
      let part = window.innerWidth/4096;
      let counterWidth = 0;

      for(let i = 0; i < arr.length; i++){
        ctx.lineTo(counterWidth, normalize(arr[i], 100, 0));
        ctx.stroke();
        counterWidth+=part; 
      }
    }
        
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    draw(context);
  }, [draw]);
  
  return <canvas ref={canvasRef} {...props}/>
}
export default Render;