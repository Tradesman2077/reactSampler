import './App.css';
import * as Tone from 'tone'
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Render from './Components/Render';
import { useState } from 'react';

function App() {

  const [loadedWave, loadWave] = useState([]);

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const player = new Tone.Player().toDestination();
  let isPlaying = false;
  Tone.Transport.bpm.value = 280;

  let notes = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  let wave = new Tone.Waveform(4096);

  const song = (time, trigger) => {
    if(trigger!=null){
      player.start();
    }
  }

  const play = () => {
      //draw();
      isPlaying = true;
      Tone.start();
      Tone.Transport.start();
      loop.start(0);
    }

  const stop = () => {
      loop.stop();
      isPlaying = false;
      Tone.Transport.stop();
    }

  const playSong = () => {
    if(isPlaying === false){
      play();
      isPlaying = true;
    }
    else{
      isPlaying = true;
      stop();
      isPlaying = false;
    }
  };

  const assignNote = (num) => {
    if(notes[num]===null){
      notes[num] = 'c3';
    }
    else{
      notes[num] = null;
    }
  }
const loadWaveData = () => {
    console.log('callback');
    player.connect(wave);
    player.start();
    player.onstop = () => {
      var arrs = wave.getValue();
      loadWave(arrs);
    }
  }

const loadFile = (e) => {
  var target = e.target;
  var files = target.files;
  var sample = files[0];
  var blob = new Blob([sample], {type : 'audio/wav'});
  var url = URL.createObjectURL(blob);
  player.load(url).then(loadWaveData);
  
}

  const loop  = new Tone.Pattern(song, notes ).start(0);

  return (
    <div>
      <h1>ReactDAW</h1>
      <Button variant="contained" onClick={playSong}>Play/Stop</Button>
      <input id="audiofile" type="file" onChange={loadFile}/>
      <div className='flex'>
        <Checkbox className='item' onClick={()=>assignNote(0)}{...label} />
        <Checkbox className='item' onChange={()=>assignNote(1)}{...label} />
        <Checkbox className='item' onChange={()=>assignNote(2)}{...label} />
        <Checkbox className='item' onChange={()=>assignNote(3)}{...label} />
        <Checkbox className='item' onChange={()=>assignNote(4)}{...label} />
        <Checkbox className='item' onChange={()=>assignNote(5)}{...label} />
        <Checkbox className='item' onChange={()=>assignNote(6)}{...label} />
        <Checkbox className='item' onChange={()=>assignNote(7)}{...label} />
        <Checkbox className='item' onChange={()=>assignNote(8)}{...label} />
        <Checkbox className='item' onChange={()=>assignNote(9)}{...label} />
        <Checkbox className='item' onChange={()=>assignNote(10)}{...label} />
        <Checkbox className='item' onChange={()=>assignNote(11)}{...label} />
        <Checkbox className='item' onChange={()=>assignNote(12)}{...label} />
        <Checkbox className='item' onChange={()=>assignNote(13)}{...label} />
        <Checkbox className='item' onChange={()=>assignNote(14)}{...label} />
        <Checkbox className='item' onChange={()=>assignNote(15)}{...label} />
      </div>
      <div className='flexWave'>
          <Render className='canv' wave = {loadedWave} />
      </div>
    </div>
    
  );
}

export default App;
