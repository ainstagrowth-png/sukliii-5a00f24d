import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { letterParagraphs } from '@/lib/love-rules';
export function LoveLetter({onReplay,onDashboard}:{onReplay:()=>void;onDashboard:()=>void}) {
  const [visible,setVisible]=useState(1);
  useEffect(()=>{const timers=[2,3,4,5].map((n,i)=>setTimeout(()=>setVisible(n),(i+1)*1200));return()=>timers.forEach(clearTimeout);},[]);
  return <><article className="letter-paper" aria-label="Your birthday love letter">{letterParagraphs.slice(0,Math.min(visible,4)).map((text,i)=><p key={i} className={i===0?'greeting':''}>{text}</p>)}{visible===5 && <p className="signature">Forever yours, your lovely wife 💋💗</p>}</article>{visible===5 && <div className="actions"><Button variant="quiet" onClick={onReplay}>READ MY LETTER AGAIN 💌</Button><Button variant="love" onClick={onDashboard}>GO TO OUR LITTLE DASHBOARD 💗</Button></div>}</>;
}
