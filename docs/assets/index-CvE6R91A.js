const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/BlogPostView-BRSuJwJm.js","assets/vendor-4AoAK_Kz.js","assets/markdown-JKvyS0Pp.js","assets/BlogPostView-D6dsD-lg.css","assets/AboutView-Dtdtp0mw.js","assets/AboutView-CSIvawM9.css"])))=>i.map(i=>d[i]);
import{e as H,r as _,m as N,w as D,o as P,c as m,a as e,b as S,d as v,f,u as y,R as b,g as Q,h as g,t as w,n as R,F as A,i as E,j as L,k as U,l as V,v as W,p as z,q as X,s as G,x as K,y as Y}from"./vendor-4AoAK_Kz.js";import{m as J}from"./markdown-JKvyS0Pp.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function a(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(n){if(n.ep)return;n.ep=!0;const t=a(n);fetch(n.href,t)}})();/*!
 * pinia v3.0.2
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Z=Symbol();var O;(function(c){c.direct="direct",c.patchObject="patch object",c.patchFunction="patch function"})(O||(O={}));function ee(){const c=H(!0),s=c.run(()=>_({}));let a=[],l=[];const n=N({install(t){n._a=t,t.provide(Z,n),t.config.globalProperties.$pinia=n,l.forEach(o=>a.push(o)),l=[]},use(t){return this._a?a.push(t):l.push(t),this},_p:a,_a:null,_e:c,_s:new Map,state:s});return n}const te={class:"app-container"},ne={class:"sci-fi-nav"},se={class:"nav-content"},re={class:"nav-links"},ae={class:"icon-container"},oe={key:0,class:"theme-icon sun-icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},ie={key:1,class:"theme-icon moon-icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},le={class:"main-content"},ce={__name:"App",setup(c){const s=_("dark"),a=()=>{s.value=s.value==="dark"?"light":"dark"};return D(s,l=>{document.documentElement.setAttribute("data-theme",l),localStorage.setItem("theme",l)}),P(()=>{const l=localStorage.getItem("theme");l&&(s.value=l),document.documentElement.setAttribute("data-theme",s.value)}),(l,n)=>(g(),m("div",te,[e("nav",ne,[e("div",se,[v(y(b),{to:"/",class:"nav-logo"},{default:f(()=>n[0]||(n[0]=[e("span",{class:"logo-text","data-text":"XCT"},"XCT",-1),e("span",{class:"logo-glow"},null,-1),e("span",{class:"logo-border"},null,-1)])),_:1}),e("div",re,[v(y(b),{to:"/",class:"nav-link"},{default:f(()=>n[1]||(n[1]=[e("span",{class:"link-text","data-text":"Home"},"Home",-1),e("span",{class:"link-underline"},null,-1)])),_:1}),v(y(b),{to:"/blog",class:"nav-link"},{default:f(()=>n[2]||(n[2]=[e("span",{class:"link-text","data-text":"Blog"},"Blog",-1),e("span",{class:"link-underline"},null,-1)])),_:1}),v(y(b),{to:"/about",class:"nav-link"},{default:f(()=>n[3]||(n[3]=[e("span",{class:"link-text","data-text":"About"},"About",-1),e("span",{class:"link-underline"},null,-1)])),_:1})]),e("button",{onClick:a,class:"theme-toggle-button","aria-label":"Toggle theme"},[e("div",ae,[s.value==="dark"?(g(),m("svg",oe,n[4]||(n[4]=[S('<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>',9)]))):(g(),m("svg",ie,n[5]||(n[5]=[e("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"},null,-1)])))])])])]),e("main",le,[v(y(Q))]),n[6]||(n[6]=S('<footer class="sci-fi-footer"><div class="footer-content"><p class="footer-text">© 2024 XCT - Exploring the Future</p><div class="footer-links"><a href="#" class="footer-link"><span class="link-text" data-text="GitHub">GitHub</span><span class="link-underline"></span></a><a href="#" class="footer-link"><span class="link-text" data-text="Twitter">Twitter</span><span class="link-underline"></span></a><a href="#" class="footer-link"><span class="link-text" data-text="Contact">Contact</span><span class="link-underline"></span></a></div></div></footer>',1))]))}},ue="modulepreload",de=function(c){return"/"+c},M={},$=function(s,a,l){let n=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),p=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));n=Promise.allSettled(a.map(h=>{if(h=de(h),h in M)return;M[h]=!0;const k=h.endsWith(".css"),C=k?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${C}`))return;const d=document.createElement("link");if(d.rel=k?"stylesheet":ue,k||(d.as="script"),d.crossOrigin="",d.href=h,p&&d.setAttribute("nonce",p),document.head.appendChild(d),k)return new Promise((T,u)=>{d.addEventListener("load",T),d.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${h}`)))})}))}function t(o){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=o,window.dispatchEvent(p),!p.defaultPrevented)throw o}return n.then(o=>{for(const p of o||[])p.status==="rejected"&&t(p.reason);return s().catch(t)})},j=(c,s)=>{const a=c.__vccOpts||c;for(const[l,n]of s)a[l]=n;return a},pe={class:"home-container"},me={class:"hero-section"},ge={class:"hero-content"},he={class:"main-title"},ve={class:"typed-text"},ye={class:"sub-title"},fe={class:"hero-buttons"},be={class:"geometric-element"},we={class:"grid-container"},_e={class:"featured-section"},ke={class:"featured-cards"},Se={class:"feature-card"},xe={class:"feature-card"},Ce={class:"feature-card"},Te={class:"latest-section"},Ae={class:"latest-grid"},Ee={class:"latest-article featured"},Re={class:"latest-article"},Ie={class:"latest-article"},Pe={class:"view-all-container"},I="EXPLORING THE DIGITAL FRONTIER",qe={__name:"HomeView",setup(c){const s=_(""),a=_("SECURITY • TECHNOLOGY • FINANCE");let l=null;return P(()=>{let n=0;l=setInterval(()=>{n<I.length?(s.value=I.substring(0,n+1),n++):clearInterval(l)},100)}),(n,t)=>(g(),m("div",pe,[e("section",me,[e("div",ge,[e("h1",he,[e("span",ve,w(s.value),1),e("span",{class:R(["cursor",{typing:s.value.length<I.length}])},null,2)]),e("p",ye,w(a.value),1),e("div",fe,[v(y(b),{to:"/blog",class:"hero-button primary"},{default:f(()=>t[0]||(t[0]=[e("span",{class:"button-text"},"EXPLORE BLOG",-1),e("span",{class:"button-arrow"},"→",-1)])),_:1}),v(y(b),{to:"/about",class:"hero-button secondary"},{default:f(()=>t[1]||(t[1]=[e("span",{class:"button-text"},"ABOUT",-1),e("span",{class:"button-arrow"},"→",-1)])),_:1})])]),e("div",be,[e("div",we,[(g(),m(A,null,E(50,o=>e("div",{key:o,class:"grid-cell"})),64))])])]),e("section",_e,[t[8]||(t[8]=e("h2",{class:"section-title"},[L("FEATURED "),e("span",{class:"highlight"},"TOPICS")],-1)),e("div",ke,[e("div",Se,[t[3]||(t[3]=S('<div class="card-icon" data-v-49a483ec><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-49a483ec><rect x="3" y="11" width="18" height="11" rx="2" ry="2" data-v-49a483ec></rect><path d="M7 11V7a5 5 0 0 1 10 0v4" data-v-49a483ec></path></svg></div><h3 class="card-title" data-v-49a483ec>Cybersecurity</h3><p class="card-description" data-v-49a483ec> Explore the latest in digital security, penetration testing, and threat protection. </p>',3)),v(y(b),{to:"/blog",class:"card-link"},{default:f(()=>t[2]||(t[2]=[e("span",null,"Learn More",-1),e("span",{class:"link-arrow"},"→",-1)])),_:1})]),e("div",xe,[t[5]||(t[5]=S('<div class="card-icon" data-v-49a483ec><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-49a483ec><polyline points="16 18 22 12 16 6" data-v-49a483ec></polyline><polyline points="8 6 2 12 8 18" data-v-49a483ec></polyline></svg></div><h3 class="card-title" data-v-49a483ec>Technology</h3><p class="card-description" data-v-49a483ec> Analysis and tutorials on cutting-edge tech and innovation. </p>',3)),v(y(b),{to:"/blog",class:"card-link"},{default:f(()=>t[4]||(t[4]=[e("span",null,"Learn More",-1),e("span",{class:"link-arrow"},"→",-1)])),_:1})]),e("div",Ce,[t[7]||(t[7]=S('<div class="card-icon" data-v-49a483ec><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-49a483ec><line x1="12" y1="1" x2="12" y2="23" data-v-49a483ec></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" data-v-49a483ec></path></svg></div><h3 class="card-title" data-v-49a483ec>Finance</h3><p class="card-description" data-v-49a483ec> Deep dives into financial systems, blockchain, and cryptocurrency analysis. </p>',3)),v(y(b),{to:"/blog",class:"card-link"},{default:f(()=>t[6]||(t[6]=[e("span",null,"Learn More",-1),e("span",{class:"link-arrow"},"→",-1)])),_:1})])])]),e("section",Te,[t[16]||(t[16]=e("h2",{class:"section-title"},[L("LATEST "),e("span",{class:"highlight"},"INSIGHTS")],-1)),e("div",Ae,[e("article",Ee,[t[10]||(t[10]=S('<div class="article-meta" data-v-49a483ec><span class="article-category" data-v-49a483ec>TECHNOLOGY</span><span class="article-date" data-v-49a483ec>APR 20, 2024</span></div><h3 class="article-title" data-v-49a483ec>The Future of Quantum Computing and Its Implications</h3><p class="article-excerpt" data-v-49a483ec> An exploration of how quantum computing is set to revolutionize computational capability and the security concerns it presents. </p>',3)),v(y(b),{to:"/blog/future-of-quantum-computing",class:"article-link"},{default:f(()=>t[9]||(t[9]=[e("span",null,"Read Full Article",-1),e("span",{class:"link-arrow"},"→",-1)])),_:1})]),e("article",Re,[t[12]||(t[12]=S('<div class="article-meta" data-v-49a483ec><span class="article-category" data-v-49a483ec>HACKING</span><span class="article-date" data-v-49a483ec>APR 18, 2024</span></div><h3 class="article-title" data-v-49a483ec>Understanding Web Security Fundamentals</h3><p class="article-excerpt" data-v-49a483ec> A comprehensive guide to the foundations of web security and common vulnerabilities. </p>',3)),v(y(b),{to:"/blog/understanding-web-security",class:"article-link"},{default:f(()=>t[11]||(t[11]=[e("span",null,"Read Full Article",-1),e("span",{class:"link-arrow"},"→",-1)])),_:1})]),e("article",Ie,[t[14]||(t[14]=S('<div class="article-meta" data-v-49a483ec><span class="article-category" data-v-49a483ec>FINANCE</span><span class="article-date" data-v-49a483ec>APR 16, 2024</span></div><h3 class="article-title" data-v-49a483ec>Blockchain in Modern Finance</h3><p class="article-excerpt" data-v-49a483ec> How blockchain technology is transforming the financial industry... </p>',3)),v(y(b),{to:"/blog/blockchain-in-modern-finance",class:"article-link"},{default:f(()=>t[13]||(t[13]=[e("span",null,"Read Full Article",-1),e("span",{class:"link-arrow"},"→",-1)])),_:1})])]),e("div",Pe,[v(y(b),{to:"/blog",class:"view-all-link"},{default:f(()=>t[15]||(t[15]=[e("span",null,"VIEW ALL ARTICLES",-1),e("span",{class:"link-arrow"},"→",-1)])),_:1})])]),t[17]||(t[17]=S('<section class="newsletter-section" data-v-49a483ec><div class="newsletter-content" data-v-49a483ec><h2 class="section-title" data-v-49a483ec>STAY <span class="highlight" data-v-49a483ec>INFORMED</span></h2><p class="newsletter-description" data-v-49a483ec> Subscribe to receive the latest updates and insights directly to your inbox. </p><form class="newsletter-form" data-v-49a483ec><input type="email" placeholder="Your email address" class="newsletter-input" data-v-49a483ec><button type="submit" class="newsletter-button" data-v-49a483ec>SUBSCRIBE</button></form></div></section>',1))]))}},Fe=j(qe,[["__scopeId","data-v-49a483ec"]]),Le=`---\r
title: Mobile App Penetration Testing\r
date: 2024-04-15\r
category: hacking\r
subCategory: Mobile\r
image: /images/mobile-security.jpg\r
excerpt: Techniques and tools for assessing mobile application security.\r
tags: [security, mobile, penetration-testing]\r
author: XCT Team\r
---\r
\r
# Mobile App Penetration Testing\r
\r
## Introduction\r
\r
Mobile application security is increasingly important as more sensitive operations move to mobile platforms. This article explores the methodologies and tools used in mobile app penetration testing.\r
\r
## Testing Methodologies\r
\r
### Static Analysis\r
\r
Static analysis involves examining the application's code without executing it. This can reveal potential vulnerabilities in the source code.\r
\r
\`\`\`java\r
// Example of insecure storage in Android\r
SharedPreferences prefs = getSharedPreferences("user_data", MODE_WORLD_READABLE);\r
prefs.edit().putString("password", userPassword).apply();\r
\`\`\`\r
\r
#### Common Tools:\r
\r
- MobSF (Mobile Security Framework)\r
- QARK (Quick Android Review Kit)\r
- AndroBugs Framework\r
\r
### Dynamic Analysis\r
\r
Dynamic analysis involves testing the application while it's running. This helps identify runtime vulnerabilities and security issues.\r
\r
\`\`\`bash\r
# Example of using Frida for dynamic instrumentation\r
frida -U -l script.js com.example.app\r
\`\`\`\r
\r
#### Common Tools:\r
\r
- Frida\r
- Objection\r
- Drozer\r
\r
## Common Mobile Vulnerabilities\r
\r
### Insecure Data Storage\r
\r
Many mobile apps store sensitive data insecurely, making it accessible to attackers.\r
\r
#### Prevention:\r
\r
- Use Android Keystore or iOS Keychain\r
- Implement proper encryption\r
- Follow platform-specific security guidelines\r
\r
### Insecure Communication\r
\r
Apps often transmit data without proper encryption or validation.\r
\r
#### Prevention:\r
\r
- Implement certificate pinning\r
- Use TLS with proper configuration\r
- Validate server certificates\r
\r
## Best Practices\r
\r
1. **Regular Security Testing**\r
\r
   - Schedule periodic penetration tests\r
   - Include both automated and manual testing\r
   - Test on different device configurations\r
\r
2. **Secure Development**\r
\r
   - Follow OWASP Mobile Security Guidelines\r
   - Implement secure coding practices\r
   - Use security-focused libraries\r
\r
3. **User Education**\r
   - Educate users about security risks\r
   - Provide clear security guidelines\r
   - Implement proper error handling\r
\r
## Conclusion\r
\r
Mobile app security requires a comprehensive approach that combines automated tools with manual testing. By following these methodologies and best practices, developers can significantly improve the security of their mobile applications.\r
\r
## References\r
\r
1. OWASP Mobile Security Testing Guide: [https://owasp.org/www-project-mobile-security-testing-guide/](https://owasp.org/www-project-mobile-security-testing-guide/)\r
2. Android Security Guidelines: [https://developer.android.com/topic/security](https://developer.android.com/topic/security)\r
3. iOS Security Guide: [https://support.apple.com/guide/security/welcome/web](https://support.apple.com/guide/security/welcome/web)\r
`,Oe=`---\r
title: Understanding Modern Cybersecurity\r
date: 2024-04-18\r
category: hacking\r
image: /images/cybersecurity.jpg\r
excerpt: An in-depth look at current cybersecurity trends and best practices.\r
---\r
\r
# Understanding Modern Cybersecurity\r
\r
## Introduction\r
\r
In today's digital age, cybersecurity has become more important than ever. With the increasing sophistication of cyber threats, understanding the fundamentals of cybersecurity is crucial for both individuals and organizations.\r
\r
## Current Trends\r
\r
The landscape of cybersecurity is constantly evolving. Here are some key trends to watch:\r
\r
1. **AI-Powered Security**: Machine learning algorithms are being used to detect and prevent cyber threats in real-time.\r
2. **Zero Trust Architecture**: Moving away from traditional perimeter-based security to a more granular approach.\r
3. **Cloud Security**: As more organizations move to the cloud, securing cloud infrastructure has become paramount.\r
\r
## Best Practices\r
\r
To maintain strong cybersecurity:\r
\r
- Regularly update software and systems\r
- Use strong, unique passwords\r
- Enable two-factor authentication\r
- Be cautious of phishing attempts\r
- Regular security audits and assessments\r
\r
## Conclusion\r
\r
Staying informed about cybersecurity trends and implementing best practices is essential in our increasingly digital world. By understanding these concepts, we can better protect ourselves and our organizations from potential threats.\r
`,Me=`---\r
title: Understanding Web Security Fundamentals\r
date: 2024-04-18\r
category: hacking\r
subCategory: Web Security\r
image: /images/web-security.jpg\r
excerpt: An in-depth look at common web vulnerabilities and defenses.\r
tags: [security, web, vulnerabilities]\r
author: XCT Team\r
---\r
\r
# Understanding Web Security Fundamentals\r
\r
## Introduction\r
\r
In today's digital landscape, web security is more critical than ever. With the increasing sophistication of cyber threats, understanding the fundamentals of web security is essential for developers, administrators, and businesses alike. This article explores the common vulnerabilities that affect web applications and the best practices to mitigate these risks.\r
\r
## Common Web Vulnerabilities\r
\r
### Cross-Site Scripting (XSS)\r
\r
XSS attacks occur when an attacker injects malicious scripts into content that is then served to other users. These scripts can steal session cookies, redirect users to malicious sites, or manipulate the page content.\r
\r
#### Types of XSS:\r
\r
1. **Reflected XSS**: The malicious script comes from the current HTTP request\r
2. **Stored XSS**: The malicious script is stored on the target server\r
3. **DOM-based XSS**: The vulnerability exists in client-side code\r
\r
#### Prevention:\r
\r
- Validate and sanitize user input\r
- Implement Content Security Policy (CSP) headers\r
- Use proper output encoding\r
- Employ modern frameworks that automatically escape content\r
\r
### SQL Injection\r
\r
SQL injection occurs when an attacker can insert malicious SQL code into queries that are executed by the application's database. This can lead to unauthorized data access, data modification, or even complete system compromise.\r
\r
\`\`\`sql\r
-- Example vulnerable query:\r
"SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";\r
\r
-- If username is: admin' --\r
-- The query becomes:\r
"SELECT * FROM users WHERE username = 'admin' --' AND password = ''";\r
\`\`\`\r
\r
#### Prevention:\r
\r
- Use parameterized queries or prepared statements\r
- Implement an ORM (Object-Relational Mapping) layer\r
- Apply the principle of least privilege to database accounts\r
- Validate and sanitize user inputs\r
\r
### Cross-Site Request Forgery (CSRF)\r
\r
CSRF attacks trick users into performing actions they didn't intend to do by exploiting their authenticated session on a website.\r
\r
#### Prevention:\r
\r
- Implement anti-CSRF tokens\r
- Use SameSite cookie attribute\r
- Verify the origin and referrer headers\r
- Require re-authentication for sensitive actions\r
\r
## Security Best Practices\r
\r
### Implement HTTPS\r
\r
Always use HTTPS to encrypt data in transit between clients and servers. This prevents eavesdropping and man-in-the-middle attacks.\r
\r
\`\`\`bash\r
# Example HTTPS configuration in Nginx\r
server {\r
    listen 443 ssl;\r
    server_name example.com;\r
\r
    ssl_certificate /path/to/certificate.crt;\r
    ssl_certificate_key /path/to/private.key;\r
\r
    # Modern SSL configuration\r
    ssl_protocols TLSv1.2 TLSv1.3;\r
    ssl_ciphers HIGH:!aNULL:!MD5;\r
    ssl_prefer_server_ciphers on;\r
}\r
\`\`\`\r
\r
### Use Secure Headers\r
\r
Implement security headers to provide an additional layer of protection:\r
\r
\`\`\`\r
Content-Security-Policy: default-src 'self'\r
X-Content-Type-Options: nosniff\r
X-Frame-Options: DENY\r
X-XSS-Protection: 1; mode=block\r
Strict-Transport-Security: max-age=31536000; includeSubDomains\r
\`\`\`\r
\r
### Regular Security Audits\r
\r
Conduct regular security assessments and penetration testing to identify vulnerabilities before attackers do.\r
\r
## Conclusion\r
\r
Web security is not a one-time implementation but a continuous process. By understanding these fundamental vulnerabilities and implementing robust security practices, developers can significantly reduce the risk of security breaches and protect both their applications and users.\r
\r
Remember that security is a shared responsibility, and staying informed about emerging threats and defense techniques is essential in this ever-evolving landscape.\r
\r
## References\r
\r
1. OWASP Top Ten Project: [https://owasp.org/www-project-top-ten/](https://owasp.org/www-project-top-ten/)\r
2. Mozilla Web Security Guidelines: [https://infosec.mozilla.org/guidelines/web_security](https://infosec.mozilla.org/guidelines/web_security)\r
3. NIST Cybersecurity Framework: [https://www.nist.gov/cyberframework](https://www.nist.gov/cyberframework)\r
`,$e=`---\r
title: The Future of Quantum Computing\r
date: 2024-04-17\r
category: technology\r
subCategory: Quantum Computing\r
image: /images/quantum.jpg\r
excerpt: Exploring the potential and challenges of quantum computing.\r
tags: [quantum, computing, future-tech]\r
author: XCT Team\r
---\r
\r
# The Future of Quantum Computing\r
\r
## Introduction\r
\r
Quantum computing represents a revolutionary approach to computation, leveraging the principles of quantum mechanics to solve problems that are intractable for classical computers. This article explores the current state and future prospects of this groundbreaking technology.\r
\r
## Current State\r
\r
Today's quantum computers are still in their infancy, with most systems having fewer than 100 qubits. However, significant progress has been made in recent years.\r
\r
### Key Players\r
\r
1. **IBM Quantum**\r
\r
   - 127-qubit Eagle processor\r
   - Quantum volume of 128\r
   - Accessible via cloud platform\r
\r
2. **Google Quantum AI**\r
\r
   - 72-qubit Bristlecone processor\r
   - Achieved quantum supremacy in 2019\r
   - Focus on error correction\r
\r
3. **Rigetti Computing**\r
   - 80-qubit Aspen-M processor\r
   - Hybrid quantum-classical approach\r
   - Cloud access available\r
\r
## Technical Challenges\r
\r
### Quantum Decoherence\r
\r
One of the biggest challenges is maintaining quantum states long enough to perform computations.\r
\r
\`\`\`python\r
# Example of quantum circuit with error correction\r
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister\r
\r
# Create quantum and classical registers\r
qr = QuantumRegister(3, 'q')\r
cr = ClassicalRegister(3, 'c')\r
circuit = QuantumCircuit(qr, cr)\r
\r
# Implement error correction\r
circuit.h(qr[0])\r
circuit.cx(qr[0], qr[1])\r
circuit.cx(qr[0], qr[2])\r
\`\`\`\r
\r
### Error Correction\r
\r
Quantum error correction is essential for building reliable quantum computers:\r
\r
1. Surface code\r
2. Topological codes\r
3. Concatenated codes\r
\r
## Future Applications\r
\r
### Cryptography\r
\r
Quantum computers could break current encryption methods but also enable new quantum-safe cryptography.\r
\r
### Drug Discovery\r
\r
Simulating molecular interactions for drug development.\r
\r
### Optimization\r
\r
Solving complex optimization problems in logistics and finance.\r
\r
## Conclusion\r
\r
While quantum computing is still in its early stages, the potential applications are vast. Continued research and development will be crucial in overcoming current limitations and realizing the full potential of this technology.\r
\r
## References\r
\r
1. IBM Quantum Computing: [https://www.ibm.com/quantum-computing](https://www.ibm.com/quantum-computing)\r
2. Google Quantum AI: [https://quantumai.google/](https://quantumai.google/)\r
3. Quantum Computing Report: [https://quantumcomputingreport.com/](https://quantumcomputingreport.com/)\r
`;async function q(){const c=[],s={};try{console.log("Starting to load blog posts...");const a=Object.assign({"/src/content/blog/hacking/mobile/mobile-app-pen-testing.md":Le,"/src/content/blog/hacking/understanding-modern-cybersecurity.md":Oe,"/src/content/blog/hacking/web-security/understanding-web-security.md":Me,"/src/content/blog/technology/quantum-computing/future-of-quantum-computing.md":$e});console.log("Found modules:",Object.keys(a));for(const n in a){console.log("Processing file:",n);const t=a[n];console.log("File content:",t.substring(0,100));const o=t.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);if(!o){console.log("No frontmatter found in:",n);continue}const p=o[1];console.log("Frontmatter found:",p);const h={};p.split(`
`).forEach(T=>{const[u,...i]=T.split(":");if(u&&i.length){const r=i.join(":").trim();try{h[u.trim()]=JSON.parse(r)}catch{h[u.trim()]=r}}});const k=n.replace("/src/content/blog/","").replace(".md","").replace(/\//g,"-"),C=t.slice(o[0].length).trim(),d={...h,slug:k,content:J(C),path:n};console.log("Created post data:",d),c.push(d),s[d.category]||(s[d.category]={id:d.category,name:B(d.category),subCategories:new Set}),d.subCategory&&s[d.category].subCategories.add(d.subCategory)}const l=Object.values(s).map(n=>({...n,subCategories:Array.from(n.subCategories).map(B).sort()}));return l.unshift({id:"all",name:"All",subCategories:[]}),console.log("Final posts:",c),console.log("Final categories:",l),{posts:c,categories:l}}catch(a){return console.error("Error loading blog posts:",a),{posts:[],categories:[]}}}function B(c){return c.split("-").map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join(" ")}async function yt(c){const{posts:s}=await q();return s.find(a=>a.slug===c)}async function Be(c=5){const{posts:s}=await q();return s.sort((a,l)=>new Date(l.date)-new Date(a.date)).slice(0,c)}const De={class:"blog-container"},je={class:"sidebar"},He={class:"sidebar-content"},Ne={class:"sidebar-header"},Qe={class:"search-box"},Ue={class:"category-list"},Ve=["onClick"],We=["data-text"],ze=["onClick"],Xe=["data-text"],Ge={class:"recent-posts"},Ke={class:"post-list"},Ye=["onClick"],Je=["data-text"],Ze={class:"post-date"},et={class:"main-content"},tt={class:"posts-list"},nt=["onClick"],st={class:"post-content"},rt={class:"post-header"},at=["data-text"],ot={class:"post-meta"},it={class:"date"},lt={class:"category"},ct={class:"subcategory"},ut={class:"article-excerpt"},dt={__name:"BlogView",setup(c){const s=z(),a=_(""),l=_([]),n=_([]),t=_([]),o=_("all"),p=_("");P(async()=>{const{posts:u,categories:i}=await q();l.value=u,n.value=i,t.value=await Be(5)}),D(o,()=>{p.value=""});const h=U(()=>{let u=l.value;if(o.value!=="all"&&(u=u.filter(i=>i.category===o.value)),p.value&&(u=u.filter(i=>i.subCategory===p.value)),a.value){const i=a.value.toLowerCase();u=u.filter(r=>r.title.toLowerCase().includes(i)||r.excerpt.toLowerCase().includes(i)||r.subCategory&&r.subCategory.toLowerCase().includes(i))}return u}),k=u=>{const i={year:"numeric",month:"short",day:"numeric"};return new Date(u).toLocaleDateString(void 0,i)},C=u=>{s.push(`/blog/${u}`)},d=u=>{o.value=u},T=u=>{p.value=u};return(u,i)=>(g(),m("div",De,[e("aside",je,[e("div",He,[e("div",Ne,[i[1]||(i[1]=e("h2",null,"Quick Access",-1)),e("div",Qe,[V(e("input",{type:"text","onUpdate:modelValue":i[0]||(i[0]=r=>a.value=r),placeholder:"Search posts...",class:"search-input"},null,512),[[W,a.value]])])]),e("div",Ue,[(g(!0),m(A,null,E(n.value,r=>(g(),m("div",{key:r.id,class:"category-item-wrapper"},[e("button",{class:R([{active:o.value===r.id},"category-button"]),onClick:x=>d(r.id)},[e("span",{class:"button-text","data-text":r.name},w(r.name),9,We),i[2]||(i[2]=e("span",{class:"button-glow"},null,-1))],10,Ve),r.id!=="all"&&r.subCategories.length>0?(g(),m("div",{key:0,class:R(["subcategory-list",{visible:o.value===r.id}])},[(g(!0),m(A,null,E(r.subCategories,x=>(g(),m("button",{key:x,class:R([{active:p.value===x},"subcategory-button"]),onClick:gt=>T(x)},[e("span",{class:"button-text","data-text":x},w(x),9,Xe),i[3]||(i[3]=e("span",{class:"button-glow"},null,-1))],10,ze))),128))],2)):X("",!0)]))),128))]),e("div",Ge,[i[4]||(i[4]=e("h3",null,"Recent Posts",-1)),e("ul",Ke,[(g(!0),m(A,null,E(t.value,r=>(g(),m("li",{key:r.id,onClick:x=>C(r.slug),class:"post-item"},[e("span",{class:"post-title","data-text":r.title},w(r.title),9,Je),e("span",Ze,w(k(r.date)),1)],8,Ye))),128))])])])]),e("main",et,[i[6]||(i[6]=e("header",{class:"blog-header"},[e("h1",null,"Scientific Blog"),e("p",{class:"subtitle"},"Exploring Technology, Finance, and Beyond")],-1)),e("div",tt,[(g(!0),m(A,null,E(h.value,r=>(g(),m("article",{key:r.id,class:"post-card",onClick:x=>C(r.slug)},[e("div",st,[e("div",rt,[e("h2",{class:"","data-text":r.title},w(r.title),9,at),e("div",ot,[e("span",it,w(k(r.date)),1),e("span",lt,w(r.category),1),e("span",ct,w(r.subCategory),1)])]),e("p",ut,w(r.excerpt),1),i[5]||(i[5]=e("div",{class:"post-footer"},[e("span",{class:"read-more"},[e("span",{class:"link-text"},"Read More"),e("span",{class:"link-arrow"},"→")])],-1))])],8,nt))),128))])])]))}},pt=j(dt,[["__scopeId","data-v-9843e8e5"]]),mt=G({history:K("/"),routes:[{path:"/",name:"home",component:Fe},{path:"/blog",name:"blog",component:pt},{path:"/blog/:slug",name:"blog-post",component:()=>$(()=>import("./BlogPostView-BRSuJwJm.js"),__vite__mapDeps([0,1,2,3]))},{path:"/about",name:"about",component:()=>$(()=>import("./AboutView-Dtdtp0mw.js"),__vite__mapDeps([4,1,2,5]))}]}),F=Y(ce);F.use(ee());F.use(mt);F.mount("#app");export{j as _,yt as a,q as l};
