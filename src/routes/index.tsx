import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import kitten from '@/assets/love-kitten.jpg';
import couple from '@/assets/love-couple.jpg';
import { Ambient, Burst, Chapter, Footer, SoundButton, TypedGreeting, useLoveAudio } from '@/components/love/effects';
import { ArrowGame } from '@/components/love/arrow-game';
import { BirthdayCake } from '@/components/love/cake';
import { LoveLetter } from '@/components/love/letter';
import { invitationSizes } from '@/lib/love-rules';

export const Route=createFileRoute('/')({
  head:()=>({meta:[
    {title:'Happy Birthday, Sukliiii 💗 — A Gift From Your Lovely Wife'},
    {name:'description',content:'A handmade romantic birthday adventure for Sukliiii. A tiny love mission, birthday wishes, and a heartfelt letter from your lovely wife.'},
    {property:'og:title',content:'Happy Birthday, Sukliiii 💗'},
    {property:'og:description',content:'A little virtual birthday gift, made with endless love by your lovely wife.'},
    {property:'og:type',content:'website'},
    {name:'twitter:card',content:'summary_large_image'},
  ]}),component:BirthdaySurprise,
});
type Scene='invitation'|'sweetheart'|'game'|'stolen'|'kiss'|'cake'|'envelope'|'letter'|'dashboard';
const chapters:Record<Scene,number>={invitation:1,sweetheart:2,game:3,stolen:3,kiss:4,cake:5,envelope:6,letter:7,dashboard:8};
const labels:Record<Scene,string>={invitation:'A little invitation',sweetheart:'You said yes',game:'A tiny love mission',stolen:'Heart officially stolen',kiss:'Sealed with a kiss',cake:'Make a little wish',envelope:'One last surprise',letter:'From my heart to yours',dashboard:'Our little world'};
const noMessages=["Wrong option, Sukliiii! 😾💕","Ehhh? You don't wanna see my surprise? 🥺","Try again, baby! The other button is waitinggg 💋","Nice try, cutie! 😂💗","Sukliiii, don't break my heart already! 😭💘","There's only ONE correct answer, babyyyy! 😼","Hehehe, YES is getting bigger! 💖","Caught you! Now click YES, my love! 🫶"];
const kissMessages=['Hehehe, not that easy, baby! 😼','Are you sure, Sukliiii? 🥺💕','My kisses are waiting for youuu! 💋','Wrong button againnn! 😂💗',"You can't escape my love! 🫶"];
type Variables=CSSProperties & Record<`--${string}`,string|number>;
function BirthdaySurprise() {
  const [scene,setScene]=useState<Scene>('invitation');
  const [replay,setReplay]=useState(0);
  const [noCount,setNoCount]=useState(0);
  const [kissNo,setKissNo]=useState(0);
  const [runaway,setRunaway]=useState({left:35,top:100});
  const [opening,setOpening]=useState(false);
  const [celebrating,setCelebrating]=useState(false);
  const [effect,setEffect]=useState<{id:number;kind:'hearts'|'kisses'}|null>(null);
  const [transitioning,setTransitioning]=useState(false);
  const timers=useRef<ReturnType<typeof setTimeout>[]>([]);
  const effectTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
  const nextId=useRef(0);
  const audio=useLoveAudio();
  const schedule=(action:()=>void,ms:number)=>{timers.current.push(setTimeout(action,ms));};
  const burst=useCallback((kind:'hearts'|'kisses'='hearts')=>{if(effectTimer.current)clearTimeout(effectTimer.current);setEffect({id:++nextId.current,kind});effectTimer.current=setTimeout(()=>setEffect(null),kind==='kisses'?3100:2200);},[]);
  const go=(next:Scene)=>{timers.current.forEach(clearTimeout);timers.current=[];setScene(next);setReplay(n=>n+1);setOpening(false);setCelebrating(false);setTransitioning(false);if(next==='invitation')setNoCount(0);if(next==='kiss'){setKissNo(0);setRunaway({left:35,top:100});}};
  const transition=(next:Scene,kind:'hearts'|'kisses'='hearts')=>{if(transitioning)return;setTransitioning(true);burst(kind);schedule(()=>go(next),kind==='kisses'?2600:700);};
  useEffect(()=>()=>{timers.current.forEach(clearTimeout);if(effectTimer.current)clearTimeout(effectTimer.current);},[]);
  useEffect(()=>{if(scene!=='dashboard')return;const timer=setTimeout(()=>burst(),3100);return()=>clearTimeout(timer);},[scene,replay,burst]);
  const no=()=>{setNoCount(n=>n+1);burst();};
  const sizes=invitationSizes(noCount);
  const cakeDone=()=>{setCelebrating(true);burst('kisses');schedule(()=>go('envelope'),2600);};
  return <main className={`love-app ${scene==='invitation'?'welcome-screen':''}`}><Ambient/><span className="side-love" aria-hidden="true">a little magic, just for you ♡</span><span className="side-love right" aria-hidden="true">you + me, always</span>
    <header className="love-header"><div className="brand"><Heart/><div>For Sukliiii, with love<small>A birthday love story</small></div></div><div className="header-right"><span className="header-note">Made by your lovely wife</span><SoundButton enabled={audio.enabled} toggle={()=>void audio.toggle()}/></div></header>
    <section key={`${scene}-${replay}`} className={`scene ${scene==='game'?'game-scene':''} ${scene==='stolen'?'game-success':''} ${scene==='cake'?'cake-scene':''} ${scene==='letter'?'letter-scene':''} ${scene==='dashboard'?'dashboard-scene':''}`} aria-label={labels[scene]}>
      <Chapter number={chapters[scene]} label={labels[scene]}/>
       {scene==='invitation' && <><div className="art-wrap"><img src={kitten} width={1024} height={1024} alt="A blushing pink kitten with sparkling heart eyes" className="kitten"/><span className="cat-stars">✦</span><span className="cat-stars right">✧</span>{noCount>0 && <span key={noCount} className="cat-emotion">{['😾','🥺','😼','😭'][noCount%4]}</span>}</div><div className="invitation-copy"><TypedGreeting text="Heyyy Sukliii! 🥺"/><p className="copy">I made something special just for uuu... 💗</p><p className="copy muted">Do you want to see it? 🎁💋</p></div><div className="actions invitation-actions" style={{'--yes-scale':sizes.yes,'--no-scale':sizes.no} as Variables}><Button variant="love" className="yes-grow" disabled={transitioning} onClick={()=>{if(!audio.enabled)void audio.toggle();transition('sweetheart');}}>💖 YESSS, SHOW ME!</Button><Button variant="quiet" className="no-shrink" onClick={no}>🙈 NOOO</Button></div><p className="feedback" key={noCount} aria-live="polite">{noCount>0?noMessages[(noCount-1)%noMessages.length]:''}</p></>}
      {scene==='sweetheart' && <><div className="big-heart" aria-hidden="true">♥</div><h1>Awww, you’re such<br/>a sweetheart! 🥹💗</h1><p className="copy">Knew you would say yes, Sukliiii!</p><p className="copy muted">But waittt… before you see your surprise…</p><p className="copy">I need you to complete a tiny love mission! 😼💘</p><div className="actions"><Button variant="love" onClick={()=>go('game')}>LET’S PLAY, BABYYY! 💋</Button></div></>}
      {scene==='game' && <><h1>One tiny mission for you,<br/>Sukliiii! 💘</h1><p className="copy">Drag the arrow, aim at my heart, and let it fly!</p><ArrowGame onHit={()=>{audio.success();burst();go('stolen');}}/></>}
      {scene==='stolen' && <><div className="big-heart">💘</div><h1>OMG 😱 YOU ATTACKED<br/>MY HEART!!! 💘</h1><p className="copy">Look what you did, Sukliiii…</p><p className="copy">You made me fall for you even more! 🥹💕</p><p className="copy muted">My heart was supposed to be safe… but you stole it completely! 😭💋</p><p className="copy">Now you’re responsible for keeping it foreverrr. Deal? 🤭💖</p><div className="actions"><Button variant="love" onClick={()=>go('kiss')}>CONTINUE, MY HEART THIEF! 💗</Button></div></>}
      {scene==='kiss' && <><div className="big-heart">💌</div><h1>Another little surprise?</h1><p className="copy">Sukliiii, do you want to see the next surprise? 🥺💌</p><div className="kiss-arena"><Button variant="love" className="kiss-yes" disabled={transitioning} onClick={()=>transition('cake','kisses')}>YESSS, MY LOVE! 💖</Button><Button variant="quiet" key={kissNo} className="runaway" style={{'--left':`${runaway.left}%`,'--top':`${runaway.top}px`} as Variables} onClick={()=>{setKissNo(n=>n+1);setRunaway({left:Math.random()*65,top:85+Math.random()*40});}}>NOOO 🙈</Button></div><p className="feedback" key={kissNo} aria-live="polite">{kissNo>0?kissMessages[(kissNo-1)%kissMessages.length]:''}</p></>}
      {scene==='cake' && (celebrating?<><div className="big-heart">💌</div><h1>One last little surprise,<br/>just for you… 💌</h1></>:<BirthdayCake onCelebration={()=>{audio.success();burst();}} onDone={cakeDone}/>)}
       {scene==='envelope' && <><h1>One last little surprise,<br/>just for you… 💌</h1><Button variant="ghost" className={`envelope-button ${opening?'opening':''}`} disabled={opening} aria-label={opening?'Opening your love letter':'Open your glowing love letter'} onClick={()=>{setOpening(true);audio.success();schedule(()=>go('letter'),1400);}}><span className="envelope-base"/><span className="envelope-paper">My dear habibi,</span><span className="envelope-fold"/><span className="envelope-flap"/><span className="envelope-seal">♥</span></Button><p className="copy envelope-hint" aria-live="polite">{opening?'Opening your letter… 💌':'Tap the glowing envelope to open your letter 💗'}</p></>}
      {scene==='letter' && <LoveLetter onReplay={()=>go('envelope')} onDashboard={()=>go('dashboard')}/>}
      {scene==='dashboard' && <><img src={couple} width={1024} height={1024} loading="lazy" className="couple-art" alt="A loving anime couple holding hands"/><h1>Our Little World, Sukliiii 💗</h1><p className="copy">You are my favourite person, my safe place,<br/>and my sweetest blessing. 💕</p><div className="love-cards">{[{icon:'💌',label:'Our Love Letter',action:()=>go('envelope')},{icon:'🎂',label:'Birthday Surprise',action:()=>go('cake')},{icon:'💋',label:'Kiss Attack',action:()=>{audio.success();burst('kisses');}},{icon:'🏹',label:'You Stole My Heart',action:()=>go('game')},{icon:'🐱',label:'Cute Cat Surprise',action:()=>go('invitation')}].map(card=><Button variant="ghost" className="love-card" onClick={card.action} key={card.label}><span>{card.icon}</span>{card.label}</Button>)}</div><div className="final-heart" aria-hidden="true">♥</div><p className="dashboard-foot">Made with endless love, just for you, Sukliiii 💗<br/>Alhamdulillah for you, today and always. 😇💕</p></>}
    </section><Footer step={chapters[scene]}/>{effect && <Burst kind={effect.kind} id={effect.id}/>}</main>;
}
