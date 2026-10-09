import { useEffect, useRef, useState } from 'react';
import { Mic, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { countdownValues } from '@/lib/love-rules';
export function BirthdayCake({onCelebration,onDone}:{onCelebration:()=>void;onDone:()=>void}) {
  const [count,setCount]=useState<number>(3);
  const [blown,setBlown]=useState(false);
  const [listening,setListening]=useState(false);
  const [micNote,setMicNote]=useState('');
  const stream=useRef<MediaStream|null>(null);
  const context=useRef<AudioContext|null>(null);
  const frame=useRef(0);
  const mounted=useRef(true);
  const blownRef=useRef(false);
  const finish=useRef(onDone);finish.current=onDone;
  const celebration=useRef(onCelebration);celebration.current=onCelebration;
  const stopMic=()=>{cancelAnimationFrame(frame.current);stream.current?.getTracks().forEach(t=>t.stop());stream.current=null;void context.current?.close();context.current=null;};
  useEffect(()=>{
    mounted.current=true;const timers=countdownValues.slice(1).map((value,i)=>setTimeout(()=>setCount(value),(i+1)*1000));
    return ()=>{mounted.current=false;timers.forEach(clearTimeout);stopMic();};
  },[]);
  useEffect(()=>{if(!blown)return;const timer=setTimeout(()=>finish.current(),3400);return()=>clearTimeout(timer);},[blown]);
  const blow=()=>{if(blownRef.current || count>0)return;blownRef.current=true;setBlown(true);stopMic();setListening(false);celebration.current();};
  const startMic=async()=>{
    if(listening || blown || count>0)return;
    if(!navigator.mediaDevices?.getUserMedia){setMicNote('Microphone isn’t available here. The BLOW button is ready for you! 💗');return;}
    setMicNote('Allow the microphone, then blow gently towards your phone.');
    try {
      const input=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}});
      if(!mounted.current || blownRef.current){input.getTracks().forEach(t=>t.stop());return;}
      stream.current=input;const ctx=new AudioContext();context.current=ctx;await ctx.resume();
      const source=ctx.createMediaStreamSource(input),analyser=ctx.createAnalyser();analyser.fftSize=1024;source.connect(analyser);
      const samples=new Uint8Array(analyser.fftSize);let sustained=0,previous=performance.now();
      setListening(true);setMicNote('Listening… make a wish and blow! 💨');
      const detect=(now:number)=>{if(!mounted.current || blownRef.current)return;analyser.getByteTimeDomainData(samples);let sum=0;samples.forEach(v=>{sum+=((v-128)/128)**2;});const rms=Math.sqrt(sum/samples.length);sustained=rms>.09?sustained+Math.min(now-previous,100):Math.max(0,sustained-30);previous=now;if(sustained>450){blow();return;}frame.current=requestAnimationFrame(detect);};
      frame.current=requestAnimationFrame(detect);
    } catch {stopMic();setListening(false);if(mounted.current)setMicNote('That’s okay, my love! Tap BLOW to make your wish come true. 💗');}
  };
  return <><div className={`cake-art ${blown?'extinguished':''}`} aria-label={blown?'Birthday cake with extinguished candles':'Pink birthday cake with five burning candles'} role="img"><svg viewBox="0 0 340 300">
    <ellipse cx="170" cy="276" rx="143" ry="15" className="cake-shadow"/><ellipse cx="170" cy="270" rx="135" ry="14" className="cake-light"/><ellipse cx="170" cy="265" rx="127" ry="13" className="cake-white"/>
    <path d="M57 186 L57 241 Q57 266 170 266 Q283 266 283 241 L283 186Z" className="cake-pink"/><ellipse cx="170" cy="186" rx="113" ry="27" className="cake-white"/>
    <path d="M57 186 Q68 198 77 188 L77 210 Q83 220 90 210 L90 192 Q103 197 113 195 L113 218 Q119 228 126 218 L126 197 Q142 200 151 200 L151 220 Q158 230 165 220 L165 200 Q182 201 198 198 L198 216 Q205 227 212 216 L212 195 Q228 194 237 190 L237 210 Q244 220 251 210 L251 187 Q269 196 283 186 L283 183 Q275 210 170 209 Q65 210 57 186Z" className="cake-white"/>
    {[85,125,170,215,255].map((x,i)=><text key={x} x={x} y={244-(i%2)*3} textAnchor="middle" className="cake-deep" fontSize="16">♥</text>)}
    <path d="M91 121 L91 174 Q91 198 170 198 Q249 198 249 174 L249 121Z" className="cake-light"/><ellipse cx="170" cy="122" rx="79" ry="21" className="cake-white"/>
    <path d="M91 123 Q102 135 112 125 L112 150 Q119 159 126 149 L126 132 Q140 139 151 137 L151 154 Q158 163 165 153 L165 139 Q182 140 194 136 L194 150 Q202 160 209 150 L209 131 Q222 132 231 125 L231 145 Q238 155 245 145 L249 122 Q243 145 170 146 Q96 142 91 123Z" className="cake-pink"/>
    <path d="M112 174 Q170 189 228 174" className="cake-line"/>
    {[121,146,170,195,220].map((x,i)=><g key={x}><rect x={x-4} y={76+i%2*9} width="8" height={47-i%2*9} rx="3" className="cake-deep"/><path d={`M${x-4} ${88+i%2*9} l8 -4 M${x-4} ${104+i%2*6} l8 -4`} stroke="var(--foreground)" strokeWidth="2"/>
      {blown?<path d={`M${x} ${74+i%2*9} Q${x-12} ${61+i%2*9} ${x} ${51+i%2*9} Q${x+10} ${40+i%2*9} ${x} ${29+i%2*9}`} className="smoke"/>:<g><path d={`M${x} ${76+i%2*9} C${x-14} ${69+i%2*9} ${x-5} ${52+i%2*9} ${x} ${44+i%2*9} C${x+2} ${59+i%2*9} ${x+14} ${69+i%2*9} ${x} ${76+i%2*9}Z`} className="flame"/><ellipse cx={x} cy={69+i%2*9} rx="3" ry="5" className="flame-core"/></g>}
    </g>)}
    <text x="170" y="171" fontSize="18" textAnchor="middle" className="cake-deep">♡</text>
  </svg></div>
  {blown?<><h1>YAYYYYY! HAPPY BIRTHDAY,<br/>MY HABIBI! 🎉💗</h1><p className="copy">May every wish in your heart come true, Sukliiii! 🥹</p></>:<><h1>It’s your special day, Sukliiii! 🎂💗</h1><p className="copy">Make a wish, my love… ✨</p><div className="countdown" key={count} aria-live="polite">{count>0?`${count}…`:<span className="font-hand text-3xl">Now blow the candles, babyyyy! 🥺🕯️</span>}</div><div className="actions"><Button variant="love" disabled={count>0} onClick={blow}><Wind/> BLOW 💨</Button><Button variant="quiet" disabled={count>0 || listening} onClick={startMic}><Mic/> {listening?'LISTENING…':'USE MICROPHONE'}</Button></div><p className="mic-note" aria-live="polite">{micNote}</p></>}
  </>;
}
