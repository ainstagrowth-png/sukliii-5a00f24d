import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Heart, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { clampMusicVolume, DEFAULT_MUSIC_VOLUME } from '@/lib/love-rules';

type Variables = CSSProperties & Record<`--${string}`, string | number>;
export function Ambient() {
  return <div className="ambient" aria-hidden="true">{Array.from({length:100},(_,i)=> <span key={i} className={i%3 === 0 ? 'ambient-star' : 'ambient-heart'} style={{'--x':`${(i*37.71)%100}%`,'--y':`${(i*23.13)%100}%`,'--size':`${i%3===0?3+i%6:4+i%6}px`,'--duration':`${14+i%19}s`,'--delay':`${-i*1.73}s`} as Variables}>{i%3===0 ? '✦' : '♥'}</span>)}</div>;
}
export function Burst({ kind='hearts', id }: {kind?:'hearts'|'kisses'; id:number}) {
  return <div key={id} className={`burst-layer ${kind==='kisses'?'kiss-layer':''}`} aria-hidden="true">{kind==='hearts' && <div className="flash"/>}{Array.from({length:kind==='kisses'?48:40},(_,i)=> <span className="burst-particle" key={i} style={{'--x':`${i*37%100}%`,'--dx':`${Math.cos(i*2.4)*(120+i*14)}px`,'--dy':`${Math.sin(i*2.4)*(120+i*14)}px`,'--rotation':`${i*41%360-180}deg`,'--size':`${16+i%5*9}px`,'--delay':`${i%7*.075}s`} as Variables}>{kind==='kisses' ? ['💋','😘','💗','✦'][i%4] : ['♥','✦','♡'][i%3]}</span>)}</div>;
}
export function useLoveAudio() {
  const [enabled,setEnabled] = useState(false);
  const [musicVolume,setMusicVolumeState] = useState(DEFAULT_MUSIC_VOLUME);
  const context = useRef<AudioContext|null>(null);
  const masterGain = useRef<GainNode|null>(null);
  const timer = useRef<ReturnType<typeof setInterval>|null>(null);
  const tone = (frequency:number, when:number, duration:number, level=.12) => {
    const ctx=context.current, master=masterGain.current;
    if(!ctx || !master) return;
    const oscillator=ctx.createOscillator(), gain=ctx.createGain();
    oscillator.type='sine'; oscillator.frequency.value=frequency;
    gain.gain.setValueAtTime(0,when); gain.gain.linearRampToValueAtTime(level,when+.03); gain.gain.exponentialRampToValueAtTime(.001,when+duration);
    oscillator.connect(gain); gain.connect(master); oscillator.start(when); oscillator.stop(when+duration);
    oscillator.onended=()=>{ oscillator.disconnect(); gain.disconnect(); };
  };
  const ensureAudio = () => {
    if(typeof window==='undefined' || !window.AudioContext) return null;
    if(!context.current || context.current.state==='closed') {
      context.current=new window.AudioContext();
      masterGain.current=context.current.createGain();
      masterGain.current.gain.value=0;
      masterGain.current.connect(context.current.destination);
    }
    return context.current;
  };
  const setMusicVolume = (next:number) => {
    const safeVolume=clampMusicVolume(next);
    setMusicVolumeState(safeVolume);
    try { window.sessionStorage.setItem('love-audio-volume',String(safeVolume)); } catch {}
  };
  const toggle = async () => {
    if(enabled) {
      setEnabled(false);
      try { window.sessionStorage.setItem('love-audio-muted','true'); } catch {}
      return;
    }
    try {
      const ctx=ensureAudio();
      if(!ctx) return;
      await ctx.resume();
      if(ctx.state==='running') {
        setEnabled(true);
        try { window.sessionStorage.setItem('love-audio-muted','false'); } catch {}
      }
    } catch { setEnabled(false); }
  };
  useEffect(()=>{
    let cancelled=false;
    let wasMuted=false;
    try {
      const savedVolume=window.sessionStorage.getItem('love-audio-volume');
      const parsedVolume=savedVolume===null?DEFAULT_MUSIC_VOLUME:Number(savedVolume);
      setMusicVolumeState(Number.isFinite(parsedVolume)?clampMusicVolume(parsedVolume):DEFAULT_MUSIC_VOLUME);
      wasMuted=window.sessionStorage.getItem('love-audio-muted')==='true';
    } catch {}
    const ctx=ensureAudio();
    if(ctx && !wasMuted) {
      void ctx.resume().then(()=>{
        if(!cancelled && ctx.state==='running') {
          setEnabled(true);
          try { window.sessionStorage.setItem('love-audio-muted','false'); } catch {}
        }
      }).catch(()=>{ if(!cancelled) setEnabled(false); });
    }
    return ()=>{
      cancelled=true;
      if(timer.current) clearInterval(timer.current);
      void context.current?.close();
    };
  },[]);
  useEffect(()=>{
    const ctx=context.current;
    const gain=masterGain.current;
    if(gain && ctx) {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setTargetAtTime(enabled?musicVolume:0,ctx.currentTime,.08);
    }
  },[enabled,musicVolume]);
  useEffect(()=>{
    if(enabled) {
      let step=0; const notes=[261.63,329.63,392,523.25,440,392,329.63,293.66];
      const play=()=>{ const ctx=context.current; const note=notes[step%notes.length] ?? 261.63; if(ctx) { tone(note,ctx.currentTime,1.7,.34); tone(note/2,ctx.currentTime,2.1,.16); step++; } };
      play(); timer.current=setInterval(play,1150);
    }
    return ()=>{if(timer.current) clearInterval(timer.current);};
  },[enabled]);
  const success=()=>{const ctx=context.current;if(enabled && ctx) [523.25,659.25,783.99,1046.5].forEach((n,i)=>tone(n,ctx.currentTime+i*.14,.7,.16));};
  return {enabled,toggle,success,volume:musicVolume,setMusicVolume};
}
export function SoundButton({enabled,toggle,volume,onVolumeChange}:{enabled:boolean;toggle:()=>void;volume:number;onVolumeChange:(volume:number)=>void}) {
  return <div className="sound-controls"><Button variant="ghost" size="icon" className="sound-button" onClick={toggle} aria-label={enabled?'Mute music and sounds':'Play music and sounds'} title={enabled?'Mute music and sounds':'Play music and sounds'}>{enabled?<Volume2/>:<VolumeX/>}</Button><Slider className="sound-slider" min={0} max={1} step={0.01} value={[volume]} onValueChange={([next])=>{if(next!==undefined)onVolumeChange(next);}} aria-label="Background music volume" aria-valuetext={`${Math.round(volume*100)} percent`}/><span className="sound-volume-label" aria-hidden="true">{Math.round(volume*100)}%</span></div>;
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
