// build-seo.mjs — Vector 블로그 정적 SEO 빌드
// posts.json의 '발행' 글을 정적 HTML(본문 프리렌더 + 메타/OG/JSON-LD)로 굽고,
// 홈(index.html)·sitemap.xml·robots.txt·feed.xml·글별 OG 이미지를 생성한다.
//
// 실행:  node build-seo.mjs
// 의존:  Node fs만 필수. OG 이미지(PNG)는 Playwright가 있으면 생성(없으면 건너뜀).
//
// GitHub Pages 프로젝트 사이트 기준. 커스텀 도메인 쓰면 SITE만 바꾸면 됨.

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const ROOT = process.cwd();
const SITE = 'https://aicatveo3-prog.github.io/ai_Blog';   // 배포 베이스 URL(끝에 / 없음)
const BRAND = 'Vector';
const TAGLINE = 'AI 자동화 소식 — 직접 돌려보고, 남다르게 해석해서';

// ---------- 유틸 ----------
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const write = (p, s) => { fs.mkdirSync(path.dirname(path.join(ROOT, p)), { recursive: true }); fs.writeFileSync(path.join(ROOT, p), s); };
const escHtml = (s='') => s.replace(/[&<>]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;' }[c]));
const escAttr = (s='') => s.replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
const escXml  = (s='') => s.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&apos;' }[c]));

function metaDesc(s='') {
  const t = s.replace(/\s+/g, ' ').replace(/[*_`#>]/g, '').trim();
  return t.length > 155 ? t.slice(0, 152).trimEnd() + '…' : t;
}
function catOf(p) {
  return p.category || (/(가이드|튜토리얼)/.test(p.type||'') ? '튜토리얼'
    : /(주간|종합)/.test(p.type||'') ? '리서치' : '인사이트');
}
const CAT_EMOJI = { '인사이트':'🧭','리서치':'🔬','튜토리얼':'🛠️','뉴스레터':'📮' };
function isoKST(date) { return `${date}T09:00:00+09:00`; }
function rfc822(date) { return new Date(`${date}T09:00:00+09:00`).toUTCString(); }

// ---------- 마크다운 렌더러 (index.html과 동일 규칙) ----------
function inline(s){const codes=[],links=[];
  s=escHtml(s).replace(/`([^`]+)`/g,(m,c)=>{codes.push(c);return '␞C'+(codes.length-1)+'␞';});
  s=s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(m,t,u)=>{links.push('<a href="'+escAttr(u)+'" target="_blank" rel="noopener">'+t+'</a>');return '␞L'+(links.length-1)+'␞';});
  s=s.replace(/(https?:\/\/[^\s<>()]+[^\s<>().,;:])/g,(m)=>{links.push('<a href="'+escAttr(m)+'" target="_blank" rel="noopener">'+m+'</a>');return '␞L'+(links.length-1)+'␞';});
  s=s.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
  s=s.replace(/(^|[^*])\*([^*\n]+)\*/g,'$1<em>$2</em>');
  s=s.replace(/␞C(\d+)␞/g,(m,i)=>'<code>'+codes[+i]+'</code>');
  s=s.replace(/␞L(\d+)␞/g,(m,i)=>links[+i]);return s;}
const splitRow=(l)=>l.replace(/^\||\|$/g,'').split('|').map(c=>c.trim());
function renderMD(md){const lines=md.replace(/\r/g,'').split('\n');let out='',i=0;
  while(i<lines.length){let ln=lines[i];
    if(/^```/.test(ln)){let buf=[];i++;while(i<lines.length&&!/^```/.test(lines[i])){buf.push(lines[i]);i++;}i++;out+='<pre><code>'+escHtml(buf.join('\n'))+'</code></pre>';continue;}
    if(/^\s*$/.test(ln)){i++;continue;}
    let h=ln.match(/^(#{1,4})\s+(.*)$/);if(h){const n=h[1].length;out+='<h'+n+'>'+inline(h[2])+'</h'+n+'>';i++;continue;}
    if(/^\s*([-*_])\1{2,}\s*$/.test(ln)){out+='<hr>';i++;continue;}
    if(/^\s*>/.test(ln)){let buf=[];while(i<lines.length&&/^\s*>/.test(lines[i])){buf.push(lines[i].replace(/^\s*>\s?/,''));i++;}out+='<blockquote>'+renderMD(buf.join('\n'))+'</blockquote>';continue;}
    if(/\|/.test(ln)&&i+1<lines.length&&/^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(lines[i+1])){const head=splitRow(ln);i+=2;let rows=[];
      while(i<lines.length&&/\|/.test(lines[i])&&lines[i].trim()!==''){rows.push(splitRow(lines[i]));i++;}
      out+='<table><thead><tr>'+head.map(c=>'<th>'+inline(c)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+r.map(c=>'<td>'+inline(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table>';continue;}
    if(/^\s*(?:[-*+]|\d+\.)\s+/.test(ln)){const ordered=/^\s*\d+\./.test(ln);let buf=[];
      while(i<lines.length&&/^\s*(?:[-*+]|\d+\.)\s+/.test(lines[i])){buf.push('<li>'+inline(lines[i].replace(/^\s*(?:[-*+]|\d+\.)\s+/,''))+'</li>');i++;}
      out+=(ordered?'<ol>':'<ul>')+buf.join('')+(ordered?'</ol>':'</ul>');continue;}
    let buf=[];while(i<lines.length&&!/^\s*$/.test(lines[i])&&!/^(#{1,4}\s|```|\s*>|\s*([-*_])\2{2,}\s*$)/.test(lines[i])
      &&!(/\|/.test(lines[i])&&i+1<lines.length&&/^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(lines[i+1]))
      &&!/^\s*(?:[-*+]|\d+\.)\s+/.test(lines[i])){buf.push(lines[i]);i++;}
    out+='<p>'+inline(buf.join(' '))+'</p>';}
  return out;}
function splitFrontmatter(md){const m=md.match(/^---\n([\s\S]*?)\n---\n?/);return m?md.slice(m[0].length):md;}
function firstH1(md){const m=md.match(/^#\s+(.+)$/m);return m?m[1].trim():'';}

// 글 본문을 발행용으로 정리:
//  1) 리드 블록(제목 # + 유형/관점 메타 인용 + 첫 --- )을 제거 — 제목/카테고리는 art-head가 담당
//  2) 남은 ATX heading을 한 단계 강등(#→##, ##→###, ###→####; h4 유지) — 페이지 h1은 하나만
//  코드펜스(```) 안은 건드리지 않는다.
function prepArticleBody(md){
  let lines = splitFrontmatter(md).replace(/\r/g,'').split('\n');
  while(lines.length && lines[0].trim()==='') lines.shift();
  if(/^#\s+/.test(lines[0]||'')){
    let hr=-1;
    for(let k=1;k<Math.min(lines.length,12);k++){ if(/^\s*([-*_])\1{2,}\s*$/.test(lines[k])){ hr=k; break; } }
    lines = hr>=0 ? lines.slice(hr+1) : lines.slice(1);
  }
  let fence=false, out=[];
  for(let ln of lines){
    if(/^```/.test(ln)) fence=!fence;
    if(!fence){ const h=ln.match(/^(#{1,4})(\s+.*)$/); if(h){ ln = '#'.repeat(Math.min(4,h[1].length+1)) + h[2]; } }
    out.push(ln);
  }
  while(out.length && out[0].trim()==='') out.shift();
  return out.join('\n');
}

// ---------- 공유 CSS / JS ----------
const CSS = `:root{--paper:#F7F6F1;--ink:#1A1712;--ink2:#2A2620;--accent:#0E9F6E;--accentStrong:#0A6E4C;--accent2:#C2703D;--info:#3B5BD9;--infoBg:#EEF1FB;--muted:#6B655B;--faint:#A49E90;--label:#8C887F;--line:#E6E4DB;--card:#FCFBF8;--soft:#EFEEE7;--shadow:0 1px 2px rgba(30,25,15,.03),0 8px 28px rgba(30,25,15,.05);--serif:-apple-system,"SF Pro Display","SF Pro Text","Apple SD Gothic Neo","Malgun Gothic","Segoe UI",Roboto,sans-serif;--sans:-apple-system,BlinkMacSystemFont,"SF Pro Text","SF Pro Display","Apple SD Gothic Neo","Malgun Gothic","Segoe UI",Roboto,sans-serif}
:root[data-theme=dark]{--paper:#131311;--ink:#F2F0E9;--ink2:#DAD8D0;--accent:#34C088;--accentStrong:#3FCF92;--accent2:#E0A06B;--info:#8CA0F0;--infoBg:#1C2030;--muted:#9A968C;--faint:#75726A;--line:#2E2C28;--card:#1C1B18;--soft:#242320;--shadow:0 1px 2px rgba(0,0,0,.4),0 10px 30px rgba(0,0,0,.4)}
@media (prefers-color-scheme:dark){:root:not([data-theme]){--paper:#131311;--ink:#F2F0E9;--ink2:#DAD8D0;--accent:#34C088;--accentStrong:#3FCF92;--accent2:#E0A06B;--info:#8CA0F0;--infoBg:#1C2030;--muted:#9A968C;--faint:#75726A;--line:#2E2C28;--card:#1C1B18;--soft:#242320;--shadow:0 1px 2px rgba(0,0,0,.4),0 10px 30px rgba(0,0,0,.4)}}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--paper);color:var(--ink);font-family:var(--sans);line-height:1.6;-webkit-font-smoothing:antialiased;letter-spacing:-.01em;word-break:keep-all;overflow-wrap:break-word}
a{color:inherit;text-decoration:none}
.nav{position:sticky;top:0;z-index:20;background:color-mix(in srgb,var(--paper) 88%,transparent);backdrop-filter:saturate(180%) blur(12px);border-bottom:1px solid var(--line)}
.nav-in{max-width:1080px;margin:0 auto;display:flex;align-items:center;gap:26px;padding:15px 24px}
.brand{display:flex;align-items:center;gap:10px;font-weight:800;font-size:18px;letter-spacing:-.4px}
.mark{width:30px;height:30px;border-radius:8px;background:var(--ink);position:relative;flex:none}
.mark::before{content:"";position:absolute;left:7px;top:7px;width:11px;height:11px;border-radius:50%;background:var(--paper)}
.mark::after{content:"";position:absolute;right:6px;top:9px;width:7px;height:10px;border-radius:3px;background:var(--accent)}
.navlinks{display:flex;gap:4px;margin-left:8px}
.navlinks a{font-size:14px;font-weight:600;color:var(--muted);padding:7px 12px;border-radius:9px;cursor:pointer}
.navlinks a:hover{color:var(--ink);background:var(--soft)}
.navlinks a.on{color:var(--accent)}
.nav-r{margin-left:auto;display:flex;gap:8px;align-items:center}
.icnbtn{cursor:pointer;border:1px solid var(--line);background:var(--card);color:var(--ink);height:36px;min-width:36px;padding:0 12px;border-radius:18px;font:inherit;font-size:13px;font-weight:600;box-shadow:var(--shadow)}
.icnbtn:hover{border-color:var(--accent)}
.wrap{max-width:1080px;margin:0 auto;padding:0 24px}
.mast{padding:52px 0 34px;border-bottom:1px solid var(--line);margin-bottom:40px}
.mast .kick{font-size:12.5px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:var(--accent)}
.mast h1{font-family:var(--serif);font-size:44px;line-height:1.14;letter-spacing:-.5px;margin:14px 0 12px;font-weight:800;text-wrap:balance}
.mast p{color:var(--muted);font-size:16px;max-width:620px}
.seclabel{display:flex;align-items:baseline;gap:10px;margin:8px 0 20px}
.seclabel b{font-family:var(--serif);font-size:22px;letter-spacing:-.3px}
.seclabel span{font-size:13px;color:var(--muted)}
.feat{display:grid;grid-template-columns:1.15fr .85fr;background:var(--card);border:1px solid var(--line);border-radius:20px;overflow:hidden;box-shadow:var(--shadow);margin-bottom:44px;transition:transform .15s,border-color .15s}
.feat:hover{transform:translateY(-2px);border-color:var(--accent)}
.feat .cover{background:linear-gradient(135deg,var(--accent),#0A5C40);min-height:280px;position:relative;overflow:hidden}
.feat .cover::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.22),transparent 55%)}
.feat .cover .em{position:absolute;left:26px;bottom:22px;font-size:58px}
.feat .body{padding:30px 32px;display:flex;flex-direction:column;justify-content:center}
.cat{display:inline-block;font-size:11.5px;font-weight:700;letter-spacing:.4px;color:var(--accent);background:color-mix(in srgb,var(--accent) 12%,transparent);padding:4px 10px;border-radius:20px;align-self:flex-start}
.feat h2{font-family:var(--serif);font-size:28px;line-height:1.28;letter-spacing:-.4px;margin:14px 0 12px;font-weight:800;text-wrap:balance}
.feat .dek{color:var(--muted);font-size:14.5px;line-height:1.6;margin-bottom:18px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.byline{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--muted)}
.byline .dot{width:3px;height:3px;border-radius:50%;background:var(--muted);opacity:.6}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-bottom:16px}
.post{background:var(--card);border:1px solid var(--line);border-radius:16px;overflow:hidden;box-shadow:var(--shadow);display:flex;flex-direction:column;transition:transform .15s,border-color .15s}
.post:hover{transform:translateY(-2px);border-color:var(--accent)}
.post .cover{height:130px;background:linear-gradient(135deg,var(--soft),var(--card));display:flex;align-items:center;justify-content:center;font-size:40px;border-bottom:1px solid var(--line)}
.post .body{padding:18px 20px 20px;display:flex;flex-direction:column;flex:1}
.post h3{font-family:var(--serif);font-size:18.5px;line-height:1.36;letter-spacing:-.3px;margin:10px 0 8px;font-weight:700;text-wrap:balance}
.post .dek{color:var(--muted);font-size:13px;line-height:1.55;flex:1;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:14px}
.empty{grid-column:1/-1;color:var(--muted);font-size:14px;background:var(--soft);border-radius:14px;padding:22px}
.news{margin:50px 0 10px;background:var(--ink);color:var(--paper);border-radius:20px;padding:34px;display:flex;align-items:center;gap:26px;flex-wrap:wrap}
.news h4{font-family:var(--serif);font-size:24px;letter-spacing:-.3px;margin-bottom:6px}
.news p{font-size:14px;opacity:.75;max-width:440px}
.news .cta{margin-left:auto}
.news a.pill{background:var(--paper);color:var(--ink);font-weight:700;font-size:14px;padding:12px 20px;border-radius:24px}
footer{margin:56px 0 40px;color:var(--muted);font-size:12.5px;text-align:center;line-height:1.9;border-top:1px solid var(--line);padding-top:26px}
main.article{max-width:728px;margin:34px auto 64px;padding:44px 52px 68px;background:var(--card);border:1px solid var(--line);border-radius:22px;box-shadow:var(--shadow)}
.back{display:inline-block;margin-bottom:24px}
.article .eyebrow{font-size:12.5px;font-weight:600;letter-spacing:.6px;color:var(--accent);text-transform:uppercase}
.article h1.title{font-size:40px;line-height:1.24;letter-spacing:-.028em;font-weight:800;margin:16px 0 16px;color:var(--ink);text-wrap:balance}
.article .standfirst{font-size:19.5px;line-height:1.5;color:var(--muted);font-weight:400;letter-spacing:-.01em;text-wrap:pretty}
.article .abyline{display:flex;align-items:center;gap:8px;font-size:14px;color:var(--faint);margin-top:16px}
.article .abyline .dot{width:3px;height:3px;border-radius:50%;background:var(--faint);opacity:.7}
.article>hr{border:none;border-top:1px solid var(--line);margin:28px 0}
.doc>p:first-of-type{font-size:19.5px;line-height:1.62;color:var(--ink);margin:6px 0 15px}
.doc p{margin:15px 0;font-size:18px;line-height:1.72;color:var(--ink2);letter-spacing:-.011em}
.doc strong{font-weight:700;color:var(--ink)}
.doc em{font-style:italic}
.doc h2{font-size:25px;font-weight:750;letter-spacing:-.026em;margin:48px 0 14px;color:var(--ink);line-height:1.36;text-wrap:balance;position:relative;padding-top:17px}
.doc h2::before{content:"";position:absolute;top:0;left:0;width:34px;height:3px;border-radius:3px;background:var(--accent)}
.doc h3{font-size:19px;margin:28px 0 8px;font-weight:700;color:var(--ink);line-height:1.4}
.doc h4{font-size:15px;margin:18px 0 6px;color:var(--muted)}
.doc ul{list-style:none;margin:14px 0;padding-left:2px}
.doc ul>li{position:relative;padding-left:22px;margin:6px 0;font-size:18px;line-height:1.66;color:var(--ink2)}
.doc ul>li::before{content:"";position:absolute;left:5px;top:.62em;width:6px;height:6px;border-radius:50%;background:var(--accent)}
.doc ol{margin:14px 0;padding-left:26px}.doc ol>li{margin:6px 0;font-size:18px;line-height:1.66;color:var(--ink2);padding-left:4px}
.doc ol>li::marker{color:var(--accentStrong);font-weight:700}
.doc blockquote{border-left:4px solid var(--accent2);background:color-mix(in srgb,var(--accent2) 8%,var(--card));border-radius:0 14px 14px 0;padding:16px 22px;margin:26px 0}
.doc blockquote p{margin:5px 0;font-size:18px;line-height:1.6;color:var(--ink2)}
.doc blockquote strong{color:var(--ink)}
.doc .callout{background:var(--infoBg);border-radius:14px;padding:15px 22px;margin:22px 0;font-size:17.5px;line-height:1.66;color:var(--ink2)}
.doc .callout .c-lead{font-weight:700;color:var(--info)}
.doc .callout strong{color:var(--ink)}
.doc hr{border:none;height:24px;margin:26px 0;text-align:center}
.doc hr::before{content:"* * *";letter-spacing:6px;color:var(--faint);font-size:14px}
.doc code{font-family:ui-monospace,Menlo,monospace;font-size:.87em;background:color-mix(in srgb,var(--accent) 10%,var(--soft));padding:2px 6px;border-radius:6px;color:var(--accentStrong)}
.doc pre{background:#211E17;color:#EDEBE4;border-radius:12px;padding:16px 18px;overflow-x:auto;margin:20px 0}.doc pre code{background:none;padding:0;color:inherit}
.doc table{border-collapse:separate;border-spacing:0;width:100%;margin:26px 0;font-size:15px;display:block;overflow-x:auto;border:1px solid var(--line);border-radius:12px}
.doc thead th{background:color-mix(in srgb,var(--accent) 13%,var(--card));color:var(--accentStrong);font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.3px}
.doc th,.doc td{border-bottom:1px solid var(--line);padding:12px 15px;text-align:left;vertical-align:top;color:var(--ink2)}
.doc tbody tr:nth-child(even){background:color-mix(in srgb,var(--soft) 60%,var(--card))}
.doc tbody tr:last-child td{border-bottom:none}
.doc a{color:var(--accentStrong);word-break:break-word;text-decoration:none;font-weight:500}
.doc a:hover{text-decoration:underline;text-decoration-color:var(--accent);text-underline-offset:3px}
.art-foot{margin:56px auto 0;padding-top:26px;border-top:1px solid var(--line);color:var(--muted);font-size:13.5px}
.art-foot a{color:var(--accent);font-weight:600}
.art-foot .next{display:block;margin-top:10px;font-size:18px;color:var(--ink);font-weight:700}
body.cat-research{--accent:#3B82F6;--accentStrong:#2563EB}
body.cat-tutorial{--accent:#E0891F;--accentStrong:#B45309}
@media(max-width:820px){.feat{grid-template-columns:1fr}.feat .cover{min-height:170px}.grid{grid-template-columns:1fr 1fr}.mast h1{font-size:34px}.navlinks{display:none}}
@media(max-width:640px){main.article{padding:30px 22px 56px;margin:16px 14px 40px;border-radius:16px}}
@media(max-width:540px){.grid{grid-template-columns:1fr}}`;

const ACSS = ``;   // 매거진 스타일 제거 — 클린 레이아웃은 CSS에 통합됨

const JS = `(function(){var root=document.documentElement,btn=document.getElementById('themeBtn');
var s=localStorage.getItem('vector-theme');if(s)root.setAttribute('data-theme',s);
function cur(){return root.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');}
function paint(){if(btn)btn.textContent=cur()==='dark'?'\\u2600\\uFE0F':'\\uD83C\\uDF19';}paint();
if(btn)btn.onclick=function(){var n=cur()==='dark'?'light':'dark';root.setAttribute('data-theme',n);localStorage.setItem('vector-theme',n);paint();};
// 홈에서만: 카테고리 필터 (data-cat-item이 있을 때만 하이재킹 — 글 페이지 nav는 일반 링크)
if(document.querySelector('[data-cat-item]')){
  var links=document.querySelectorAll('#navlinks a');function setc(c){links.forEach(function(a){a.classList.toggle('on',a.dataset.cat===c);});
  document.querySelectorAll('[data-cat-item]').forEach(function(el){el.style.display=(c==='전체'||el.dataset.catItem===c)?'':'none';});
  var feat=document.getElementById('feat-wrap');if(feat){feat.style.display=(c==='전체'||feat.dataset.catItem===c)?'':'none';}}
  links.forEach(function(a){a.onclick=function(e){e.preventDefault();setc(a.dataset.cat);};});
}})();`;

// ---------- 페이지 <head> 공통 ----------
function head({ title, desc, url, ogImg, type='website', published, cssHref, extra='' }) {
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2032%2032'%3E%3Crect%20width='32'%20height='32'%20rx='8'%20fill='%231A1712'/%3E%3Ccircle%20cx='12'%20cy='13'%20r='4.5'%20fill='%23F3F3EE'/%3E%3Crect%20x='19'%20y='10'%20width='5'%20height='8'%20rx='2'%20fill='%230E9F6E'/%3E%3C/svg%3E">
<title>${escHtml(title)}</title>
<meta name="description" content="${escAttr(desc)}">
<link rel="canonical" href="${escAttr(url)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta property="og:site_name" content="${BRAND}">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${escAttr(title)}">
<meta property="og:description" content="${escAttr(desc)}">
<meta property="og:url" content="${escAttr(url)}">
<meta property="og:image" content="${escAttr(ogImg)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="ko_KR">
${published ? `<meta property="article:published_time" content="${published}">\n` : ''}<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escAttr(title)}">
<meta name="twitter:description" content="${escAttr(desc)}">
<meta name="twitter:image" content="${escAttr(ogImg)}">
<link rel="alternate" type="application/rss+xml" title="${BRAND}" href="${SITE}/feed.xml">
<link rel="stylesheet" href="${cssHref}">
${extra}`;
}

const navHtml = (rel) => `<nav class="nav"><div class="nav-in">
<a class="brand" href="${rel}"><span class="mark"></span>${BRAND}</a>
<div class="navlinks" id="navlinks">
<a data-cat="전체" class="on" href="${rel}">홈</a>
<a data-cat="인사이트" href="${rel}">인사이트</a>
<a data-cat="리서치" href="${rel}">리서치</a>
<a data-cat="튜토리얼" href="${rel}">튜토리얼</a></div>
<div class="nav-r"><button class="icnbtn" id="themeBtn">🌙</button><a class="icnbtn" href="${rel}dashboard.html">대시보드 →</a></div>
</div></nav>`;

const bylineHtml = (p) => {
  const bits = [p.author||BRAND]; if(p.date) bits.push(p.date); if(p.readMin) bits.push(p.readMin+'분 읽기');
  return bits.map(b=>`<span>${escHtml(b)}</span>`).join('<span class="dot"></span>');
};

// ---------- 홈(index.html) ----------
function buildHome(posts) {
  const featured = posts[0];
  const rest = posts.slice(1);
  const featHtml = featured ? `<div id="feat-wrap" data-cat-item="${escAttr(catOf(featured))}"><a class="feat" href="p/${featured.id}/">
<div class="cover"><span class="em">${CAT_EMOJI[catOf(featured)]||'📝'}</span></div>
<div class="body"><span class="cat">${escHtml(catOf(featured))}</span>
<h2>${escHtml(featured.title)}</h2><div class="dek">${escHtml(featured.angle||'')}</div>
<div class="byline">${bylineHtml(featured)}</div></div></a></div>` : '';
  const cards = rest.map(p=>`<a class="post" data-cat-item="${escAttr(catOf(p))}" href="p/${p.id}/">
<div class="cover">${CAT_EMOJI[catOf(p)]||'📝'}</div>
<div class="body"><span class="cat">${escHtml(catOf(p))}</span>
<h3>${escHtml(p.title)}</h3><div class="dek">${escHtml(p.angle||'')}</div>
<div class="byline">${bylineHtml(p)}</div></div></a>`).join('\n');
  const gridInner = rest.length ? cards : `<div class="empty">첫 글이 위에 있습니다. 다음 글이 곧 올라옵니다.</div>`;
  const desc = '기계가 후보를 모으고 초안을 만들지만, 무엇을 쓸지 고르고·겪고·해석하는 건 사람입니다. 직접 돌려보고 남다르게 해석한 AI 자동화 소식.';

  const blogLd = {
    '@context':'https://schema.org','@type':'Blog','name':BRAND,'description':desc,
    'url':SITE+'/','inLanguage':'ko',
    'blogPost': posts.map(p=>({'@type':'BlogPosting','headline':p.title,'url':`${SITE}/p/${p.id}/`,'datePublished':isoKST(p.date)}))
  };

  return `<!DOCTYPE html>
<html lang="ko">
<head>
${head({title:`${BRAND} — AI 자동화 인사이트`, desc, url:SITE+'/', ogImg:SITE+'/assets/og-default.png', type:'website', cssHref:'assets/blog.css',
  extra:`<script type="application/ld+json">${JSON.stringify(blogLd)}</script>`})}
</head>
<body>
${navHtml('')}
<main class="wrap">
<header class="mast"><div class="kick">AI 자동화 인사이트</div>
<h1>직접 돌려보고,<br>남다르게 해석하는 AI 소식</h1>
<p>${escHtml(desc)}</p></header>
${featHtml}
<div class="seclabel"><b>최신 글</b><span>· ${posts.length}편</span></div>
<div class="grid" id="grid">${gridInner}</div>
<section class="news"><div><h4>매주, 중요한 것만</h4>
<p>지난 한 주의 중요한 AI 자동화 소식을 골라 정리해 드립니다. 전체 파이프라인은 운영 대시보드에서 볼 수 있어요.</p></div>
<div class="cta"><a class="pill" href="dashboard.html">대시보드 열기</a></div></section>
<footer>수집 → 선별 → 조사 → 관점 → 초안 → 검수 → 발행 · ${BRAND} 운영 시스템<br>© 2026 ${BRAND}</footer>
</main>
<script>${JS}</script>
</body>
</html>`;
}

// ---------- 글 페이지(p/<slug>/index.html) ----------
function addHeadingIds(html){ let n=0; return html.replace(/<h2>([\s\S]*?)<\/h2>/g, (m,t)=>{ n++; return `<h2 id="s${n}">${t}</h2>`; }); }

// '= …' 로 시작하는 '설명 착지' 문단을 콜아웃 박스로. 리드(첫 절)는 굵은 인포색.
function addCallouts(html){
  return html.replace(/<p>=\s+([\s\S]*?)<\/p>/g, (m, body) => {
    const mm = body.match(/^([\s\S]*?[,，:：])([\s\S]*)$/);
    const lead = mm ? mm[1] : body;
    const rest = mm ? mm[2] : '';
    return `<div class="callout"><span class="c-lead">= ${lead}</span>${rest}</div>`;
  });
}

function buildArticle(p, bodyMd, next) {
  const url = `${SITE}/p/${p.id}/`;
  const desc = metaDesc(p.angle || firstH1(bodyMd));
  const ogImg = `${SITE}/p/${p.id}/og.png`;
  const prepped = prepArticleBody(bodyMd);
  const bodyHtml = addCallouts(addHeadingIds(renderMD(prepped)));
  const ld = {
    '@context':'https://schema.org','@type':'BlogPosting',
    'headline':p.title,'description':desc,'inLanguage':'ko',
    'datePublished':isoKST(p.date),'dateModified':isoKST(p.date),
    'author':{'@type':'Organization','name':p.author||BRAND},
    'publisher':{'@type':'Organization','name':BRAND,'logo':{'@type':'ImageObject','url':SITE+'/assets/og-default.png'}},
    'mainEntityOfPage':{'@type':'WebPage','@id':url},
    'image':ogImg,'url':url
  };
  const crumbs = {
    '@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[
      {'@type':'ListItem','position':1,'name':'홈','item':SITE+'/'},
      {'@type':'ListItem','position':2,'name':catOf(p),'item':SITE+'/'},
      {'@type':'ListItem','position':3,'name':p.title,'item':url}
    ]};
  const heroCat = `${escHtml(catOf(p))}${p.readMin?`  ·  ${p.readMin}분 읽기`:''}${p.date?`  ·  ${escHtml(p.date)}`:''}`;
  const nextHtml = next
    ? `다음 읽을 글<a class="next" href="../${next.id}/">${escHtml(next.title)} →</a>`
    : `<a href="../../">← 다른 글 보기</a>`;
  return `<!DOCTYPE html>
<html lang="ko">
<head>
${head({title:`${p.title} · ${BRAND}`, desc, url, ogImg, type:'article', published:isoKST(p.date), cssHref:'../../assets/blog.css',
  extra:`<script type="application/ld+json">${JSON.stringify(ld)}</script>\n<script type="application/ld+json">${JSON.stringify(crumbs)}</script>`})}
</head>
<body${({'리서치':' class="cat-research"','튜토리얼':' class="cat-tutorial"'}[catOf(p)])||''}>
${navHtml('../../')}
<main class="article">
<a class="icnbtn back" href="../../">← 목록으로</a>
<div class="eyebrow">${heroCat}</div>
<h1 class="title">${escHtml(p.title)}</h1>
${p.angle?`<p class="standfirst">${escHtml(p.angle)}</p>`:''}
<div class="abyline">${bylineHtml(p)}</div>
<hr>
<article class="doc">${bodyHtml}</article>
<footer class="art-foot">${nextHtml}<div style="margin-top:14px">© 2026 ${BRAND} · <a href="../../dashboard.html">운영 대시보드</a></div></footer>
</main>
<script>${JS}</script>
</body>
</html>`;
}

// ---------- sitemap / robots / rss ----------
function buildSitemap(posts) {
  const urls = [`${SITE}/`, ...posts.map(p=>`${SITE}/p/${p.id}/`)];
  const items = urls.map((u,idx)=>{
    const lastmod = idx===0 ? (posts[0]?.date||'') : posts[idx-1].date;
    return `  <url><loc>${escXml(u)}</loc>${lastmod?`<lastmod>${lastmod}</lastmod>`:''}<changefreq>${idx===0?'daily':'monthly'}</changefreq><priority>${idx===0?'1.0':'0.8'}</priority></url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>\n`;
}
function buildRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`;
}
function buildFeed(posts) {
  const items = posts.map(p=>`  <item>
    <title>${escXml(p.title)}</title>
    <link>${SITE}/p/${p.id}/</link>
    <guid isPermaLink="true">${SITE}/p/${p.id}/</guid>
    <description>${escXml(metaDesc(p.angle||''))}</description>
    <category>${escXml(catOf(p))}</category>
    <pubDate>${rfc822(p.date)}</pubDate>
  </item>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${BRAND} — AI 자동화 인사이트</title>
  <link>${SITE}/</link>
  <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
  <description>${escXml(TAGLINE)}</description>
  <language>ko</language>
  <lastBuildDate>${posts[0]?rfc822(posts[0].date):new Date().toUTCString()}</lastBuildDate>
${items}
</channel>
</rss>\n`;
}

// ---------- OG 이미지 HTML(플레이라이트로 PNG 캡처) ----------
function ogHtml(title, cat) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#F3F3EE;font-family:"Apple SD Gothic Neo","Malgun Gothic",-apple-system,sans-serif;
    padding:70px 76px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
  .bar{position:absolute;left:0;top:0;width:14px;height:100%;background:#0E9F6E}
  .cat{display:inline-block;font-size:22px;font-weight:800;color:#0A6E4C;letter-spacing:1px}
  .title{font-size:64px;line-height:1.18;font-weight:800;color:#1A1712;letter-spacing:-1.5px;max-width:1000px;
    display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
  .foot{display:flex;align-items:center;gap:14px}
  .mk{width:44px;height:44px;border-radius:12px;background:#1A1712;position:relative}
  .mk::before{content:"";position:absolute;left:11px;top:11px;width:15px;height:15px;border-radius:50%;background:#F3F3EE}
  .mk::after{content:"";position:absolute;right:9px;top:13px;width:9px;height:14px;border-radius:4px;background:#0E9F6E}
  .bn{font-size:30px;font-weight:800;color:#1A1712}.bn small{display:block;font-size:16px;font-weight:500;color:#6B655B}
  </style></head><body>
  <div class="bar"></div>
  <div><div class="cat">${escHtml(cat)}</div></div>
  <div class="title">${escHtml(title)}</div>
  <div class="foot"><div class="mk"></div><div class="bn">Vector<small>AI 자동화 인사이트</small></div></div>
  </body></html>`;
}

// ---------- 실행 ----------
const posts = JSON.parse(read('posts.json')).posts
  .filter(p => p.stage === '발행')
  .sort((a,b)=>(b.date||'').localeCompare(a.date||''));

console.log(`발행 글 ${posts.length}편 빌드`);

// 공유 자산
write('assets/blog.css', CSS + ACSS);

// 글 페이지 + 본문
const ogJobs = [];
for (let i = 0; i < posts.length; i++) {
  const p = posts[i];
  const next = posts[i + 1] || posts[0] && (posts.length > 1 ? posts[(i + 1) % posts.length] : null);
  const mdPath = (p.versions && p.versions[0] && p.versions[0].path) || p.article;
  const md = read(mdPath);
  write(`p/${p.id}/index.html`, buildArticle(p, md, posts.length > 1 ? next : null));
  ogJobs.push({ id:p.id, title:p.title, cat:catOf(p) });
  console.log(`  ✓ p/${p.id}/index.html`);
}

// 홈 + sitemap/robots/feed
write('index.html', buildHome(posts));
write('sitemap.xml', buildSitemap(posts));
write('robots.txt', buildRobots());
write('feed.xml', buildFeed(posts));
console.log('  ✓ index.html · sitemap.xml · robots.txt · feed.xml');

// OG 이미지(PNG) — Playwright 있으면 생성
try {
  const { chromium } = require('/opt/node22/lib/node_modules/playwright');
  const CHROME = ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome','/opt/pw-browsers/chromium/chrome-linux/chrome']
    .find(pp => fs.existsSync(pp));
  const b = await chromium.launch(CHROME ? { executablePath: CHROME } : {});
  const pg = await b.newPage();
  await pg.setViewportSize({ width: 1200, height: 630 });
  // 기본 OG
  await pg.setContent(ogHtml(`${BRAND} — 직접 돌려보고, 남다르게 해석하는 AI 소식`, 'AI 자동화 인사이트'), { waitUntil:'load' });
  await pg.screenshot({ path: path.join(ROOT,'assets/og-default.png') });
  console.log('  ✓ assets/og-default.png');
  for (const j of ogJobs) {
    await pg.setContent(ogHtml(j.title, j.cat), { waitUntil:'load' });
    await pg.screenshot({ path: path.join(ROOT, `p/${j.id}/og.png`) });
    console.log(`  ✓ p/${j.id}/og.png`);
  }
  await b.close();
} catch (e) {
  console.log('  ⚠ OG 이미지 생성 건너뜀(Playwright 없음): ' + e.message);
}

console.log('빌드 완료.');
