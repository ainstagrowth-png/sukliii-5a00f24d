import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Heart, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Variables = CSSProperties & Record<`--${string}`, string | number>;
export function Ambient() {
  return <div className="ambient" aria-hidden="true">{Array.from({length:100},(_,i)=> <span key={i} className={i%3 === 0 ? 'ambient-star' : 'ambient-heart'} style={{'--x':`${(i*37.71)%100}%`,'--y':`${(i*23.13)%100}%`,'--size':`${i%3===0?3+i%6:4+i%6}px`,'--duration':`${14+i%19}s`,'--delay':`${-i*1.73}s`} as Variables}>{i%3===0 ? '✦' : '♥'}</span>)}</div>;
}
export function Burst({ kind='hearts', id }: {kind?:'hearts'|'kisses'; id:number}) {
  return <div key={id} className={`burst-layer ${kind==='kisses'?'kiss-layer':''}`} aria-hidden="true">{kind==='hearts' && <div className="flash"/>}{Array.from({length:kind==='kisses'?48:40},(_,i)=> <span className="burst-particle" key={i} style={{'--x':`${i*37%100}%`,'--dx':`${Math.cos(i*2.4)*(120+i*14)}px`,'--dy':`${Math.sin(i*2.4)*(120+i*14)}px`,'--rotation':`${i*41%360-180}deg`,'--size':`${16+i%5*9}px`,'--delay':`${i%7*.075}s`} as Variables}>{kind==='kisses' ? ['💋','😘','💗','✦'][i%4] : ['♥','✦','♡'][i%3]}</span>)}</div>;
}
export function useLoveAudio() {
  const [enabled,setEnabled] = useState(false);
  const context = useRef<AudioContext|null>(null);
  const volume = useRef<GainNode|null>(null);
  const timer = useRef<ReturnType<typeof setInterval>|null>(null);
  const tone = (frequency:number, when:number, duration:number, level=.12) => {
    const ctx=context.current, master=volume.current;
    if(!ctx || !master) return;
    const oscillator=ctx.createOscillator(), gain=ctx.createGain();
    oscillator.type='sine'; oscillator.frequency.value=frequency;
    gain.gain.setValueAtTime(0,when); gain.gain.linearRampToValueAtTime(level,when+.03); gain.gain.exponentialRampToValueAtTime(.001,when+duration);
    oscillator.connect(gain); gain.connect(master); oscillator.start(when); oscillator.stop(when+duration);
    oscillator.onended=()=>{ oscillator.disconnect(); gain.disconnect(); };
  };
  const toggle = async () => {
    if(enabled) { setEnabled(false); return; }
    try {
      if(!context.current) { context.current=new AudioContext(); volume.current=context.current.createGain(); volume.current.gain.value=.32; volume.current.connect(context.current.destination); }
      await context.current.resume(); setEnabled(true);
    } catch { setEnabled(false); }
  };
  useEffect(()=>{
    if(volume.current) volume.current.gain.value=enabled?.32:0;
    if(enabled) {
      let step=0; const notes=[261.63,329.63,392,523.25,440,392,329.63,293.66];
      const play=()=>{ const ctx=context.current; const note=notes[step%notes.length] ?? 261.63; if(ctx) { tone(note,ctx.currentTime,1.7,.1); tone(note/2,ctx.currentTime,2.1,.045); step++; } };
      play(); timer.current=setInterval(play,1150);
    }
    return ()=>{if(timer.current) clearInterval(timer.current);};
  },[enabled]);
  useEffect(()=>()=>{void context.current?.close();},[]);
  const success=()=>{const ctx=context.current;if(enabled && ctx) [523.25,659.25,783.99,1046.5].forEach((n,i)=>tone(n,ctx.currentTime+i*.14,.7,.16));};
  return {enabled,toggle,success};
}
export function SoundButton({enabled,toggle}:{enabled:boolean;toggle:()=>void}) {
  return <Button variant="ghost" size="icon" className="sound-button" onClick={toggle} aria-label={enabled?'Mute music and sounds':'Enable music and sounds'} title={enabled?'Mute music and sounds':'Enable music and sounds'}>{enabled?<Volume2/>:<VolumeX/>}</Button>;
}
export function Chapter({number,label}:{number:number;label:string}) {return <div className="chapter">Chapter {String(number).padStart(2,'0')} <span>·</span> {label}</div>;}
const EMOJI_RUN = /\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic})*/gu;
function splitRuns(text:string) {
  const runs:{text:string;emoji:boolean}[] = [];
  let last = 0;
  for (const match of text.matchAll(EMOJI_RUN)) {
    const at = match.index ?? 0;
    if (at > last) runs.push({ text:text.slice(last,at), emoji:false });
    runs.push({ text:match[0], emoji:true });
    last = at + match[0].length;
  }
  if (last < text.length) runs.push({ text:text.slice(last), emoji:false });
  return runs;
}
export function TypedGreeting({text}:{text:string}) {
  const runs = useMemo(()=>splitRuns(text),[text]);
  const total = useMemo(()=>Array.from(text).length,[text]);
  const [length,setLength]=useState(0);
  useEffect(()=>{const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduced){setLength(total);return;}let index=0;const timer=setInterval(()=>{index++;setLength(index);if(index>=total)clearInterval(timer);},65);return()=>clearInterval(timer);},[text,total]);
  const paint = (shown:number) => { let cursor = 0; return runs.map((run,i)=>{ const chars=Array.from(run.text); const take=Math.max(0,Math.min(chars.length,shown-cursor)); cursor+=chars.length; const piece=chars.slice(0,take).join(''); return run.emoji ? <span key={i} className="greeting-emoji">{piece}</span> : <span key={i}>{piece}</span>; }); };
  return <h1 className="typed-greeting" aria-label={text}><span className="greeting-spacer" aria-hidden="true">{paint(total)}</span><span className="greeting-typed" aria-hidden="true">{paint(length)}<span className="typing-cursor">|</span></span></h1>;
}
export function Footer({step}:{step:number}) {return <footer className="love-footer"><div className="progress-dots" aria-label={`Chapter ${step} of 8`}>{Array.from({length:8},(_,i)=><span key={i} className={`progress-dot ${i===step-1?'active':''}`}/>)}</div><div className="footer-copy">A little surprise. A whole lot of love. <Heart/></div></footer>;}
