/* BioglowRX engine — generated illustrations: what a sample looks like, where you meet it
   (everyday objects), and electron shells. Drawn in SVG from each item's data:
   item.look = [kind, colour, variant]  kind: m metal, c crystals, p powder, g gas tube, l liquid, r too rare to see
   item.obj  = [objectKey, caption, variant]   objectKey: one of BGX.OBJ below
   item.conf = electron configuration ("[Ar] 3d6 4s2")  for shells */
(function () {
  "use strict";
  const BGX = window.BGX;
  const seedOf = e => e.num || e.seed || 1;
  const catColor = e => { const c = BGX.game && BGX.game.catMap[e.cat]; return c ? `var(--${c.color})` : "var(--cat-mint)"; };
  const look = e => {
    if (e.look) return e.look;
    const c = BGX.game && BGX.game.catMap[e.cat];
    if (e.syn) return ["r", (c && BGX.cssVar(c.color)) || "#C7B8EC"];
    return ["m", "#B9C0C8"];
  };
  const objOf = e => e.obj || ["lab", "Research laboratory"];
/* ---------- generated illustrations ---------- */
// kind: m=metal nugget, c=crystals, p=powder, g=glowing gas tube, l=liquid vial, r=radioactive/synthetic trace
let gid=0;
function specimenSVG(e){
  const [k,col]=look(e), R=BGX.rng(seedOf(e)), id="s"+(++gid);
  const hi=BGX.shade(col==="bi"?"#9a8fd0":col,.7), lo=BGX.shade(col==="bi"?"#9a8fd0":col,-.55);
  const shadow=`<ellipse cx="80" cy="142" rx="56" ry="8" fill="#000" opacity=".22" filter="url(#${id}sh)"/>`;
  const base=`<filter id="${id}sh" x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation="3"/></filter>`;
  let g="";
  if(k==="m"){
    const pts=[];const cx=80,cy=92;const n=11;
    for(let i=0;i<n;i++){const a=i/n*Math.PI*2+R()*.25;const rr=42+R()*12;pts.push([cx+Math.cos(a)*rr*1.12,cy+Math.sin(a)*rr*.86])}
    const d="M"+pts.map(p=>p.map(v=>v.toFixed(1)).join(",")).join("L")+"Z";
    g=`<defs>${base}
      <linearGradient id="${id}g" x1=".1" y1="0" x2=".8" y2="1"><stop offset="0" stop-color="${hi}"/><stop offset=".35" stop-color="${col}"/><stop offset=".62" stop-color="${BGX.shade(col,-.25)}"/><stop offset=".78" stop-color="${BGX.shade(col,.25)}"/><stop offset="1" stop-color="${lo}"/></linearGradient>
      <filter id="${id}t" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="3" seed="${seedOf(e)}" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="7" result="d"/>
        <feTurbulence type="fractalNoise" baseFrequency=".6" numOctaves="2" seed="${seedOf(e)+3}" result="fine"/>
        <feDiffuseLighting in="fine" surfaceScale="1.6" lighting-color="#fff" result="l"><feDistantLight azimuth="225" elevation="55"/></feDiffuseLighting>
        <feComposite in="l" in2="d" operator="in" result="lt"/>
        <feBlend in="d" in2="lt" mode="multiply"/>
      </filter>
      <radialGradient id="${id}s" cx=".35" cy=".3" r=".35"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
      <clipPath id="${id}c"><path d="${d}"/></clipPath></defs>
      ${shadow}<path d="${d}" fill="url(#${id}g)" filter="url(#${id}t)"/>
      <g clip-path="url(#${id}c)"><ellipse cx="62" cy="76" rx="34" ry="20" fill="url(#${id}s)"/><path d="M40 112 Q80 126 124 104" stroke="${lo}" stroke-opacity=".5" stroke-width="6" fill="none" filter="url(#${id}sh)"/></g>
      <path d="M56 74 Q68 66 82 68" stroke="#fff" stroke-opacity=".9" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
  } else if(k==="c"){
    const bi=col==="bi"; const cols=bi?["#D9A441","#6C5FD0","#2FA7BC","#C64B9C","#7CB342"]:[col];
    let shards="";
    const specs=[[80,138,24,96,0],[54,138,17,64,-20],[106,138,18,72,17],[66,138,12,46,-38],[96,138,13,50,34],[86,138,10,36,8]];
    specs.forEach(([x,y,w,h,rot],i)=>{const c=cols[i%cols.length];const gi=id+"f"+i;
      shards+=`<linearGradient id="${gi}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${BGX.shade(c,.35)}"/><stop offset="1" stop-color="${BGX.shade(c,-.3)}"/></linearGradient>
      <g transform="rotate(${rot} ${x} ${y})">
      <path d="M${x-w/2},${y} L${x-w/2},${y-h+w*.7} L${x-w*.1},${y-h} L${x-w*.1},${y}Z" fill="url(#${gi})"/>
      <path d="M${x-w*.1},${y} L${x-w*.1},${y-h} L${x+w/2},${y-h+w*.7} L${x+w/2},${y}Z" fill="${BGX.shade(c,-.45)}"/>
      <path d="M${x-w/2},${y-h+w*.7} L${x-w*.1},${y-h} L${x+w/2},${y-h+w*.7} L${x+w*.05},${y-h+w*.95}Z" fill="${BGX.shade(c,.55)}" opacity=".9"/>
      <path d="M${x-w/2+2.5},${y-h+w*.8} L${x-w/2+2.5},${y-6}" stroke="#fff" stroke-opacity=".7" stroke-width="1.6"/>
      ${bi?`<path d="M${x-w/2},${y-h*.5} H${x+w/2} M${x-w/2},${y-h*.3} H${x+w/2}" stroke="#fff" stroke-opacity=".35"/>`:""}</g>`});
    const rock=`<path d="M28 140 Q34 120 56 122 Q80 112 104 122 Q128 120 134 140Z" fill="#7a746c"/><path d="M28 140 Q34 120 56 122 Q80 112 104 122 Q128 120 134 140Z" fill="#000" opacity=".15" filter="url(#${id}tx)"/>`;
    g=`<defs>${base}<filter id="${id}tx"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2"/><feColorMatrix type="saturate" values="0"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>${shadow}${rock}${shards}`;
  } else if(k==="p"){
    const d="M18 142 Q50 132 64 104 Q80 74 96 104 Q110 132 142 142Z";
    g=`<defs>${base}<radialGradient id="${id}g" cx=".45" cy=".35" r=".8"><stop offset="0" stop-color="${BGX.shade(col,.3)}"/><stop offset=".6" stop-color="${col}"/><stop offset="1" stop-color="${BGX.shade(col,-.45)}"/></radialGradient>
      <filter id="${id}t"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="${seedOf(e)}" result="n"/><feDiffuseLighting in="n" surfaceScale="2" lighting-color="#fff" result="l"><feDistantLight azimuth="230" elevation="50"/></feDiffuseLighting><feComposite in="l" in2="SourceGraphic" operator="in" result="t"/><feBlend in="SourceGraphic" in2="t" mode="multiply"/></filter></defs>
      ${shadow}<path d="${d}" fill="url(#${id}g)" filter="url(#${id}t)"/>`;
    let crumbs="";for(let i=0;i<18;i++){crumbs+=`<circle cx="${(20+R()*120).toFixed(1)}" cy="${(140+R()*6).toFixed(1)}" r="${(1+R()*1.5).toFixed(1)}" fill="${BGX.shade(col,-.2)}"/>`}
    g+=crumbs;
  } else if(k==="g"){
    g=`<defs>${base}
      <filter id="${id}b" x="-80%" y="-40%" width="260%" height="180%"><feGaussianBlur stdDeviation="10"/></filter>
      <filter id="${id}b2" x="-80%" y="-40%" width="260%" height="180%"><feGaussianBlur stdDeviation="3"/></filter>
      <linearGradient id="${id}gl" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".2" stop-color="#fff" stop-opacity=".08"/><stop offset=".8" stop-color="#fff" stop-opacity=".04"/><stop offset="1" stop-color="#fff" stop-opacity=".35"/></linearGradient>
      <linearGradient id="${id}mt" x1="0" x2="1"><stop offset="0" stop-color="#5d636b"/><stop offset=".5" stop-color="#d7dbe0"/><stop offset="1" stop-color="#4b5058"/></linearGradient></defs>
      <rect x="0" y="0" width="160" height="160" rx="12" fill="#0d1117" opacity=".9"/>
      <rect x="62" y="20" width="36" height="122" rx="18" fill="${col}" opacity=".9" filter="url(#${id}b)"/>
      <rect x="74" y="34" width="12" height="94" rx="6" fill="${col}" filter="url(#${id}b2)"/>
      <rect x="77" y="38" width="6" height="86" rx="3" fill="${BGX.shade(col,.75)}"/>
      <rect x="64" y="24" width="32" height="112" rx="16" fill="url(#${id}gl)" stroke="#ffffff" stroke-opacity=".35" stroke-width="1.2"/>
      <rect x="70" y="10" width="20" height="16" rx="3" fill="url(#${id}mt)"/><rect x="70" y="134" width="20" height="16" rx="3" fill="url(#${id}mt)"/>
      <path d="M68 40 Q66 80 68 120" stroke="#fff" stroke-opacity=".55" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  } else if(k==="l"){
    const metal=look(e)[2]==="metal";
    g=`<defs>${base}
      <linearGradient id="${id}g" x1="0" x2="1"><stop offset="0" stop-color="${BGX.shade(col,metal?.6:.25)}"/><stop offset=".4" stop-color="${col}"/><stop offset=".7" stop-color="${BGX.shade(col,metal?.4:-.3)}"/><stop offset="1" stop-color="${BGX.shade(col,-.55)}"/></linearGradient>
      <linearGradient id="${id}gl" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset=".25" stop-color="#fff" stop-opacity=".05"/><stop offset=".85" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity=".4"/></linearGradient>
      ${metal?"":`<radialGradient id="${id}v" cx=".5" cy="1" r=".9"><stop offset="0" stop-color="${col}" stop-opacity=".55"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient>`}</defs>
      ${shadow}
      <path d="M68 14 H92 L90 40 Q118 54 118 96 Q118 140 80 140 Q42 140 42 96 Q42 54 70 40Z" fill="${metal?"none":`url(#${id}v)`}"/>
      <path d="M48 90 Q80 84 112 90 Q116 136 80 136 Q44 136 48 90Z" fill="url(#${id}g)"/>
      <ellipse cx="80" cy="89" rx="31" ry="4" fill="${BGX.shade(col,metal?.8:.3)}"/>
      <path d="M68 14 H92 L90 40 Q118 54 118 96 Q118 140 80 140 Q42 140 42 96 Q42 54 70 40Z" fill="url(#${id}gl)" stroke="#9aa3ad" stroke-opacity=".8" stroke-width="1.4"/>
      <path d="M52 70 Q46 92 52 120" stroke="#fff" stroke-opacity=".75" stroke-width="3" fill="none" stroke-linecap="round"/>
      <rect x="66" y="8" width="28" height="9" rx="2" fill="#c9ced4" stroke="#8b939c"/>`;
  } else {
    let sparks="";for(let i=0;i<14;i++){const a=R()*Math.PI*2,r1=22+R()*6,r2=44+R()*22;sparks+=`<line x1="${(80+Math.cos(a)*r1).toFixed(1)}" y1="${(80+Math.sin(a)*r1).toFixed(1)}" x2="${(80+Math.cos(a)*r2).toFixed(1)}" y2="${(80+Math.sin(a)*r2).toFixed(1)}" stroke="${BGX.shade(col,.4)}" stroke-width="1.6" stroke-linecap="round" opacity="${(.4+R()*.6).toFixed(2)}"/>`}
    g=`<defs><radialGradient id="${id}"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="${col}"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient><filter id="${id}b"><feGaussianBlur stdDeviation="2"/></filter></defs>
      <rect x="0" y="0" width="160" height="160" rx="12" fill="#0d1117" opacity=".92"/>
      <g filter="url(#${id}b)">${sparks}</g>${sparks}<circle cx="80" cy="80" r="26" fill="url(#${id})"/>
      <circle cx="76" cy="77" r="4.5" fill="#fff" opacity=".9"/><circle cx="85" cy="79" r="4.5" fill="${BGX.shade(col,.5)}"/><circle cx="79" cy="86" r="4.5" fill="${BGX.shade(col,-.1)}"/>
      <text x="80" y="148" text-anchor="middle" font-family="ui-monospace,monospace" font-size="9" fill="#9aa6b6">a few atoms at a time</text>`;
  }
  return `<svg viewBox="0 0 160 160" class="spec" role="img" aria-label="Illustration of ${BGX.esc(e.name)}">${g}</svg>`;
}

/* ---------- everyday objects ---------- */
const lg=(id,dir,st)=>`<linearGradient id="${id}" ${dir==="h"?'x1="0" y1="0" x2="1" y2="0"':dir==="d"?'x1="0" y1="0" x2="1" y2="1"':'x1="0" y1="0" x2="0" y2="1"'}>${st.map(([o,c,a])=>`<stop offset="${o}" stop-color="${c}"${a!=null?` stop-opacity="${a}"`:""}/>`).join("")}</linearGradient>`;
const rg=(id,st,cx=.4,cy=.35,r=.7)=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${st.map(([o,c,a])=>`<stop offset="${o}" stop-color="${c}"${a!=null?` stop-opacity="${a}"`:""}/>`).join("")}</radialGradient>`;
const METAL=[[0,"#6b737d"],[.25,"#e9edf1"],[.5,"#9aa3ad"],[.75,"#dfe4e9"],[1,"#5f6770"]];
const GLASS=[[0,"#fff",.55],[.2,"#fff",.06],[.8,"#fff",.04],[1,"#fff",.35]];
const OBJ = {
glass:p=>`${lg(p+"w","v",[[0,"#9ad4f5",.55],[1,"#3d8fd1",.85]])}${lg(p+"g","h",GLASS)}
  <path d="M46 34 L54 138 Q55 142 60 142 H100 Q105 142 106 138 L114 34Z" fill="#fff" fill-opacity=".12"/>
  <path d="M50 70 L54 138 Q55 142 60 142 H100 Q105 142 106 138 L110 70Z" fill="url(#${p}w)"/>
  <ellipse cx="80" cy="70" rx="30" ry="4" fill="#cdeeff" opacity=".9"/>
  <path d="M46 34 L54 138 Q55 142 60 142 H100 Q105 142 106 138 L114 34Z" fill="url(#${p}g)" stroke="#9fb3c4" stroke-width="1.3"/>
  <ellipse cx="80" cy="34" rx="34" ry="4.5" fill="none" stroke="#9fb3c4" stroke-width="1.3"/>
  <circle cx="70" cy="110" r="2" fill="#fff" opacity=".8"/><circle cx="88" cy="96" r="1.5" fill="#fff" opacity=".8"/><circle cx="76" cy="124" r="1.2" fill="#fff" opacity=".8"/>`,
balloon:p=>`${rg(p+"r",[[0,"#ff9a9a"],[.5,"#e0323a"],[1,"#8f1018"]])}${rg(p+"b",[[0,"#9ad0ff"],[.5,"#2d7ee6"],[1,"#123f86"]])}${rg(p+"y",[[0,"#fff3a6"],[.5,"#f2c21b"],[1,"#a07a00"]])}
  <path d="M60 86 Q66 110 74 148 M98 76 Q90 112 78 148 M118 92 Q104 118 80 148" stroke="#888" stroke-width="1" fill="none"/>
  <ellipse cx="60" cy="58" rx="24" ry="29" fill="url(#${p}r)"/><path d="M57 86 L63 86 L60 91Z" fill="#8f1018"/>
  <ellipse cx="100" cy="48" rx="24" ry="29" fill="url(#${p}b)"/><path d="M97 76 L103 76 L100 81Z" fill="#123f86"/>
  <ellipse cx="118" cy="66" rx="18" ry="22" fill="url(#${p}y)"/><path d="M115 87 L121 87 L118 92Z" fill="#a07a00"/>
  <ellipse cx="52" cy="46" rx="5" ry="8" fill="#fff" opacity=".55" transform="rotate(-20 52 46)"/><ellipse cx="92" cy="36" rx="5" ry="8" fill="#fff" opacity=".55" transform="rotate(-20 92 36)"/>`,
phone:p=>`${lg(p+"f","d",[[0,"#3a3f47"],[1,"#15181d"]])}${lg(p+"s","d",[[0,"#3b6fd8"],[.5,"#8a52d6"],[1,"#e2577f"]])}${lg(p+"b","v",[[0,"#5a6270"],[1,"#2a2f37"]])}
  <rect x="44" y="14" width="64" height="130" rx="13" fill="url(#${p}f)" stroke="#8d939b" stroke-width="2"/>
  <rect x="49" y="19" width="54" height="120" rx="9" fill="url(#${p}s)"/>
  <rect x="68" y="23" width="16" height="5" rx="2.5" fill="#0b0d10"/>
  <path d="M49 19 L103 19 L49 80Z" fill="#fff" opacity=".12"/>
  <rect x="96" y="68" width="44" height="64" rx="5" fill="url(#${p}b)" stroke="#c9ced4" stroke-width="1.5"/>
  <rect x="104" y="80" width="28" height="12" rx="2" fill="#e8eaed"/><text x="118" y="89" text-anchor="middle" font-size="7" font-family="ui-monospace,monospace" font-weight="700" fill="#2a2f37">Li-ion</text>
  <path d="M119 98 L112 112 H120 L115 124 L128 106 H120 L124 98Z" fill="#7ee08a"/>`,
mirror:p=>{let h="";const pos=[[80,80],[80,52],[80,108],[56,66],[104,66],[56,94],[104,94]];pos.forEach(([x,y],i)=>{h+=`<polygon points="${[0,1,2,3,4,5].map(k=>{const a=Math.PI/3*k;return (x+Math.cos(a)*15).toFixed(1)+","+(y+Math.sin(a)*15).toFixed(1)}).join(" ")}" fill="url(#${p}g)" stroke="#6e5a1e" stroke-width="1"/>`});
  return `${lg(p+"g","d",[[0,"#fff2b0"],[.4,"#e3b33a"],[.7,"#b8861a"],[1,"#f3d77a"]])}<rect x="14" y="14" width="132" height="132" rx="12" fill="#0b1020"/><circle cx="30" cy="30" r="1" fill="#fff"/><circle cx="130" cy="40" r="1.2" fill="#fff"/><circle cx="120" cy="130" r="1" fill="#fff"/><circle cx="28" cy="120" r=".9" fill="#fff"/>${h}<path d="M80 80 L40 30 M80 80 L120 30" stroke="#9aa3ad" stroke-width="1.2"/>`},
dish:p=>`${lg(p+"g","v",[[0,"#e7f3f7",.7],[1,"#b8d8e3",.8]])}${lg(p+"f","v",[[0,"#f2c27a"],[1,"#b4661f"]])}
  <path d="M22 76 H138 L130 128 Q128 136 120 136 H40 Q32 136 30 128Z" fill="url(#${p}g)" stroke="#8fb3c1" stroke-width="1.5"/>
  <path d="M30 88 H130 L126 124 Q125 130 118 130 H42 Q35 130 34 124Z" fill="url(#${p}f)"/>
  <ellipse cx="60" cy="98" rx="10" ry="4" fill="#fbe0a6" opacity=".8"/><ellipse cx="100" cy="104" rx="12" ry="4" fill="#fbe0a6" opacity=".8"/>
  <rect x="14" y="72" width="16" height="10" rx="4" fill="url(#${p}g)" stroke="#8fb3c1"/><rect x="130" y="72" width="16" height="10" rx="4" fill="url(#${p}g)" stroke="#8fb3c1"/>
  <path d="M36 80 L40 126" stroke="#fff" stroke-width="3" opacity=".7"/>`,
pencil:p=>`${lg(p+"y","h",[[0,"#f7c600"],[.5,"#ffe066"],[1,"#d9a800"]])}${lg(p+"w","h",[[0,"#d9a66b"],[1,"#f3d2a2"]])}${lg(p+"d","d",[[0,"#ffffff"],[.4,"#cfe8ff"],[.7,"#9cc7f0"],[1,"#ffffff"]])}
  <g transform="rotate(-38 80 80)"><rect x="34" y="70" width="80" height="18" fill="url(#${p}y)"/><rect x="114" y="70" width="14" height="18" fill="#c0c4c9"/><rect x="128" y="70" width="10" height="18" rx="3" fill="#f08aa0"/>
  <path d="M34 70 L14 79 L34 88Z" fill="url(#${p}w)"/><path d="M20 76.3 L14 79 L20 81.7Z" fill="#2b2b2f"/></g>
  <g transform="translate(108 108)"><path d="M-20 -6 L-12 -16 H12 L20 -6 L0 20Z" fill="url(#${p}d)" stroke="#7fa8cf" stroke-width="1"/><path d="M-20 -6 H20 M-12 -16 L-6 -6 L0 20 L6 -6 L12 -16 M-6 -6 L0 -16 L6 -6" stroke="#7fa8cf" stroke-width=".8" fill="none"/></g>`,
plant:p=>`${lg(p+"pot","v",[[0,"#d06a3a"],[1,"#8f3e1c"]])}${lg(p+"l","d",[[0,"#9be15d"],[1,"#2e8b3a"]])}
  <path d="M80 104 Q78 70 80 40" stroke="#3e7d2a" stroke-width="4" fill="none"/>
  <path d="M80 70 Q50 60 40 40 Q70 40 80 66Z" fill="url(#${p}l)"/><path d="M80 58 Q112 46 122 26 Q92 28 80 54Z" fill="url(#${p}l)"/><path d="M80 88 Q108 84 120 66 Q94 66 80 86Z" fill="url(#${p}l)"/><path d="M80 46 Q70 30 74 14 Q88 26 81 44Z" fill="url(#${p}l)"/>
  <path d="M50 100 H110 L104 142 H56Z" fill="url(#${p}pot)"/><rect x="46" y="96" width="68" height="10" rx="3" fill="#b5532a"/><ellipse cx="80" cy="99" rx="30" ry="3" fill="#4a2d1a"/>`,
tank:p=>`${lg(p+"g","h",[[0,"#1d6b3a"],[.35,"#4fc47c"],[.6,"#2a8a4d"],[1,"#145a2e"]])}
  <rect x="58" y="34" width="44" height="110" rx="20" fill="url(#${p}g)"/><rect x="58" y="34" width="44" height="26" rx="20" fill="#fff" opacity=".95"/><rect x="58" y="48" width="44" height="12" fill="#fff" opacity=".95"/>
  <rect x="72" y="18" width="16" height="18" rx="3" fill="url(#${p}m)"/>${lg(p+"m","h",METAL)}<rect x="66" y="12" width="28" height="7" rx="3" fill="#30353c"/>
  <text x="80" y="100" text-anchor="middle" font-family="ui-sans-serif,sans-serif" font-weight="800" font-size="18" fill="#fff">O₂</text>
  <path d="M64 64 Q62 100 64 136" stroke="#fff" stroke-opacity=".45" stroke-width="3" fill="none"/>
  <path d="M94 16 Q130 20 124 60 Q120 80 132 92" stroke="#7fd3ff" stroke-width="3" fill="none"/><path d="M124 88 Q138 86 140 100 Q136 112 124 108Z" fill="#a8e2ff" stroke="#5aa9d6"/>`,
toothpaste:p=>`${lg(p+"t","v",[[0,"#ffffff"],[.6,"#e8eef5"],[1,"#c5d0dc"]])}${lg(p+"p","v",[[0,"#5ec8f0"],[1,"#1f7fc0"]])}
  <g transform="rotate(-20 80 80)"><path d="M30 64 H104 L120 72 V88 L104 96 H30 Q24 80 30 64Z" fill="url(#${p}t)" stroke="#a8b4c0"/><path d="M28 62 H36 V98 H28Z" fill="#cfd6de"/>
  <rect x="120" y="73" width="12" height="14" rx="2" fill="#1f7fc0"/><path d="M50 72 H96 V88 H50Z" fill="url(#${p}p)" opacity=".85"/><text x="73" y="83.5" text-anchor="middle" font-size="7.5" font-weight="800" font-family="ui-sans-serif,sans-serif" fill="#fff">FLUORIDE</text></g>
  <path d="M120 118 Q132 108 144 116 Q150 124 140 128 Q128 132 120 126Z" fill="#fff" stroke="#9fd8f0"/><path d="M124 120 Q134 114 142 120" stroke="#5ec8f0" stroke-width="3" fill="none"/>`,
neon:p=>`<filter id="${p}b" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="3.5"/></filter>
  <rect x="10" y="30" width="140" height="100" rx="10" fill="#1a1215"/><rect x="10" y="30" width="140" height="100" rx="10" fill="none" stroke="#3a2a30" stroke-width="3"/>
  <g stroke="#ff5a2a" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="url(#${p}b)"><path d="M34 59 Q46 59 46 81 Q46 103 34 103 Q22 103 22 81 Q22 59 34 59Z M56 104 V58 H66 Q78 58 78 70 Q78 82 66 82 H56 M100 58 H86 V104 H100 M86 81 H98 M110 104 V58 L132 104 V58"/></g>
  <g stroke="#ffd2c2" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M34 59 Q46 59 46 81 Q46 103 34 103 Q22 103 22 81 Q22 59 34 59Z M56 104 V58 H66 Q78 58 78 70 Q78 82 66 82 H56 M100 58 H86 V104 H100 M86 81 H98 M110 104 V58 L132 104 V58"/></g>`,
salt:p=>`${lg(p+"g","h",GLASS)}${lg(p+"m","h",METAL)}
  <path d="M54 54 H106 L110 140 Q110 144 106 144 H54 Q50 144 50 140Z" fill="#fff" fill-opacity=".15" stroke="#9fb3c4" stroke-width="1.3"/>
  <path d="M51 82 H109 L110 140 Q110 144 106 144 H54 Q50 144 50 140Z" fill="#f4f6f8"/>
  <path d="M54 54 H106 L110 140 Q110 144 106 144 H54 Q50 144 50 140Z" fill="url(#${p}g)"/>
  <path d="M54 54 Q54 30 80 28 Q106 30 106 54Z" fill="url(#${p}m)"/><circle cx="72" cy="40" r="1.8" fill="#3a3f45"/><circle cx="80" cy="36" r="1.8" fill="#3a3f45"/><circle cx="88" cy="40" r="1.8" fill="#3a3f45"/><circle cx="80" cy="44" r="1.8" fill="#3a3f45"/>
  <g fill="#fff" stroke="#cfd6de" stroke-width=".6"><rect x="118" y="132" width="5" height="5" transform="rotate(12 120 134)"/><rect x="128" y="138" width="4" height="4"/><rect x="34" y="136" width="4.5" height="4.5" transform="rotate(30 36 138)"/></g>`,
leaf:p=>`${lg(p+"a","d",[[0,"#8fd14f"],[1,"#2a7a2c"]])}${lg(p+"b","d",[[0,"#6cbf3e"],[1,"#1f5e23"]])}
  <path d="M80 140 Q30 120 26 64 Q24 34 50 22 Q72 50 80 140Z" fill="url(#${p}a)"/><path d="M80 140 Q46 90 50 22" stroke="#d9f2b8" stroke-width="1.5" fill="none"/>
  <path d="M80 140 Q132 118 136 62 Q138 34 110 22 Q88 52 80 140Z" fill="url(#${p}b)"/><path d="M80 140 Q114 90 110 22" stroke="#cdebb0" stroke-width="1.5" fill="none"/>
  <path d="M80 140 Q76 80 80 30 Q86 80 80 140" fill="#3f9a3a"/>
  <path d="M46 60 Q60 66 66 80 M42 88 Q58 92 66 104 M114 60 Q100 66 94 80 M118 88 Q104 92 96 104" stroke="#d9f2b8" stroke-width="1" fill="none" opacity=".8"/>`,
can:p=>`${lg(p+"c","h",[[0,"#7c0f17"],[.3,"#e3323e"],[.5,"#ff8a90"],[.7,"#c81e2a"],[1,"#6b0b12"]])}${lg(p+"m","h",METAL)}
  <rect x="50" y="30" width="60" height="110" rx="6" fill="url(#${p}c)"/>
  <path d="M50 36 Q50 26 58 24 H102 Q110 26 110 36Z" fill="url(#${p}m)"/><path d="M50 136 Q50 146 58 146 H102 Q110 146 110 136Z" fill="url(#${p}m)"/>
  <ellipse cx="80" cy="24" rx="22" ry="4" fill="#c9ced4" stroke="#7b838c"/><rect x="74" y="19" width="14" height="5" rx="2.5" fill="#9aa3ad"/>
  <path d="M50 70 Q80 84 110 70 V92 Q80 104 50 92Z" fill="#fff" opacity=".9"/>`,
chip:p=>{let pins="";for(let i=0;i<6;i++){const o=48+i*13;pins+=`<rect x="${o}" y="26" width="5" height="14" fill="url(#${p}m)"/><rect x="${o}" y="120" width="5" height="14" fill="url(#${p}m)"/><rect x="26" y="${o}" width="14" height="5" fill="url(#${p}m)"/><rect x="120" y="${o}" width="14" height="5" fill="url(#${p}m)"/>`}
  return `${lg(p+"m","h",[[0,"#b8862a"],[.5,"#ffe08a"],[1,"#a7741c"]])}${lg(p+"b","d",[[0,"#3c424b"],[1,"#15181c"]])}${lg(p+"s","d",[[0,"#6c7cb8"],[.5,"#b8c6f2"],[1,"#4c5a8f"]])}
  ${pins}<rect x="38" y="38" width="84" height="84" rx="6" fill="url(#${p}b)"/><rect x="56" y="56" width="48" height="48" rx="3" fill="url(#${p}s)"/>
  <path d="M60 64 H100 M60 72 H92 M60 80 H100 M60 88 H84 M60 96 H100" stroke="#e6ecff" stroke-opacity=".55" stroke-width="1"/><circle cx="46" cy="46" r="2.5" fill="#666"/>`},
match:p=>`${lg(p+"w","h",[[0,"#e9c38e"],[1,"#c9965a"]])}${rg(p+"f",[[0,"#fff7c2"],[.4,"#ffb52a"],[1,"#ff4d00",0]],.5,.6,.6)}
  <rect x="20" y="104" width="120" height="38" rx="4" fill="#2f5aa8"/><rect x="20" y="104" width="120" height="10" fill="#7a3324"/><rect x="20" y="104" width="120" height="10" fill="#000" opacity=".2"/>
  <g transform="rotate(-24 80 80)"><rect x="40" y="82" width="70" height="6" rx="2" fill="url(#${p}w)"/><ellipse cx="114" cy="85" rx="8" ry="6" fill="#b4302a"/></g>
  <ellipse cx="114" cy="54" rx="16" ry="26" fill="url(#${p}f)"/>
  <g transform="rotate(10 60 80)"><rect x="26" y="92" width="64" height="5" rx="2" fill="url(#${p}w)"/><ellipse cx="92" cy="94.5" rx="7" ry="5" fill="#b4302a"/></g>`,
egg:p=>`${rg(p+"e",[[0,"#fff8ea"],[.7,"#f1dfc0"],[1,"#c9ab7c"]])}${rg(p+"g",[[0,"#ffffff"],[.7,"#ece4d6"],[1,"#b9a98d"]])}
  <ellipse cx="60" cy="84" rx="30" ry="40" fill="url(#${p}e)"/><ellipse cx="50" cy="66" rx="6" ry="10" fill="#fff" opacity=".7"/>
  <path d="M96 140 Q82 136 86 116 Q90 98 112 90 Q134 98 138 116 Q142 136 128 140Z" fill="url(#${p}g)"/><path d="M112 90 Q110 80 114 70" stroke="#7a9a5a" stroke-width="3" fill="none"/>
  <path d="M112 92 Q104 116 106 140 M112 92 Q122 116 120 140" stroke="#c9b89a" stroke-width="1.2" fill="none"/>
  <path d="M26 24 Q34 16 30 8 M40 28 Q48 18 44 10" stroke="#b5c24a" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round"/>`,
pool:p=>`${lg(p+"w","v",[[0,"#6fd6ec"],[1,"#1b87b8"]])}${lg(p+"m","h",METAL)}
  <rect x="10" y="60" width="140" height="86" rx="6" fill="url(#${p}w)"/><rect x="10" y="52" width="140" height="10" fill="#e9e3d6"/>
  <path d="M20 84 Q40 78 60 84 T100 84 T140 84 M20 106 Q40 100 60 106 T100 106 T140 106 M20 126 Q40 120 60 126 T100 126 T140 126" stroke="#bdf2ff" stroke-width="2" fill="none" opacity=".75"/>
  <path d="M96 20 V100 M118 20 V100" stroke="url(#${p}m)" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M96 20 Q96 10 106 10 Q118 10 118 20" stroke="#c9ced4" stroke-width="5" fill="none"/>
  <path d="M96 66 H118 M96 82 H118" stroke="#c9ced4" stroke-width="4"/>`,
window:p=>`${lg(p+"s","d",[[0,"#cfe9ff"],[.5,"#8cc4ef"],[1,"#5a9fd6"]])}
  <rect x="26" y="20" width="108" height="124" rx="4" fill="#f4f4f2" stroke="#c9ced4" stroke-width="2"/>
  <rect x="36" y="30" width="40" height="104" fill="url(#${p}s)"/><rect x="84" y="30" width="40" height="104" fill="url(#${p}s)"/>
  <rect x="40" y="34" width="32" height="96" fill="#b57cff" opacity=".12"/><rect x="88" y="34" width="32" height="96" fill="#b57cff" opacity=".12"/>
  <path d="M40 40 L60 34 M40 60 L70 46 M88 40 L108 34 M88 60 L118 46" stroke="#fff" stroke-width="3" opacity=".6"/>
  <rect x="74" y="80" width="12" height="4" rx="2" fill="#9aa3ad"/>`,
banana:p=>`${lg(p+"y","d",[[0,"#fff176"],[.5,"#f9d71c"],[1,"#c9a400"]])}
  <path d="M24 70 Q40 132 106 128 Q140 120 142 96 Q120 116 90 112 Q48 104 36 62Z" fill="url(#${p}y)" stroke="#a88600" stroke-width="1.2"/>
  <path d="M30 60 Q50 118 110 110 Q136 104 140 84 Q122 100 92 96 Q56 90 42 54Z" fill="#ffe55c" stroke="#a88600" stroke-width="1.2"/>
  <path d="M32 58 L36 50 L44 52 L42 56Z M140 84 L148 84 L146 92Z" fill="#5c4a1a"/><path d="M48 76 Q70 104 110 104" stroke="#fff8c4" stroke-width="3" fill="none" opacity=".7"/>`,
milk:p=>`${lg(p+"g","h",GLASS)}${lg(p+"c","d",[[0,"#ffe08a"],[1,"#e0a92a"]])}
  <path d="M44 50 L48 40 H76 L80 50 V140 Q80 144 76 144 H48 Q44 144 44 140Z" fill="#fbfbf8" stroke="#c9ced4"/><rect x="48" y="30" width="28" height="11" rx="3" fill="#2e7de0"/>
  <path d="M44 50 L48 40 H76 L80 50 V140 Q80 144 76 144 H48 Q44 144 44 140Z" fill="url(#${p}g)"/><text x="62" y="98" text-anchor="middle" font-family="ui-sans-serif,sans-serif" font-weight="800" font-size="10" fill="#2e7de0">MILK</text>
  <path d="M86 144 L142 144 L142 118 L96 104Z" fill="url(#${p}c)" stroke="#c48a14"/><path d="M96 104 L142 118 L142 108 L104 96Z" fill="#ffd25c"/>
  <circle cx="112" cy="128" r="4" fill="#d6941c"/><circle cx="128" cy="134" r="3" fill="#d6941c"/><circle cx="130" cy="122" r="2.5" fill="#d6941c"/>`,
bike:p=>`${lg(p+"f","h",[[0,"#1fb6a8"],[1,"#0e6b66"]])}
  <circle cx="42" cy="104" r="28" fill="none" stroke="#2a2f37" stroke-width="5"/><circle cx="118" cy="104" r="28" fill="none" stroke="#2a2f37" stroke-width="5"/>
  <circle cx="42" cy="104" r="23" fill="none" stroke="#bfc6cf" stroke-width=".8"/><circle cx="118" cy="104" r="23" fill="none" stroke="#bfc6cf" stroke-width=".8"/>
  <path d="M42 104 L70 104 L98 64 L58 64 L42 104 M70 104 L54 52 M98 64 L118 104 M94 52 L98 64" stroke="url(#${p}f)" stroke-width="5" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M46 50 H62" stroke="#2a2f37" stroke-width="6" stroke-linecap="round"/><path d="M88 50 Q94 44 104 48" stroke="#2a2f37" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="70" cy="104" r="6" fill="#9aa3ad"/>`,
implant:p=>`${lg(p+"m","h",[[0,"#6c737c"],[.3,"#d8dde3"],[.6,"#9aa1aa"],[1,"#5a6068"]])}${lg(p+"t","v",[[0,"#ffffff"],[1,"#e6e1d4"]])}
  <path d="M52 22 Q50 50 60 56 H100 Q110 50 108 22 Q96 14 80 18 Q64 14 52 22Z" fill="url(#${p}t)" stroke="#c9c0ab"/>
  <rect x="68" y="56" width="24" height="10" fill="url(#${p}m)"/>
  <path d="M68 66 H92 L88 130 Q80 142 72 130Z" fill="url(#${p}m)"/>
  <path d="M68 74 L92 80 M69 86 L91 92 M70 98 L90 104 M71 110 L89 116 M72 122 L88 126" stroke="#4d535b" stroke-width="2"/>
  <path d="M36 70 Q60 64 80 70 Q100 64 124 70" stroke="#e08a9a" stroke-width="6" fill="none" opacity=".55" stroke-linecap="round"/>`,
wrench:p=>`${lg(p+"m","d",[[0,"#e9edf1"],[.4,"#9aa3ad"],[.6,"#d5dbe1"],[1,"#5f6770"]])}
  <g transform="rotate(-40 80 80)"><path d="M30 72 H118 V88 H30Z" fill="url(#${p}m)"/><path d="M118 64 Q138 60 144 72 L132 76 L132 84 L144 88 Q138 100 118 96Z" fill="url(#${p}m)" stroke="#5f6770"/>
  <circle cx="26" cy="80" r="16" fill="url(#${p}m)" stroke="#5f6770"/><polygon points="18,80 22,73 30,73 34,80 30,87 22,87" fill="#20242a"/>
  <text x="74" y="83.5" text-anchor="middle" font-family="ui-monospace,monospace" font-size="6.5" font-weight="700" fill="#3a4048">CHROME VANADIUM</text></g>`,
cutlery:p=>`${lg(p+"m","h",METAL)}
  <path d="M50 20 V54 Q50 64 58 66 V140 Q58 146 62 146 Q66 146 66 140 V66 Q74 64 74 54 V20 M58 20 V50 M66 20 V50" stroke="url(#${p}m)" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M58 66 V140 Q58 146 62 146 Q66 146 66 140 V66Z" fill="url(#${p}m)"/>
  <ellipse cx="102" cy="44" rx="16" ry="24" fill="url(#${p}m)" stroke="#7b838c"/><ellipse cx="98" cy="38" rx="5" ry="10" fill="#fff" opacity=".7"/>
  <path d="M98 68 Q98 70 98 140 Q98 146 102 146 Q106 146 106 140 V68Z" fill="url(#${p}m)" stroke="#7b838c" stroke-width=".8"/>`,
aa:p=>`${lg(p+"b","h",[[0,"#151515"],[.35,"#4a4a4a"],[.6,"#1e1e1e"],[1,"#0a0a0a"]])}${lg(p+"c","h",[[0,"#8a5a00"],[.35,"#ffb21e"],[.6,"#d48a00"],[1,"#7a4d00"]])}${lg(p+"m","h",METAL)}
  <g transform="rotate(-20 80 80)"><rect x="56" y="26" width="48" height="112" rx="6" fill="url(#${p}b)"/><rect x="56" y="26" width="48" height="38" rx="6" fill="url(#${p}c)"/><rect x="56" y="56" width="48" height="8" fill="url(#${p}c)"/>
  <rect x="72" y="18" width="16" height="9" rx="2" fill="url(#${p}m)"/><rect x="56" y="134" width="48" height="6" rx="3" fill="url(#${p}m)"/>
  <text x="80" y="100" text-anchor="middle" font-family="ui-sans-serif,sans-serif" font-weight="900" font-size="14" fill="#ffb21e">AA</text><text x="80" y="48" text-anchor="middle" font-size="14" font-weight="900" font-family="ui-sans-serif,sans-serif" fill="#1a1a1a">+</text></g>`,
pan:p=>`${rg(p+"p",[[0,"#5a5f66"],[.7,"#2c2f34"],[1,"#141619"]],.45,.45,.6)}${lg(p+"h","h",[[0,"#2c2f34"],[1,"#45494f"]])}
  <rect x="104" y="72" width="54" height="12" rx="6" fill="url(#${p}h)" transform="rotate(-8 104 78)"/>
  <ellipse cx="66" cy="84" rx="54" ry="40" fill="#1b1d21"/><ellipse cx="66" cy="80" rx="48" ry="34" fill="url(#${p}p)"/>
  <ellipse cx="58" cy="80" rx="18" ry="12" fill="#fff8e6"/><ellipse cx="60" cy="81" rx="7" ry="6" fill="#ffb21e"/><ellipse cx="57" cy="78" rx="2" ry="1.6" fill="#fff" opacity=".8"/>`,
pill:p=>`${lg(p+"a","v",[[0,"#ff8a80"],[1,"#c62828"]])}${lg(p+"b","v",[[0,"#ffffff"],[1,"#d9dde2"]])}${lg(p+"j","h",[[0,"#7b3f00"],[.4,"#c46a12"],[1,"#5a2d00"]])}
  <rect x="30" y="40" width="54" height="96" rx="8" fill="url(#${p}j)"/><rect x="34" y="26" width="46" height="16" rx="3" fill="#f2f2f2" stroke="#c9ced4"/><rect x="36" y="70" width="42" height="40" rx="3" fill="#fff8e6"/>
  <text x="57" y="88" text-anchor="middle" font-family="ui-sans-serif,sans-serif" font-weight="900" font-size="10" fill="#c62828">B12</text><text x="57" y="100" text-anchor="middle" font-size="6.5" font-family="ui-sans-serif,sans-serif" fill="#5a2d00">VITAMIN</text>
  <g transform="rotate(-30 116 110)"><rect x="96" y="100" width="20" height="20" fill="url(#${p}a)"/><rect x="116" y="100" width="20" height="20" fill="url(#${p}b)"/><circle cx="96" cy="110" r="10" fill="url(#${p}a)"/><circle cx="136" cy="110" r="10" fill="url(#${p}b)"/><path d="M92 104 H134" stroke="#fff" stroke-width="2" opacity=".6"/></g>`,
coin:p=>`${rg(p+"g",[[0,"#fff2b0"],[.6,"#d4a72c"],[1,"#8a6510"]])}${rg(p+"s",[[0,"#ffffff"],[.6,"#c3c9d1"],[1,"#7a828c"]])}
  <circle cx="64" cy="76" r="40" fill="url(#${p}s)" stroke="#6b737d" stroke-width="1.5"/><circle cx="64" cy="76" r="27" fill="url(#${p}g)"/><text x="64" y="86" text-anchor="middle" font-family="ui-sans-serif,sans-serif" font-weight="900" font-size="28" fill="#7a5a10">1</text>
  <circle cx="112" cy="112" r="30" fill="url(#${p}g)" stroke="#8a6510" stroke-width="1.5"/><circle cx="112" cy="112" r="20" fill="url(#${p}s)"/><text x="112" y="120" text-anchor="middle" font-family="ui-sans-serif,sans-serif" font-weight="900" font-size="22" fill="#4a525c">2</text>
  <text x="64" y="46" text-anchor="middle" font-size="7" font-family="ui-sans-serif,sans-serif" fill="#3a4048">EURO</text>`,
cable:p=>`${lg(p+"c","v",[[0,"#f2b38a"],[.4,"#c8774a"],[1,"#7a3e1c"]])}
  <path d="M10 120 Q50 120 70 90 T130 50" stroke="#1d5bd6" stroke-width="16" fill="none" stroke-linecap="round"/>
  <path d="M10 120 Q50 120 70 90 T118 56" stroke="#2f73f0" stroke-width="10" fill="none" stroke-linecap="round" opacity=".6"/>
  <path d="M126 52 Q140 44 150 36" stroke="url(#${p}c)" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M128 50 Q140 40 148 28 M128 52 Q142 46 154 44 M128 52 Q140 38 142 24" stroke="#d98a5a" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <path d="M14 110 Q50 112 66 86" stroke="#fff" stroke-width="2" fill="none" opacity=".45"/>`,
bucket:p=>`${lg(p+"m","h",[[0,"#7c8691"],[.2,"#d6dde5"],[.45,"#9ba6b2"],[.7,"#e2e8ee"],[1,"#6a737d"]])}<filter id="${p}sp"><feTurbulence type="fractalNoise" baseFrequency=".25" numOctaves="2"/><feColorMatrix type="saturate" values="0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
  <path d="M36 50 Q80 4 124 50" stroke="#6a737d" stroke-width="3" fill="none"/>
  <path d="M34 54 H126 L114 142 H46Z" fill="url(#${p}m)"/><path d="M34 54 H126 L114 142 H46Z" fill="#fff" opacity=".18" filter="url(#${p}sp)"/>
  <ellipse cx="80" cy="54" rx="46" ry="8" fill="#5a636c" stroke="#c3cad2" stroke-width="3"/><path d="M40 82 H120 M44 112 H116" stroke="#6a737d" stroke-width="2.5"/>`,
led:p=>`<filter id="${p}b" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="8"/></filter>${lg(p+"l","h",[[0,"#cfe0ff",.6],[.5,"#ffffff",.2],[1,"#a8c0ff",.6]])}${lg(p+"m","h",METAL)}
  <rect x="0" y="0" width="160" height="160" rx="12" fill="#0d1117"/>
  <circle cx="54" cy="58" r="22" fill="#5a8cff" filter="url(#${p}b)"/><circle cx="106" cy="58" r="22" fill="#ffffff" filter="url(#${p}b)" opacity=".8"/>
  <path d="M42 80 V54 Q42 40 54 40 Q66 40 66 54 V80Z" fill="#8fb0ff" opacity=".85"/><path d="M94 80 V54 Q94 40 106 40 Q118 40 118 54 V80Z" fill="#f4f7ff" opacity=".9"/>
  <path d="M42 80 V54 Q42 40 54 40 Q66 40 66 54 V80Z M94 80 V54 Q94 40 106 40 Q118 40 118 54 V80Z" fill="url(#${p}l)"/>
  <rect x="40" y="80" width="28" height="6" rx="1" fill="#5a8cff"/><rect x="92" y="80" width="28" height="6" rx="1" fill="#e6ebf5"/>
  <path d="M48 86 V140 M60 86 V128 M100 86 V140 M112 86 V128" stroke="url(#${p}m)" stroke-width="3"/>`,
fiber:p=>{let f="";const cs=["#7ee0ff","#c6a8ff","#ffffff","#8affc6","#7ec0ff"];for(let i=0;i<14;i++){const a=-.9+i*.13;const x2=80+Math.cos(a)*70,y2=60+Math.sin(a)*70;f+=`<path d="M40 130 Q60 100 ${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${cs[i%5]}" stroke-width="1.3" fill="none" opacity=".9"/><circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="3.5" fill="${cs[i%5]}" filter="url(#${p}b)"/><circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="1.4" fill="#fff"/>`}
  return `<filter id="${p}b" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="2.5"/></filter><rect x="0" y="0" width="160" height="160" rx="12" fill="#0b1020"/>${f}<path d="M14 150 L44 126" stroke="#2a2f37" stroke-width="14" stroke-linecap="round"/><path d="M16 148 L40 128" stroke="#4a5260" stroke-width="5" stroke-linecap="round"/>`},
poison:p=>`${lg(p+"g","h",[[0,"#1d5a2a"],[.35,"#3f9a52"],[.6,"#2a7a3c"],[1,"#123f1c"]])}
  <path d="M58 44 H102 V48 Q118 56 118 76 V136 Q118 144 110 144 H50 Q42 144 42 136 V76 Q42 56 58 48Z" fill="url(#${p}g)" stroke="#0e2e15"/>
  <rect x="64" y="22" width="32" height="24" rx="4" fill="#3a2a1a"/><rect x="50" y="78" width="60" height="50" rx="4" fill="#f5ecd6"/>
  <circle cx="80" cy="96" r="10" fill="#2a2a2a"/><circle cx="76" cy="95" r="2.6" fill="#f5ecd6"/><circle cx="84" cy="95" r="2.6" fill="#f5ecd6"/><path d="M68 112 L92 120 M92 112 L68 120" stroke="#2a2a2a" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M48 64 Q46 100 48 132" stroke="#fff" stroke-opacity=".45" stroke-width="3" fill="none"/>`,
nut:p=>`${rg(p+"n",[[0,"#e9cfa6"],[.6,"#b98a55"],[1,"#6e4b23"]])}${rg(p+"s",[[0,"#8a5a32"],[1,"#3d2512"]])}
  <path d="M30 90 Q36 52 70 46 Q98 46 96 70 Q92 106 50 116 Q28 116 30 90Z" fill="url(#${p}s)"/><path d="M38 90 Q44 60 70 54 Q88 56 86 72 Q82 100 52 108 Q38 108 38 90Z" fill="url(#${p}n)"/>
  <path d="M80 110 Q92 76 122 70 Q144 72 138 96 Q130 124 98 132 Q78 132 80 110Z" fill="url(#${p}s)"/><path d="M88 110 Q98 82 122 78 Q134 80 130 98 Q124 118 100 124 Q88 124 88 110Z" fill="url(#${p}n)"/>
  <path d="M50 70 Q60 64 70 66 M98 96 Q110 88 120 90" stroke="#fff" stroke-width="2" opacity=".4" fill="none"/>`,
bulb:p=>`${rg(p+"g",[[0,"#fffbe0"],[.4,"#ffe680",.9],[1,"#ffd23f",.25]],.5,.4,.6)}<filter id="${p}b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>${lg(p+"m","h",METAL)}
  <circle cx="80" cy="60" r="44" fill="#ffd23f" opacity=".45" filter="url(#${p}b)"/>
  <path d="M80 16 Q118 16 118 56 Q118 78 100 92 V108 H60 V92 Q42 78 42 56 Q42 16 80 16Z" fill="url(#${p}g)" stroke="#d9c38a" stroke-width="1.2"/>
  <path d="M70 100 V72 L74 62 L78 72 L82 62 L86 72 L90 62 V100" stroke="#ff9a1f" stroke-width="2" fill="none"/><path d="M74 62 L78 72 L82 62 L86 72" stroke="#fff" stroke-width="1" fill="none"/>
  <rect x="60" y="108" width="40" height="26" rx="3" fill="url(#${p}m)"/><path d="M60 114 H100 M60 120 H100 M60 126 H100" stroke="#6b737d" stroke-width="1.5"/><path d="M70 134 H90 L84 144 H76Z" fill="#30353c"/>
  <path d="M54 36 Q50 50 54 64" stroke="#fff" stroke-width="3" fill="none" opacity=".8" stroke-linecap="round"/>`,
clock:p=>`${lg(p+"r","h",METAL)}${rg(p+"f",[[0,"#ffffff"],[1,"#e3e7ec"]])}
  <circle cx="80" cy="76" r="54" fill="url(#${p}r)"/><circle cx="80" cy="76" r="46" fill="url(#${p}f)"/>
  ${Array.from({length:12},(_,i)=>{const a=i/12*Math.PI*2;return `<line x1="${(80+Math.cos(a)*38).toFixed(1)}" y1="${(76+Math.sin(a)*38).toFixed(1)}" x2="${(80+Math.cos(a)*43).toFixed(1)}" y2="${(76+Math.sin(a)*43).toFixed(1)}" stroke="#2a2f37" stroke-width="${i%3?1.5:3}"/>`}).join("")}
  <path d="M80 76 L80 46" stroke="#2a2f37" stroke-width="4" stroke-linecap="round"/><path d="M80 76 L104 88" stroke="#2a2f37" stroke-width="3" stroke-linecap="round"/><path d="M80 76 L60 106" stroke="#e0323a" stroke-width="1.5"/><circle cx="80" cy="76" r="3.5" fill="#e0323a"/>
  <text x="80" y="104" text-anchor="middle" font-size="6.5" font-family="ui-monospace,monospace" fill="#5b6676">ATOMIC</text>
  <rect x="40" y="134" width="80" height="12" rx="3" fill="#2a2f37"/><text x="80" y="143" text-anchor="middle" font-size="7.5" font-family="ui-monospace,monospace" fill="#7ee08a">00:00:00.000000</text>`,
firework:p=>{let r="";for(let i=0;i<22;i++){const a=i/22*Math.PI*2;r+=`<path d="M${80+Math.cos(a)*12} ${66+Math.sin(a)*12} L${(80+Math.cos(a)*52).toFixed(1)} ${(66+Math.sin(a)*52).toFixed(1)}" stroke="url(#${p}s)" stroke-width="2.4" stroke-linecap="round"/><circle cx="${(80+Math.cos(a)*55).toFixed(1)}" cy="${(66+Math.sin(a)*55).toFixed(1)}" r="2.6" fill="#ffd0c8"/>`}
  return `${lg(p+"s","h",[[0,"#ff2a2a",.2],[1,"#ff3b3b"]])}<filter id="${p}b"><feGaussianBlur stdDeviation="4"/></filter><rect x="0" y="0" width="160" height="160" rx="12" fill="#0b0f1e"/><g filter="url(#${p}b)" opacity=".8">${r}</g>${r}<circle cx="80" cy="66" r="7" fill="#fff"/><path d="M80 150 Q78 120 80 96" stroke="#ffb07a" stroke-width="1.6" stroke-dasharray="3 4" opacity=".7"/>`},
screen:p=>`${lg(p+"s","h",[[0,"#ff3b3b"],[.33,"#ffd23f"],[.5,"#3bdc5a"],[.75,"#3b8bff"],[1,"#b23bff"]])}
  <rect x="14" y="26" width="132" height="86" rx="6" fill="#15181d"/><rect x="20" y="32" width="120" height="74" rx="3" fill="url(#${p}s)"/>
  <g transform="translate(96 54)">${[0,1,2,3].map(r=>[0,1,2,3,4,5].map(c=>`<rect x="${c*6}" y="${r*7}" width="1.6" height="5.5" fill="#ff3030"/><rect x="${c*6+2}" y="${r*7}" width="1.6" height="5.5" fill="#30ff50"/><rect x="${c*6+4}" y="${r*7}" width="1.6" height="5.5" fill="#3070ff"/>`).join("")).join("")}<rect x="-3" y="-3" width="40" height="33" fill="none" stroke="#fff" stroke-width="1.5"/></g>
  <rect x="68" y="112" width="24" height="18" fill="#2a2f37"/><rect x="48" y="130" width="64" height="6" rx="3" fill="#3a4048"/>`,
knife:p=>`${lg(p+"b","v",[[0,"#ffffff"],[.6,"#eef0f2"],[1,"#c9cdd2"]])}${lg(p+"h","v",[[0,"#3a3f47"],[1,"#15181d"]])}
  <g transform="rotate(-28 80 80)"><path d="M18 74 H110 V90 H40 Q20 88 18 74Z" fill="url(#${p}b)" stroke="#b8bdc4"/><path d="M18 74 H110 V78 H24Z" fill="#fff"/>
  <rect x="110" y="72" width="40" height="20" rx="6" fill="url(#${p}h)"/><circle cx="122" cy="82" r="1.8" fill="#9aa3ad"/><circle cx="138" cy="82" r="1.8" fill="#9aa3ad"/></g>
  <path d="M40 132 Q50 118 64 124 Q72 136 60 142 Q46 146 40 132Z" fill="#e0323a"/><path d="M54 124 L58 118" stroke="#3e7d2a" stroke-width="2"/>`,
scanner:p=>`${lg(p+"r","d",[[0,"#ffffff"],[1,"#c9d2dc"]])}${lg(p+"b","h",[[0,"#5ab0ff"],[1,"#1e6fd0"]])}
  <circle cx="80" cy="70" r="54" fill="url(#${p}r)" stroke="#aab6c3" stroke-width="1.5"/><circle cx="80" cy="70" r="26" fill="#1b2029"/><circle cx="80" cy="70" r="26" fill="none" stroke="#5ab0ff" stroke-width="2.5" opacity=".8"/>
  <rect x="26" y="20" width="108" height="6" rx="3" fill="url(#${p}b)" opacity=".7"/>
  <rect x="14" y="70" width="132" height="12" rx="6" fill="#e9edf1" stroke="#aab6c3"/><rect x="30" y="66" width="70" height="6" rx="3" fill="#7cc4ff"/>
  <path d="M48 132 V100 H112 V132" fill="none" stroke="#aab6c3" stroke-width="5"/><rect x="40" y="132" width="80" height="8" rx="3" fill="#aab6c3"/>
  <path d="M120 38 L126 32 M126 46 L134 44" stroke="#5ab0ff" stroke-width="2" stroke-linecap="round"/>`,
car:p=>`${lg(p+"c","v",[[0,"#5aa0e6"],[.5,"#1e5fb0"],[1,"#123a6e"]])}${rg(p+"l",[[0,"#ffffff"],[.4,"#cfe0ff"],[1,"#cfe0ff",0]],.5,.5,.5)}
  <path d="M46 116 L118 116" stroke="#b8bdc4" stroke-width="2"/>
  <path d="M14 104 Q14 86 30 82 L48 62 Q54 56 64 56 H104 Q114 56 120 64 L134 82 Q148 84 148 100 V108 Q148 114 142 114 H20 Q14 114 14 104Z" fill="url(#${p}c)"/>
  <path d="M54 66 Q58 62 64 62 H80 V82 H42Z M86 62 H104 Q110 62 114 68 L124 82 H86Z" fill="#cfe6ff" opacity=".85"/>
  <circle cx="44" cy="114" r="15" fill="#1b1d21"/><circle cx="44" cy="114" r="6" fill="#c3c9d1"/><circle cx="120" cy="114" r="15" fill="#1b1d21"/><circle cx="120" cy="114" r="6" fill="#c3c9d1"/>
  <ellipse cx="146" cy="92" rx="18" ry="10" fill="url(#${p}l)"/><rect x="138" y="88" width="9" height="7" rx="2" fill="#fff"/>
  <rect x="64" y="122" width="34" height="14" rx="5" fill="#8a9099" stroke="#5f6770"/><path d="M98 129 H130" stroke="#5f6770" stroke-width="3"/><path d="M68 126 H94 M68 132 H94" stroke="#c9ced4" stroke-width="1"/>`,
tincan:p=>`${lg(p+"m","h",METAL)}
  <rect x="44" y="40" width="72" height="100" rx="5" fill="url(#${p}m)"/><path d="M44 52 H116 M44 128 H116" stroke="#7b838c" stroke-width="2"/>
  <rect x="44" y="62" width="72" height="56" fill="#e0323a"/><text x="80" y="86" text-anchor="middle" font-family="ui-sans-serif,sans-serif" font-weight="900" font-size="11" fill="#fff">TOMATO</text><text x="80" y="102" text-anchor="middle" font-size="8" font-family="ui-sans-serif,sans-serif" fill="#fff">SOUP</text>
  <ellipse cx="80" cy="40" rx="36" ry="7" fill="#d5dbe1" stroke="#7b838c"/><ellipse cx="80" cy="40" rx="28" ry="5" fill="none" stroke="#9aa3ad"/>`,
eyeliner:p=>`${lg(p+"k","v",[[0,"#3a3f47"],[1,"#0b0d10"]])}${lg(p+"g","h",[[0,"#b8862a"],[.5,"#ffe08a"],[1,"#a7741c"]])}
  <path d="M20 96 Q60 64 140 80 Q100 92 70 108 Q40 112 20 96Z" fill="#f2d6be"/><path d="M30 92 Q66 66 136 80" stroke="#1b1d21" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="80" cy="90" rx="16" ry="12" fill="#5a3a1e"/><circle cx="80" cy="90" r="6" fill="#0b0d10"/><circle cx="84" cy="86" r="2" fill="#fff"/>
  <g transform="rotate(-35 110 130)"><rect x="70" y="124" width="70" height="10" rx="3" fill="url(#${p}k)"/><rect x="62" y="125" width="10" height="8" fill="url(#${p}g)"/><path d="M62 125 L52 129 L62 133Z" fill="#0b0d10"/></g>`,
solar:p=>{let c="";for(let r=0;r<4;r++)for(let k=0;k<5;k++)c+=`<rect x="${26+k*22}" y="${30+r*20}" width="20" height="18" fill="url(#${p}s)"/>`;
  return `${lg(p+"s","d",[[0,"#3b5bb0"],[.5,"#1a2b6b"],[1,"#2a438f"]])}<g transform="skewX(-10) translate(14 0)"><rect x="22" y="26" width="116" height="88" fill="#c9ced4"/>${c}<path d="M22 26 L138 114" stroke="#fff" stroke-width="10" opacity=".08"/></g><path d="M76 114 V140 M60 140 H100" stroke="#7b838c" stroke-width="5"/><circle cx="138" cy="20" r="12" fill="#ffd23f"/>`},
iodine:p=>`${lg(p+"g","h",[[0,"#5a2a0a"],[.35,"#a6521a"],[.6,"#7a3a10"],[1,"#3e1a05"]])}${lg(p+"c","h",[[0,"#1c1c1c"],[1,"#444"]])}
  <path d="M60 46 H100 V54 Q112 60 112 76 V136 Q112 144 104 144 H56 Q48 144 48 136 V76 Q48 60 60 54Z" fill="url(#${p}g)"/><rect x="62" y="22" width="36" height="26" rx="4" fill="url(#${p}c)"/>
  <rect x="54" y="84" width="52" height="38" rx="3" fill="#fff"/><text x="80" y="100" text-anchor="middle" font-family="ui-sans-serif,sans-serif" font-weight="800" font-size="9" fill="#7a3a10">IODINE</text><path d="M74 108 H86 M80 102 V114" stroke="#e0323a" stroke-width="3"/>
  <path d="M54 66 Q52 100 54 132" stroke="#fff" stroke-opacity=".4" stroke-width="3" fill="none"/>`,
lighter:p=>`${lg(p+"b","h",[[0,"#c62828"],[.4,"#ff6b6b"],[1,"#8e1414"]])}${lg(p+"m","h",METAL)}${rg(p+"f",[[0,"#fff7c2"],[.4,"#ffb52a"],[1,"#ff4d00",0]],.5,.65,.6)}
  <ellipse cx="80" cy="40" rx="12" ry="22" fill="url(#${p}f)"/><rect x="58" y="58" width="44" height="22" rx="3" fill="url(#${p}m)"/><circle cx="88" cy="66" r="6" fill="#3a3f45"/>
  <g stroke="#ffd25c" stroke-width="1.6" stroke-linecap="round"><path d="M96 60 L108 52 M98 66 L112 66 M96 72 L108 80"/></g>
  <rect x="58" y="78" width="44" height="66" rx="7" fill="url(#${p}b)"/><path d="M64 84 Q62 110 64 138" stroke="#fff" stroke-opacity=".5" stroke-width="3" fill="none"/>`,
goggles:p=>`${rg(p+"l",[[0,"#c8f07a"],[.7,"#5fa33a"],[1,"#2d5a14"]],.35,.35,.8)}
  <path d="M14 76 Q14 50 46 50 H114 Q146 50 146 76 Q146 106 114 106 Q96 106 88 94 H72 Q64 106 46 106 Q14 106 14 76Z" fill="#2a2f37"/>
  <circle cx="48" cy="78" r="22" fill="url(#${p}l)"/><circle cx="112" cy="78" r="22" fill="url(#${p}l)"/><path d="M36 68 Q42 60 52 60 M100 68 Q106 60 116 60" stroke="#fff" stroke-width="3" opacity=".6" fill="none"/>
  <path d="M14 76 Q2 76 2 66 M146 76 Q158 76 158 66" stroke="#2a2f37" stroke-width="6" fill="none"/>
  <g stroke="#ffd25c" stroke-width="2" stroke-linecap="round"><path d="M76 124 L70 136 M84 124 L90 134 M80 122 L80 140 M72 128 L64 128 M88 128 L96 128"/></g>`,
earbuds:p=>`${lg(p+"w","d",[[0,"#ffffff"],[1,"#d9dde2"]])}${lg(p+"m","h",METAL)}
  <rect x="34" y="96" width="92" height="50" rx="22" fill="url(#${p}w)" stroke="#c9ced4"/><path d="M34 112 H126" stroke="#c9ced4"/><rect x="74" y="122" width="12" height="3" rx="1.5" fill="#7ee08a"/>
  <g transform="rotate(-18 56 54)"><ellipse cx="56" cy="44" rx="14" ry="16" fill="url(#${p}w)" stroke="#c9ced4"/><rect x="50" y="52" width="12" height="36" rx="6" fill="url(#${p}w)" stroke="#c9ced4"/><circle cx="56" cy="44" r="6" fill="url(#${p}m)"/></g>
  <g transform="rotate(18 104 54)"><ellipse cx="104" cy="44" rx="14" ry="16" fill="url(#${p}w)" stroke="#c9ced4"/><rect x="98" y="52" width="12" height="36" rx="6" fill="url(#${p}w)" stroke="#c9ced4"/><circle cx="104" cy="44" r="6" fill="url(#${p}m)"/></g>`,
watch:p=>`<filter id="${p}b"><feGaussianBlur stdDeviation="1.8"/></filter>${lg(p+"m","h",METAL)}
  <rect x="58" y="6" width="44" height="40" rx="6" fill="#5a3a1e"/><rect x="58" y="114" width="44" height="40" rx="6" fill="#5a3a1e"/>
  <circle cx="80" cy="80" r="44" fill="url(#${p}m)"/><circle cx="80" cy="80" r="37" fill="#0e1a12"/>
  <g filter="url(#${p}b)">${Array.from({length:12},(_,i)=>{const a=i/12*Math.PI*2;return `<circle cx="${(80+Math.cos(a)*30).toFixed(1)}" cy="${(80+Math.sin(a)*30).toFixed(1)}" r="3" fill="#9dff8a"/>`}).join("")}<path d="M80 80 L80 56 M80 80 L98 90" stroke="#9dff8a" stroke-width="4" stroke-linecap="round"/></g>
  ${Array.from({length:12},(_,i)=>{const a=i/12*Math.PI*2;return `<circle cx="${(80+Math.cos(a)*30).toFixed(1)}" cy="${(80+Math.sin(a)*30).toFixed(1)}" r="2" fill="#e8ffe2"/>`}).join("")}<path d="M80 80 L80 56 M80 80 L98 90" stroke="#e8ffe2" stroke-width="2" stroke-linecap="round"/>`,
banknote:p=>`<filter id="${p}b"><feGaussianBlur stdDeviation="2"/></filter>${lg(p+"n","d",[[0,"#ffb38a"],[1,"#f27a48"]])}
  <rect x="0" y="0" width="160" height="160" rx="12" fill="#1a0f2e"/><rect x="14" y="44" width="132" height="72" rx="5" fill="url(#${p}n)" opacity=".55"/>
  <circle cx="44" cy="80" r="18" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="5"/><text x="118" y="102" text-anchor="middle" font-family="ui-sans-serif,sans-serif" font-weight="900" font-size="28" fill="#fff" opacity=".35">50</text>
  <g filter="url(#${p}b)"><path d="M60 64 Q80 52 100 66 M64 96 L84 72 L100 94" stroke="#ff3a3a" stroke-width="4" fill="none"/><circle cx="118" cy="62" r="6" fill="#ff3a3a"/></g>
  <path d="M60 64 Q80 52 100 66 M64 96 L84 72 L100 94" stroke="#ffd0d0" stroke-width="1.5" fill="none"/><circle cx="118" cy="62" r="3" fill="#ffd0d0"/>
  <rect x="58" y="128" width="44" height="10" rx="3" fill="#6a3aff"/><path d="M62 130 L98 136" stroke="#b9a0ff" stroke-width="1"/><text x="80" y="152" text-anchor="middle" font-size="7.5" font-family="ui-monospace,monospace" fill="#b9a0ff">UV light</text>`,
turbine:p=>`${lg(p+"t","h",[[0,"#c9ced4"],[.5,"#ffffff"],[1,"#aab3bd"]])}${lg(p+"sky","v",[[0,"#bfe3ff"],[1,"#eaf6ff"]])}
  <rect x="0" y="0" width="160" height="160" rx="12" fill="url(#${p}sky)"/><path d="M0 138 Q40 128 80 136 T160 132 V160 H0Z" fill="#7cc05a"/>
  <path d="M76 56 L72 146 H88 L84 56Z" fill="url(#${p}t)"/><rect x="72" y="48" width="18" height="12" rx="4" fill="#e9edf1" stroke="#aab3bd"/>
  <g transform="translate(78 54)"><path d="M0 0 L-4 -46 Q0 -50 4 -46Z" fill="#fff" stroke="#aab3bd"/><path d="M0 0 L-4 -46 Q0 -50 4 -46Z" fill="#fff" stroke="#aab3bd" transform="rotate(120)"/><path d="M0 0 L-4 -46 Q0 -50 4 -46Z" fill="#fff" stroke="#aab3bd" transform="rotate(240)"/><circle r="5" fill="#d5dbe1"/></g>`,
jet:p=>`${lg(p+"m","v",[[0,"#e9edf1"],[.5,"#9aa3ad"],[1,"#5f6770"]])}${rg(p+"f",[[0,"#5f6770"],[1,"#2a2f37"]],.5,.5,.6)}
  <ellipse cx="62" cy="80" rx="44" ry="44" fill="url(#${p}m)"/><ellipse cx="62" cy="80" rx="36" ry="36" fill="#15181d"/>
  ${Array.from({length:18},(_,i)=>`<path d="M62 80 L${(62+Math.cos(i/18*Math.PI*2)*34).toFixed(1)} ${(80+Math.sin(i/18*Math.PI*2)*34).toFixed(1)}" stroke="#c3c9d1" stroke-width="5" transform="rotate(12 62 80)"/>`).join("")}
  <circle cx="62" cy="80" r="9" fill="url(#${p}f)"/><path d="M62 74 Q70 80 62 86" stroke="#fff" stroke-width="1.5" fill="none"/>
  <path d="M100 52 H150 Q156 80 150 108 H100Z" fill="url(#${p}m)"/><path d="M106 60 H146" stroke="#fff" stroke-width="2" opacity=".6"/>`,
pen:p=>`${lg(p+"n","h",[[0,"#9aa3ad"],[.4,"#ffffff"],[.6,"#c3c9d1"],[1,"#6b737d"]])}${lg(p+"b","h",[[0,"#0b2a5a"],[.4,"#2f62b8"],[1,"#0a1f45"]])}
  <g transform="rotate(-40 80 80)"><rect x="56" y="70" width="90" height="20" rx="8" fill="url(#${p}b)"/><rect x="50" y="72" width="10" height="16" fill="#d4a72c"/>
  <path d="M50 72 L14 80 L50 88Z" fill="url(#${p}n)" stroke="#5f6770" stroke-width=".8"/><path d="M14 80 L40 80" stroke="#2a2f37" stroke-width="1"/><circle cx="40" cy="80" r="2" fill="#2a2f37"/><circle cx="15" cy="80" r="1.6" fill="#3a3f45"/></g>
  <path d="M26 132 Q46 120 64 130 T104 128" stroke="#1d3d8a" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
spark:p=>`${lg(p+"m","h",METAL)}${lg(p+"c","h",[[0,"#d9dde2"],[.4,"#ffffff"],[1,"#b8bdc4"]])}
  <rect x="68" y="10" width="24" height="14" rx="3" fill="url(#${p}m)"/><rect x="64" y="22" width="32" height="54" rx="6" fill="url(#${p}c)"/><path d="M64 34 H96 M64 44 H96 M64 54 H96 M64 64 H96" stroke="#c9ced4" stroke-width="2"/>
  <polygon points="58,76 102,76 106,88 102,100 58,100 54,88" fill="url(#${p}m)" stroke="#6b737d"/><rect x="68" y="100" width="24" height="28" fill="url(#${p}m)"/><path d="M68 104 H92 M68 110 H92 M68 116 H92 M68 122 H92" stroke="#6b737d" stroke-width="1.5"/>
  <rect x="78" y="128" width="4" height="8" fill="#c3c9d1"/><path d="M84 140 V132 H76" stroke="#9aa3ad" stroke-width="3" fill="none"/>
  <g stroke="#7ec0ff" stroke-width="1.6" stroke-linecap="round"><path d="M80 138 L72 146 M80 138 L90 146 M80 138 L80 150"/></g>`,
ring:(p,e)=>{const pt=e&&e.obj&&e.obj[2]==="silver";return `${lg(p+"r","d",pt?[[0,"#ffffff"],[.3,"#c3c9d1"],[.55,"#6b737d"],[.8,"#e9edf1"],[1,"#8a929b"]]:[[0,"#fff4c2"],[.3,"#e3b33a"],[.55,"#8a6510"],[.8,"#f6d77a"],[1,"#b8861a"]])}${lg(p+"d","d",[[0,"#ffffff"],[.5,"#d6ecff"],[1,"#a8cff5"]])}
  <ellipse cx="80" cy="96" rx="44" ry="40" fill="none" stroke="url(#${p}r)" stroke-width="12"/><ellipse cx="80" cy="96" rx="44" ry="40" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2" stroke-dasharray="40 200"/>
  <path d="M64 58 L72 46 H88 L96 58 L80 70Z" fill="url(#${p}d)" stroke="#7fa8cf"/><path d="M64 58 H96 M72 46 L76 58 L80 70 L84 58 L88 46" stroke="#7fa8cf" stroke-width=".8" fill="none"/>
  <path d="M100 30 L104 38 L112 40 L104 42 L100 50 L96 42 L88 40 L96 38Z" fill="#fff"/>`},
thermo:p=>`${lg(p+"g","h",GLASS)}${lg(p+"m","h",[[0,"#7b838c"],[.4,"#ffffff"],[1,"#8a929b"]])}
  <rect x="70" y="14" width="20" height="112" rx="10" fill="#fff" fill-opacity=".25" stroke="#9fb3c4" stroke-width="1.5"/><circle cx="80" cy="130" r="16" fill="url(#${p}m)" stroke="#9fb3c4" stroke-width="1.5"/>
  <rect x="76" y="56" width="8" height="70" rx="4" fill="url(#${p}m)"/>
  ${Array.from({length:9},(_,i)=>`<path d="M92 ${24+i*11} H${i%2?98:104}" stroke="#5b6676" stroke-width="1.4"/>`).join("")}
  <rect x="70" y="14" width="20" height="112" rx="10" fill="url(#${p}g)"/><path d="M74 22 V118" stroke="#fff" stroke-width="2" opacity=".7"/>`,
carbattery:p=>`${lg(p+"b","v",[[0,"#3a3f47"],[1,"#15181d"]])}${lg(p+"m","h",METAL)}
  <rect x="20" y="52" width="120" height="88" rx="6" fill="url(#${p}b)"/><rect x="20" y="52" width="120" height="16" rx="6" fill="#4a5058"/>
  <rect x="34" y="38" width="18" height="16" rx="2" fill="#c62828"/><rect x="108" y="38" width="18" height="16" rx="2" fill="url(#${p}m)"/>
  <text x="43" y="34" text-anchor="middle" font-weight="900" font-size="14" font-family="ui-sans-serif,sans-serif" fill="#c62828">+</text><text x="117" y="34" text-anchor="middle" font-weight="900" font-size="14" font-family="ui-sans-serif,sans-serif" fill="#9aa3ad">−</text>
  <rect x="40" y="88" width="80" height="26" rx="3" fill="#f2c21b"/><text x="80" y="105" text-anchor="middle" font-family="ui-sans-serif,sans-serif" font-weight="900" font-size="12" fill="#1b1d21">12V  Pb</text>`,
medicine:p=>`${lg(p+"g","h",[[0,"#e7b9cf"],[.4,"#ffd9ea"],[1,"#c98aa8"]])}${lg(p+"l","v",[[0,"#ff9ec6"],[1,"#e86a9e"]])}
  <path d="M56 46 H96 V54 Q110 62 110 80 V138 Q110 146 102 146 H50 Q42 146 42 138 V80 Q42 62 56 54Z" fill="url(#${p}g)"/><path d="M44 92 H108 V138 Q108 144 102 144 H50 Q44 144 44 138Z" fill="url(#${p}l)"/>
  <rect x="58" y="24" width="36" height="24" rx="4" fill="#ffffff" stroke="#d9a0bb"/><rect x="50" y="98" width="52" height="28" rx="3" fill="#fff"/><text x="76" y="115" text-anchor="middle" font-family="ui-sans-serif,sans-serif" font-weight="800" font-size="8" fill="#c2185b">STOMACH</text>
  <path d="M120 126 Q140 120 146 132 Q140 146 122 140Z" fill="#e8eef5" stroke="#aab6c3"/><path d="M124 130 Q134 126 140 132" stroke="#ff9ec6" stroke-width="4" fill="none"/>`,
record:p=>`${rg(p+"v",[[0,"#3a3f47"],[1,"#0b0d10"]],.5,.5,.55)}${lg(p+"b","h",[[0,"#6a4a2a"],[1,"#9a6a3a"]])}
  <circle cx="72" cy="84" r="58" fill="url(#${p}v)"/>${Array.from({length:7},(_,i)=>`<circle cx="72" cy="84" r="${22+i*5}" fill="none" stroke="#2a2f37" stroke-width=".8"/>`).join("")}
  <circle cx="72" cy="84" r="16" fill="#e0323a"/><circle cx="72" cy="84" r="2.5" fill="#0b0d10"/><path d="M40 52 A48 48 0 0 1 104 52" stroke="#fff" stroke-opacity=".18" stroke-width="10" fill="none"/>
  <g transform="rotate(30 124 40)"><rect x="104" y="26" width="44" height="18" rx="4" fill="url(#${p}b)"/><rect x="104" y="44" width="44" height="8" fill="#2a2a2a"/><path d="M106 52 V58 M112 52 V58 M118 52 V58 M124 52 V58 M130 52 V58 M136 52 V58 M142 52 V58" stroke="#3a3a3a" stroke-width="2"/></g>`,
house:p=>`${lg(p+"w","v",[[0,"#f4efe6"],[1,"#d9d1c2"]])}
  <path d="M20 70 L80 22 L140 70Z" fill="#b5532a"/><rect x="30" y="68" width="100" height="58" fill="url(#${p}w)"/><rect x="70" y="92" width="20" height="34" fill="#7a4a2a"/><rect x="42" y="80" width="18" height="16" fill="#9ad0ff"/><rect x="100" y="80" width="18" height="16" fill="#9ad0ff"/>
  <rect x="20" y="126" width="120" height="22" fill="#6b5a48"/><path d="M20 126 H140" stroke="#3e3226" stroke-width="2"/>
  <rect x="96" y="132" width="28" height="12" rx="2" fill="#fff"/><text x="110" y="141" text-anchor="middle" font-size="6.5" font-family="ui-monospace,monospace" font-weight="700" fill="#c2185b">RADON</text>
  <g stroke="#f0a3c8" stroke-width="2" stroke-dasharray="2 4" fill="none" opacity=".9"><path d="M40 150 Q44 140 40 130 M56 150 Q60 140 56 130"/></g>`,
nuclear:p=>`${lg(p+"t","h",[[0,"#9aa3ad"],[.4,"#e9edf1"],[1,"#7b838c"]])}${lg(p+"sky","v",[[0,"#bfe3ff"],[1,"#eaf6ff"]])}
  <rect x="0" y="0" width="160" height="160" rx="12" fill="url(#${p}sky)"/>
  <ellipse cx="62" cy="34" rx="24" ry="12" fill="#fff" opacity=".9"/><ellipse cx="76" cy="26" rx="18" ry="10" fill="#fff" opacity=".9"/>
  <path d="M38 140 Q46 96 40 52 H84 Q78 96 86 140Z" fill="url(#${p}t)"/><ellipse cx="62" cy="52" rx="22" ry="4" fill="#c3c9d1"/>
  <rect x="96" y="96" width="44" height="44" fill="#e9edf1" stroke="#aab3bd"/><path d="M96 96 Q118 74 140 96" fill="#d5dbe1" stroke="#aab3bd"/>
  <path d="M0 140 H160 V160 H0Z" fill="#7cc05a"/>`,
probe:p=>`${lg(p+"d","d",[[0,"#ffffff"],[1,"#c9ced4"]])}${lg(p+"g","d",[[0,"#ffe08a"],[1,"#b8861a"]])}
  <rect x="0" y="0" width="160" height="160" rx="12" fill="#0b1020"/><circle cx="20" cy="22" r="1" fill="#fff"/><circle cx="140" cy="30" r="1.2" fill="#fff"/><circle cx="130" cy="140" r="1" fill="#fff"/><circle cx="30" cy="130" r="1" fill="#fff"/><circle cx="96" cy="16" r=".8" fill="#fff"/>
  <path d="M40 60 Q80 20 120 60Z" fill="url(#${p}d)"/><path d="M80 60 L80 34" stroke="#9aa3ad" stroke-width="2"/>
  <rect x="64" y="60" width="32" height="20" fill="url(#${p}g)"/><path d="M96 70 L148 104" stroke="#c9ced4" stroke-width="2.5"/>
  <rect x="34" y="88" width="20" height="16" rx="3" fill="#5f6770"/><circle cx="44" cy="96" r="4" fill="#ff8a3d"/><path d="M54 92 L66 78" stroke="#c9ced4" stroke-width="2"/>`,
rover:p=>`${lg(p+"g","v",[[0,"#f2b38a"],[1,"#b4562a"]])}${lg(p+"b","h",[[0,"#e9edf1"],[1,"#aab3bd"]])}
  <rect x="0" y="0" width="160" height="160" rx="12" fill="#e9a77a"/><path d="M0 116 Q40 104 80 114 T160 108 V160 H0Z" fill="url(#${p}g)"/>
  <rect x="38" y="70" width="76" height="22" rx="3" fill="url(#${p}b)"/><rect x="92" y="38" width="6" height="34" fill="#5f6770"/><rect x="86" y="30" width="20" height="10" rx="2" fill="#3a3f47"/>
  <path d="M38 78 L22 66" stroke="#5f6770" stroke-width="3"/><rect x="14" y="58" width="12" height="10" rx="2" fill="#3a3f47"/>
  <circle cx="44" cy="112" r="10" fill="#2a2f37"/><circle cx="78" cy="112" r="10" fill="#2a2f37"/><circle cx="112" cy="112" r="10" fill="#2a2f37"/><path d="M44 112 L60 92 L78 112 M78 112 L96 92 L112 112" stroke="#5f6770" stroke-width="3" fill="none"/>
  <rect x="116" y="74" width="16" height="14" rx="2" fill="#5f6770"/><circle cx="124" cy="81" r="3" fill="#ff8a3d"/>`,
smoke:p=>`${rg(p+"w",[[0,"#ffffff"],[1,"#d9dde2"]],.45,.4,.7)}
  <rect x="10" y="10" width="140" height="22" fill="#eef0f2"/><path d="M80 32 V40" stroke="#c9ced4" stroke-width="4"/>
  <ellipse cx="80" cy="66" rx="58" ry="26" fill="#c9ced4"/><ellipse cx="80" cy="62" rx="56" ry="24" fill="url(#${p}w)"/>
  ${Array.from({length:7},(_,i)=>`<rect x="${50+i*9}" y="56" width="4" height="14" rx="2" fill="#c9ced4"/>`).join("")}<circle cx="122" cy="62" r="3.5" fill="#e0323a"/>
  <g fill="#9aa3ad" opacity=".45"><circle cx="40" cy="120" r="14"/><circle cx="58" cy="110" r="12"/><circle cx="52" cy="132" r="12"/><circle cx="70" cy="126" r="10"/></g>`,
lab:p=>`${lg(p+"r","h",[[0,"#5f6770"],[.5,"#c3c9d1"],[1,"#5f6770"]])}<filter id="${p}b"><feGaussianBlur stdDeviation="3"/></filter>
  <rect x="0" y="0" width="160" height="160" rx="12" fill="#101722"/>
  <circle cx="80" cy="80" r="56" fill="none" stroke="url(#${p}r)" stroke-width="14"/><circle cx="80" cy="80" r="56" fill="none" stroke="#7ec0ff" stroke-width="2" stroke-dasharray="10 22" opacity=".9"/>
  ${[0,1,2,3].map(i=>{const a=i*Math.PI/2+.4;return `<rect x="${(80+Math.cos(a)*56-8).toFixed(1)}" y="${(80+Math.sin(a)*56-8).toFixed(1)}" width="16" height="16" rx="3" fill="#2f62b8" stroke="#c3c9d1"/>`}).join("")}
  <circle cx="80" cy="80" r="14" fill="#7ec0ff" filter="url(#${p}b)"/><circle cx="80" cy="80" r="5" fill="#fff"/>
  <path d="M80 80 L118 60 M80 80 L48 104 M80 80 L96 120" stroke="#ffd25c" stroke-width="1.5" opacity=".9"/>`
};
function objectSVG(e){
  const [k]=objOf(e), p="o"+(++gid)+"_";
  return `<svg viewBox="0 0 160 160" class="spec" role="img" aria-label="${BGX.esc(objOf(e)[1])}"><defs></defs>${OBJ[k](p,e)}</svg>`;
}

const CORESH={He:[2],Ne:[2,8],Ar:[2,8,8],Kr:[2,8,18,8],Xe:[2,8,18,18,8],Rn:[2,8,18,32,18,8]};
function shells(e){
  const sh=[0,0,0,0,0,0,0];
  for(const t of e.conf.split(" ")){
    const m=t.match(/^\[(\w+)\]$/); if(m){CORESH[m[1]].forEach((v,i)=>sh[i]+=v);continue}
    const q=t.match(/^(\d)[spdf](\d+)$/); if(q) sh[+q[1]-1]+=+q[2];
  }
  while(sh.length&&!sh[sh.length-1]) sh.pop();
  return sh;
}
function shellsSVG(e){
  const sh=shells(e), col=catColor(e), n=sh.length, step=Math.min(14,56/n);
  let o=`<circle cx="80" cy="80" r="11" fill="${col}" stroke="var(--ink)" stroke-opacity=".25"/><text x="80" y="84" text-anchor="middle" font-family="var(--mono)" font-size="10" font-weight="600" fill="var(--tile-ink)">${e.num}+</text>`;
  sh.forEach((cnt,i)=>{const r=16+step*(i+1);
    o+=`<circle cx="80" cy="80" r="${r}" fill="none" stroke="var(--muted)" stroke-opacity=".45" stroke-width="1"/>`;
    for(let j=0;j<cnt;j++){const a=j/cnt*Math.PI*2-Math.PI/2+i*.4;o+=`<circle cx="${(80+Math.cos(a)*r).toFixed(1)}" cy="${(80+Math.sin(a)*r).toFixed(1)}" r="${cnt>18?1.7:2.4}" fill="var(--accent)"/>`}
  });
  return `<svg viewBox="0 0 160 160" class="spec" role="img" aria-label="Electron shells of ${BGX.esc(e.name)}: ${sh.join(", ")}">${o}</svg>`;
}
function fixVars(svg){
  return svg.replace(/<(\w+)([^>]*)>/g,(m,tag,attrs)=>{
    const st=[];attrs=attrs.replace(/\s(fill|stroke|font-family)="(var\([^"]+\))"/g,(mm,a,v)=>{st.push(`${a}:${v}`);return ""});
    return st.length?`<${tag}${attrs.replace(/\/$/,"")} style="${st.join(";")}"${attrs.endsWith("/")?"/":""}>`:m;
  });
}


  BGX.illus = {
    sample: e => fixVars(specimenSVG(e)),
    object: e => objectSVG(e),
    shells: e => fixVars(shellsSVG(e)),
    shellCounts: e => shells(e),
    lookOf: look, objOf
  };
  BGX.OBJ = OBJ;
})();
