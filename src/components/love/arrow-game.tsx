import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { intersectsHeart, type Point } from '@/lib/love-rules';
const launch={x:100,y:230};
const missMessages=['Oopsss! You missed my heart! Try again, baby! 😭💗','A little to the right, Sukliiii! 🎯','Hehehe, my heart is slippery! 😼💘','One more try, my love! You got this! 🫶'];
export function ArrowGame({onHit}:{onHit:()=>void}) {
  const [aim,setAim]=useState<Point>({x:1,y:-.2});
  const [dragging,setDragging]=useState(false);
  const [flying,setFlying]=useState(false);
  const [arrow,setArrow]=useState<Point>(launch);
  const [attempt,setAttempt]=useState(0);
  const [feedback,setFeedback]=useState('My heart is waiting for you… 💗');
  const [targetY,setTargetY]=useState(175);
  const [hit,setHit]=useState(false);
  const svg=useRef<SVGSVGElement|null>(null);
  const frame=useRef(0);
  const delay=useRef<ReturnType<typeof setTimeout>|null>(null);
  const target=useRef({x:590,y:175});
  useEffect(()=>{
    let movement=0; const start=performance.now();
    const move=(now:number)=>{target.current={x:590,y:175+Math.sin((now-start)/1500)*12};setTargetY(target.current.y);movement=requestAnimationFrame(move);};
    movement=requestAnimationFrame(move);
    return ()=>{cancelAnimationFrame(movement);cancelAnimationFrame(frame.current);if(delay.current)clearTimeout(delay.current);};
  },[]);
  const point=(e:PointerEvent):Point=>{const node=svg.current;if(!node)return launch;const matrix=node.getScreenCTM();if(!matrix)return launch;const p=new DOMPoint(e.clientX,e.clientY).matrixTransform(matrix.inverse());return {x:p.x,y:p.y};};
  const changeAim=(e:PointerEvent)=>{const p=point(e);const dx=p.x-launch.x,dy=p.y-launch.y;const magnitude=Math.hypot(dx,dy);if(magnitude>6)setAim({x:dx/magnitude,y:dy/magnitude});};
  const start=(e:PointerEvent<SVGGElement>)=>{if(flying||hit)return;e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);setDragging(true);};
  const release=(e:PointerEvent<SVGGElement>)=>{
    if(!dragging||flying||hit)return;e.currentTarget.releasePointerCapture(e.pointerId);setDragging(false);setFlying(true);setAttempt(a=>a+1);setFeedback('');
    let previous=launch;const started=performance.now();const direction={...aim};
    const fly=(now:number)=>{
      const t=(now-started)/1000;const next={x:launch.x+direction.x*500*t,y:launch.y+direction.y*500*t+20*t*t};setArrow(next);
      if(intersectsHeart(previous,next,target.current,37)) {setArrow({...target.current});setHit(true);setFlying(false);setFeedback('You stole it! 💘');delay.current=setTimeout(onHit,700);return;}
      if(t>2.1||next.x>760||next.x< -40||next.y>390||next.y< -80){setFlying(false);setFeedback(missMessages[attempt%missMessages.length] ?? 'One more try, my love! You got this! 🫶');setArrow(launch);return;}
      previous=next;frame.current=requestAnimationFrame(fly);
    };frame.current=requestAnimationFrame(fly);
  };
  const angle=Math.atan2(aim.y,aim.x)*180/Math.PI;
  const preview=Array.from({length:25},(_,i)=>{const t=i/20;return `${launch.x+aim.x*500*t},${launch.y+aim.y*500*t+20*t*t}`;}).join(' ');
  return <><div className="game-board"><svg ref={svg} viewBox="0 0 720 360" aria-label="Drag the arrow from the left towards the heart on the right and release">
    <defs><pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M 36 0 L 0 0 0 36" className="game-grid" fill="none"/></pattern></defs><rect width="720" height="360" fill="url(#grid)"/>
    <circle cx="590" cy={targetY} r="63" className="target-halo"/><circle cx="590" cy={targetY} r="49" className="target-halo"/>
    <g transform={`translate(590 ${targetY})`}><path className="target-heart" d="M0 32 C-80 -13 -33 -70 0 -37 C33 -70 80 -13 0 32Z"/></g>
    <text x="590" y="280" textAnchor="middle" className="game-label">my heart ♡</text><ellipse cx="100" cy="276" rx="42" ry="8" className="launch-pad"/>
    <path d="M80 180 Q132 230 80 280" className="bow"/><path d="M80 180 L80 280" className="bow-string"/>
    {dragging && <polyline points={preview} className="trajectory"/>}
    <g className="arrow-grab" role="button" tabIndex={0} aria-label="Aim arrow" onPointerDown={start} onPointerMove={e=>{if(dragging)changeAim(e);}} onPointerUp={release} onPointerCancel={()=>setDragging(false)} transform={`translate(${arrow.x} ${arrow.y}) rotate(${angle})`}>
      <circle r="44" fill="transparent"/><path d="M-31 0 H32" className="arrow-body"/><path d="M28 -9 L46 0 L28 9Z" className="arrow-head"/><path d="M-26 0 L-36 -10 M-20 0 L-30 -10 M-26 0 L-36 10 M-20 0 L-30 10" className="arrow-body"/>
    </g><text x="100" y="310" textAnchor="middle" className="game-label">your arrow</text>
  </svg></div><div className="attempt">Attempt {Math.max(1,attempt)}</div><p className="feedback" aria-live="polite">{feedback}</p></>;
}
