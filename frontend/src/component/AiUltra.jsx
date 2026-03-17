// AiUltra.jsx – FIXED & SUPER HUGE AI CHAT COMPONENT
import React, { useContext, useState, useEffect, useRef } from "react";
import aiIcon from "../assets/E-commerce MERN Assets/ai.png";
import { shopdatacontext } from "../context/ShopContext.jsx";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// ---------------- LEVENSHTEIN ----------------
function levenshtein(a = "", b = "") {
    if (a === b) return 0;
    const alen = a.length, blen = b.length;
    if (alen === 0) return blen;
    if (blen === 0) return alen;
    const matrix = Array.from({ length: blen + 1 }, () => Array(alen + 1).fill(0));
    for (let i = 0; i <= blen; i++) matrix[i][0] = i;
    for (let j = 0; j <= alen; j++) matrix[0][j] = j;
    for (let i = 1; i <= blen; i++) {
        for (let j = 1; j <= alen; j++) {
            const cost = b[i - 1] === a[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
        }
    }
    return matrix[blen][alen];
}

// ---------------- TOKEN SIMILARITY ----------------
function tokenOverlapScore(input, keyword) {
    const iWords = input.toLowerCase().split(/\s+/).filter(Boolean);
    const kWords = keyword.toLowerCase().split(/\s+/).filter(Boolean);
    if (kWords.length === 0) return 0;
    let matches = 0;
    for (const kw of kWords) {
        for (const iw of iWords) {
            if (iw === kw) { matches++; break; }
            if (iw.startsWith(kw.slice(0, Math.min(3, kw.length)))) { matches++; break; }
        }
    }
    return matches / kWords.length;
}

// ---------------- COMBINED SIMILARITY ----------------
function combinedSimilarity(input, keyword) {
    const tScore = tokenOverlapScore(input, keyword);
    const lev = levenshtein(input.toLowerCase(), keyword.toLowerCase());
    const maxLen = Math.max(input.length, keyword.length) || 1;
    const editScore = 1 - lev / maxLen;
    return 0.7 * tScore + 0.3 * editScore;
}

// ---------------- SYNONYMS ----------------
const synonyms = {
    open: ["start","show","activate","display","launch","view","reveal","initiate","go","visit","enter","access"],
    close: ["hide","stop","disable","dismiss","shut","exit","end","leave"],
    collection: ["products","items","catalog","inventory","list","collection","merchandise","stock"],
    search: ["find","lookup","query","seek","scan","search","discover","explore"],
    home: ["main","homepage","dashboard","index","frontpage"],
    contact: ["support","help","reach out","communication","contact us","get in touch"],
    about: ["info","information","details","about us","company info","about page"],
    product: ["product","item","sku","goods","merchandise","article"],
    order: ["order","purchase","transaction","order id","buy","shopping"],
    cart: ["cart","basket","bag","checkout","shopping cart","trolley"],
    profile: ["profile","account","user","my account","dashboard"],
    help: ["help","assist","guide","instructions","support","faq","question","how to","explain","tell me"]
};

// ---------------- EXPAND SYNONYMS ----------------
function expandSynonymsVariants(phrase) {
    const phraseLC = phrase.toLowerCase();
    const words = phraseLC.split(/\s+/).filter(Boolean);
    const alternatives = words.map(w => {
        const alts = [w];
        if (synonyms[w]) alts.push(...synonyms[w]);
        for (const key of Object.keys(synonyms)) if (w.includes(key) && !alts.includes(key)) alts.push(key);
        return Array.from(new Set(alts));
    });
    const maxVariants = 300;
    const variants = [];
    function cartesian(idx, sofar) {
        if (variants.length >= maxVariants) return;
        if (idx >= alternatives.length) { variants.push(sofar.join(" ")); return; }
        for (const alt of alternatives[idx]) cartesian(idx + 1, [...sofar, alt]);
    }
    cartesian(0, []);
    if (!variants.includes(phraseLC)) variants.unshift(phraseLC);
    return variants;
}

// ---------------- DEFAULT KB ----------------
const defaultKB = [
    { category:"collection", keywords:["open collection","show collection","collection page"], response:"opening collection page!" },
    { category:"searchopen", keywords:["open search","search box","start search"], response:"search box is now open!" },
    { category:"searchclose", keywords:["close search","hide search"], response:"search box is now closed!" },
    { category:"home", keywords:["go home","home page"], response:"opening home page!" },
    { category:"contact", keywords:["show contact","contact page"], response:"opening contact page!" },
    { category:"about", keywords:["show about page","go to about page"], response:"opening about page!" },
    { category:"orderdetail", keywords:["order details","orders"], response:"opening order details page!" },
    { category:"placeorder", keywords:["place order","checkout now"], response:"navigating to place order page!" },
    { category:"cart", keywords:["show cart","shopping bag"], response:"opening cart page!" },
    { category:"product", keywords:["product details","show product"], response:"opening product details page!" },
    { category:"faq", keywords:["what is your name","who are you","how to buy product"], response:[
        "i am rafiAI, your e-commerce assistant for one cart.",
        "you can contact one cart support via our contact page.",
        "one cart delivers within 3–5 business days.",
        "payment methods: bkash, nagad, rocket, card.",
        "check offers section for discounts."
    ]},
    { category:"personal", keywords:["who are you","yourself"], response:[
        "i am rafiAI, the intelligent assistant for one cart.",
        "i help you navigate, search, and manage orders."
    ]},
    { category:"creator", keywords:["who created you","developer","creator"], response:[
        "created by rafi and his dev team.",
        "developed by one cart AI team."
    ]},
    { category:"greeting", keywords:["hello","hi"], response:["hello! how can i assist you today?","hi there! ready to shop with one cart?"]},
    { category:"joke", keywords:["tell me a joke","make me laugh"], response:["why did the computer go to doctor? it caught a virus! 😄"]}
];

// ---------------- LOCAL STORAGE ----------------
const KB_LS="rafiai_kb_v4";
const MEM_LS="rafiai_memory_v4";
const SETTINGS_LS="rafiai_settings_v4";
const loadKB=()=>{try{const s=JSON.parse(localStorage.getItem(KB_LS)); if(Array.isArray(s)) return s;}catch(e){} return defaultKB;}
const saveKB=(kb)=>{try{localStorage.setItem(KB_LS,JSON.stringify(kb));}catch(e){}}
const loadMemory=()=>{try{const s=JSON.parse(localStorage.getItem(MEM_LS)); if(Array.isArray(s)) return s;}catch(e){} return [];}
const saveMemory=(mem)=>{try{localStorage.setItem(MEM_LS,JSON.stringify(mem));}catch(e){}}
const loadSettings=()=>{try{const s=JSON.parse(localStorage.getItem(SETTINGS_LS)); if(s&&typeof s==="object") return s;}catch(e){} return {threshold:0.6,adminmode:false};}
const saveSettings=(s)=>{try{localStorage.setItem(SETTINGS_LS,JSON.stringify(s));}catch(e){}}

// ---------------- EXTRACT ROUTE ----------------
function extractRouteFromText(text){
    const t=text.trim().toLowerCase();
    if(/\b(collection|collections|products)\b/.test(t)) return "/collection";
    if(/\b(cart|checkout|add to cart)\b/.test(t)) return "/addtocart";
    if(/\b(place order|checkout now)\b/.test(t)) return "/placeorder";
    if(/\b(order history|orders|order details)\b/.test(t)) return "/orderdetailshistory";
    if(/\b(home|homepage|main page)\b/.test(t)) return "/";
    if(/\b(contact|support)\b/.test(t)) return "/contact";
    if(/\b(about|about page)\b/.test(t)) return "/about";
    return null;
}

// ---------------- MAIN COMPONENT ----------------
const AiUltra = () => {
    const { showsearch,setshowsearch } = useContext(shopdatacontext);
    const [isOpen,setIsOpen] = useState(false);
    const [query,setQuery] = useState("");
    const [chat,setChat] = useState([]);
    const [loading,setLoading] = useState(false);
    const [kb,setKB] = useState(loadKB());
    const [memory,setMemory] = useState(loadMemory());
    const [typing,setTyping] = useState(false);
    const [settings,setSettings] = useState(loadSettings());
    const navigate = useNavigate();
    const recognitionRef = useRef(null);
    const chatEndRef = useRef(null);

    useEffect(()=>saveKB(kb),[kb]);
    useEffect(()=>saveMemory(memory),[memory]);
    useEffect(()=>saveSettings(settings),[settings]);

    const speak=(text)=>{
        if(!window.speechSynthesis||!text) return;
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang="en-US"; utter.rate=1.0; utter.pitch=1.1;
        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(v=>v.name.toLowerCase().includes("female")||v.name.toLowerCase().includes("zira"))||voices[0];
        if(femaleVoice) utter.voice=femaleVoice;
        window.speechSynthesis.cancel(); window.speechSynthesis.speak(utter);
    };

    useEffect(()=>{
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if(!SpeechRecognition) return;
        const recognition = new SpeechRecognition();
        recognition.lang="en-US"; recognition.interimResults=false; recognition.continuous=false;
        recognition.onresult=(e)=>{
            const transcript = e.results[0][0].transcript.trim();
            setQuery(transcript);
            handleCommand(transcript);
        };
        recognitionRef.current = recognition;
    },[]);

    const handleCommand=async(text)=>{
        if(!text?.trim()) return;
        setLoading(true); setTyping(true);
        setChat(c=>[...c,{user:text,bot:null}]);
        const route=extractRouteFromText(text);
        if(route){ navigate(route); const rsp=`opening ${route.replace("/","").toUpperCase()}`; updateLastBubbleAndMemory(text,rsp); speak(rsp); setTyping(false); setLoading(false); return; }

        let best={score:0,item:null,keyword:null};
        for(const item of kb){
            for(const kw of item.keywords){
                const variants=expandSynonymsVariants(kw);
                for(const variant of variants){
                    const score=combinedSimilarity(text,variant);
                    if(score>best.score) best={score,item,keyword:variant};
                    if(best.score>=0.95) break;
                }
                if(best.score>=0.95) break;
            }
            if(best.score>=0.95) break;
        }

        if(best.item){
            if(["faq","personal","creator","greeting","joke"].includes(best.item.category)){
                const responses = Array.isArray(best.item.response)? best.item.response : [best.item.response];
                const response = responses[Math.floor(Math.random()*responses.length)];
                updateLastBubbleAndMemory(text,response); speak(response);
            } else if(best.score>=settings.threshold){ executeMatched(best.item,best.score,text); }
            else { const response="sorry, i do not understand this yet."; updateLastBubbleAndMemory(text,response); speak(response); }
        } else { const response="sorry, i do not understand this yet."; updateLastBubbleAndMemory(text,response); speak(response); }

        setTyping(false); setLoading(false);
        chatEndRef.current?.scrollIntoView({behavior:"smooth"});
    };

    const executeMatched=(item,score,originalText)=>{
        try{
            switch(item.category){
                case "collection":navigate("/collection"); break;
                case "searchopen":setshowsearch(true); break;
                case "searchclose":setshowsearch(false); break;
                case "home":navigate("/"); break;
                case "contact":navigate("/contact"); break;
                case "about":navigate("/about"); break;
                case "cart":navigate("/addtocart"); break;
                case "orderdetail":navigate("/orderdetailshistory"); break;
                case "placeorder":navigate("/placeorder"); break;
                case "product":navigate("/products"); break;
                default:break;
            }
        }catch(e){}
        const response=`${item.response || "done"} (confidence: ${Math.round(score*100)}%)`;
        updateLastBubbleAndMemory(originalText,response);
        speak(response);
    };

    const updateLastBubbleAndMemory=(queryText,botText)=>{
        const memEntry={query:queryText,response:botText,timestamp:Date.now()};
        const newMemory=[...memory,memEntry].slice(-5000);
        setMemory(newMemory); saveMemory(newMemory);
        setChat(c=>{
            const updated=[...c];
            for(let i=updated.length-1;i>=0;i--){ if(updated[i].bot===null){updated[i]={user:updated[i].user,bot:botText}; break;} }
            return updated;
        });
    };

    const sendQuery=()=>{ if(!query.trim()) return; handleCommand(query.trim()); setQuery(""); }

    return(
        <>
        <div className="fixed bottom-6 right-50 z-50">
            <img src={aiIcon} alt="rafiai" className="w-16 h-16 cursor-pointer rounded-full shadow-lg" onClick={()=>setIsOpen(p=>!p)} />
        </div>
        {isOpen && (
        <div className="fixed right-6 bottom-28 md:bottom-10 z-50 w-[320px] md:w-[520px] h-[560px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between bg-red-600 p-3 text-white">
                <div className="font-semibold">rafiai assistant</div>
                <button onClick={()=>setIsOpen(false)} className="text-xl leading-none px-2">×</button>
            </div>
            <div className="flex-1 p-3 overflow-y-auto bg-gray-50 space-y-3">
                {chat.length===0 && <div className="text-center text-sm text-gray-500 mt-8 px-4">hi — I am Orin. try commands like "open collection".</div>}
                {chat.map((m,idx)=>(
                    <div key={idx}>
                        <div className="text-right"><div className="inline-block bg-red-100 text-red-900 px-3 py-1 rounded-lg text-sm">{m.user}</div></div>
                        {m.bot && <div className="text-left mt-1"><div className="inline-block bg-white text-gray-800 px-3 py-2 rounded-lg shadow-sm text-sm">{m.bot}</div></div>}
                    </div>
                ))}
                {typing && <div className="text-sm text-gray-400 italic">Orin is typing...</div>}
                <div ref={chatEndRef}/>
            </div>
            <div className="p-3 border-t border-gray-200 flex gap-2 items-center">
                <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==="Enter") sendQuery();}} placeholder="type your command..." className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" />
                <button onClick={sendQuery} className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700">send</button>
                <button onClick={()=>recognitionRef.current?.start()} className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-300">🎤</button>
            </div>
        </div>
        )}
        </>
    );
};

export default AiUltra;
