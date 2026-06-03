import React, { useState, useRef, useEffect } from "react";
import "./Voiceai.css";
import { useNavigate, useLocation } from "react-router-dom";
import Groq from "groq-sdk";

const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey, dangerouslyAllowBrowser: true }) : null;

// ── Voice Selection ────────────────────────────────────────────────
let selectedFemaleVoice = null;
let voicesLoaded = false;
const loadFemaleVoice = () => {
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return;
  const preferred = [
    "Samantha","Google US English Female","Microsoft Aria Online",
    "Microsoft Jenny Online","Karen","Ava","Google UK English Female",
    "Moira","Fiona","Tessa","Microsoft Zira Desktop","Veena","Rishi"
  ];
  for (const name of preferred) {
    const v = voices.find(v => v.name.toLowerCase().includes(name.toLowerCase()));
    if (v) { selectedFemaleVoice = v; voicesLoaded = true; return; }
  }
  selectedFemaleVoice =
    voices.find(v => v.name.toLowerCase().includes("female")) ||
    voices.find(v => v.lang === "en-GB" || v.lang === "en-US") ||
    voices[0];
  voicesLoaded = true;
};
loadFemaleVoice();
if (speechSynthesis.onvoiceschanged !== undefined) speechSynthesis.onvoiceschanged = loadFemaleVoice;
setTimeout(loadFemaleVoice, 100);
setTimeout(loadFemaleVoice, 500);
setTimeout(loadFemaleVoice, 1000);

// ── Navigation Keywords ────────────────────────────────────────────
const homeKeywords      = ["home","home page","homepage","main page","go home","back to home","return home"];
const donationKeywords  = ["donate","donation","donations","donate money","make a donation","support the trust","contribute","give money","fundraising","i want to donate","donation page","payment page"];
const aboutKeywords     = ["about","about us","about the trust","who are you","who we are","tell me about you","trust information","mission","vision","what do you do"];
const contactKeywords   = ["contact","contact us","contact page","get in touch","reach you","how can i contact","contact number"];
const trusteeKeywords   = ["trustee","trustees","trust members","board members","management","trust leadership","founder","founders","ceo"];
const scrollDownKeywords= ["scroll down","go down","move down","page down","go to bottom","next section"];
const scrollUpKeywords  = ["scroll up","go up","move up","page up","go to top","previous section"];
const fillFormKeywords  = ["fill the form","fill form","help me fill","assist me","fill it","please fill","yes","sure","okay","ok","go ahead","yeah","start filling","start","i want to fill"];
const submitKeywords    = ["submit","send","submit form","send form","click submit","press submit","done","finish"];
const clearFormKeywords = ["delete all","clear the form","clear form","remove everything","reset form","delete everything","delete all fields"];
const developer_details = [ "who made you","who is your developer","who created you","who is your creator","developer information","creator information","who developed you","your developer","your creator"];

// ── Correction Triggers ────────────────────────────────────────────
const CORRECTION_TRIGGERS = [
  { key:"name",        phrases:["name is wrong","wrong name","correct name","change name","fix name","my name is wrong","name is incorrect","name is not correct"] },
  { key:"email",       phrases:["email is wrong","wrong email","correct email","change email","fix email","my email is wrong","email incorrect"] },
  { key:"amount",      phrases:["amount is wrong","wrong amount","correct amount","change amount","fix amount","my amount is wrong","donation is wrong"] },
  { key:"address",     phrases:["address is wrong","wrong address","correct address","change address","fix address","my address is wrong","address incorrect"] },
  { key:"gender",      phrases:["gender is wrong","wrong gender","correct gender","change gender","my gender is wrong"] },
  { key:"phonenumber", phrases:["phone is wrong","phone number is wrong","wrong phone","correct phone","change phone","fix phone","my phone is wrong","number is wrong","mobile is wrong"] },
  { key:"pincode",     phrases:["pincode is wrong","wrong pincode","correct pincode","change pincode","fix pincode","my pincode is wrong","pin is wrong"] },
  { key:"country",     phrases:["country is wrong","wrong country","correct country","change country","fix country","my country is wrong"] },
  { key:"state",       phrases:["state is wrong","wrong state","correct state","change state","fix state","my state is wrong"] },
  { key:"city",        phrases:["city is wrong","wrong city","correct city","change city","fix city","my city is wrong"] },
];

// ── Deletion Triggers ──────────────────────────────────────────────
const DELETE_FIELD_TRIGGERS = [
  { key:"name",        phrases:["delete name","delete my name","remove name","remove my name","clear name"] },
  { key:"email",       phrases:["delete email","delete my email","remove email","remove my email","clear email"] },
  { key:"amount",      phrases:["delete amount","delete my amount","remove amount","clear amount"] },
  { key:"address",     phrases:["delete address","delete my address","remove address","clear address"] },
  { key:"gender",      phrases:["delete gender","delete my gender","remove gender","clear gender"] },
  { key:"phonenumber", phrases:["delete phone","delete my phone","delete phone number","remove phone","clear phone"] },
  { key:"pincode",     phrases:["delete pincode","delete my pincode","remove pincode","clear pincode"] },
  { key:"country",     phrases:["delete country","delete my country","remove country","clear country"] },
  { key:"state",       phrases:["delete state","delete my state","remove state","clear state"] },
  { key:"city",        phrases:["delete city","delete my city","remove city","clear city"] },
];

// ── Direct Fill Prefixes ───────────────────────────────────────────
const DIRECT_FILL_PREFIXES = [
  { key:"name",        prefixes:["my name is ","name is "] },
  { key:"email",       prefixes:["my email is ","email is ","email address is "] },
  { key:"amount",      prefixes:["my donation is ","my amount is ","donation amount is ","amount is "] },
  { key:"address",     prefixes:["my address is ","address is "] },
  { key:"gender",      prefixes:["my gender is ","gender is "] },
  { key:"phonenumber", prefixes:["my phone number is ","my phone is ","phone number is ","phone is "] },
  { key:"pincode",     prefixes:["my pincode is ","pincode is ","my pin is ","pin is "] },
  { key:"country",     prefixes:["my country is ","country is "] },
  { key:"state",       prefixes:["my state is ","state is "] },
  { key:"city",        prefixes:["my city is ","city is "] },
];

// ── Donate Form Fields ─────────────────────────────────────────────
const DONATE_FIELDS = [
  { key:"name",        label:"name",            question:"What is your full name?",                                                      groqPrompt:(t) => `Extract ONLY the person's full name from this speech: "${t}". Return only the name, nothing else.` },
  { key:"email",       label:"email address",   question:"What is your email address? You can say 'at' for @ and 'dot' for the period.", groqPrompt:(t) => `Extract the email address from this speech: "${t}". Replace spoken 'at' with @, 'dot' with '.', remove all spaces. Return only the email.` },
  { key:"amount",      label:"donation amount", question:"How much would you like to donate in rupees? Just say the number.",            groqPrompt:(t) => `Extract the donation amount number from: "${t}". Return ONLY digits (e.g. 500). No currency symbols, no text.` },
  { key:"address",     label:"address",         question:"What is your full address?",                                                  groqPrompt:(t) => `Extract the full address from: "${t}". Return only the address text.` },
  { key:"gender",      label:"gender",          question:"What is your gender? You can say male, female, or prefer not to say.",        groqPrompt:(t) => `Determine gender from: "${t}". Return EXACTLY one of: MALE, FEMALE, PREFER NOT TO SAY` },
  { key:"phonenumber", label:"phone number",    question:"What is your 10-digit phone number?",                                        groqPrompt:(t) => `Extract the 10-digit Indian phone number from: "${t}". Return ONLY the 10 digits, no spaces or dashes.` },
  { key:"country",     label:"country",         question:"Which country do you live in?",                                               groqPrompt:(t) => `Extract the country name from: "${t}". Return ONLY the country name.` },
  { key:"state",       label:"state",           question:"Which state do you live in?",                                                 groqPrompt:(t) => `Extract the state name from: "${t}". Return ONLY the state name.` },
  { key:"city",        label:"city",            question:"Which city do you live in?",                                                  groqPrompt:(t) => `Extract the city name from: "${t}". Return ONLY the city name.` },
  { key:"pincode",     label:"pincode",         question:"What is your 6-digit pincode?",                                              groqPrompt:(t) => `Extract the 6-digit pincode from: "${t}". Return ONLY the 6 digits.` },
];


// ── Varied Responses (makes Jessy feel human) ──────────────────────
const ACK = ["Got it!","Perfect!","Wonderful!","Great!","Excellent!","Sure thing!","Noted!","Alright!"];
const ERR = ["Hmm, I didn't quite catch that.","Sorry, something seems off there.","Oops! Let me try that again.","I'm having a little trouble with that."];
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const fieldAck = {
  name:        (v) => `${pickRandom(ACK)} Nice to meet you, ${v}!`,
  email:       (v) => `${pickRandom(ACK)} I'll send your receipt to ${v}.`,
  amount:      (v) => `That's so generous! ${v} rupees — GoGreen Trust thanks you.`,
  address:     ()  => `${pickRandom(ACK)} I've got your address.`,
  gender:      (v) => `${pickRandom(ACK)} Noted as ${v.toLowerCase()}.`,
  phonenumber: (v) => `${pickRandom(ACK)} Phone number ending in ${v.slice(-4)} saved.`,
  pincode:     ()  => `${pickRandom(ACK)} Got your pincode.`,
  country:     (v) => `${pickRandom(ACK)} Got it.`,
  state:       (v) => `${pickRandom(ACK)} Noted.`,
  city:        (v) => `${pickRandom(ACK)} Got your city.`,
};

// ── Helpers ────────────────────────────────────────────────────────
const getFieldMeta = (key) => DONATE_FIELDS.find(f => f.key === key);

const detectCorrectionIntent = (text) => {
  for (const { key, phrases } of CORRECTION_TRIGGERS)
    if (phrases.some(p => text.includes(p))) return key;
  return null;
};

const detectDeleteIntent = (text) => {
  for (const { key, phrases } of DELETE_FIELD_TRIGGERS)
    if (phrases.some(p => text.includes(p))) return key;
  return null;
};

const detectDirectFillIntent = (text) => {
  for (const { key, prefixes } of DIRECT_FILL_PREFIXES) {
    for (const prefix of prefixes) {
      if (text.startsWith(prefix) || text.includes(" " + prefix)) {
        const valueIndex = text.indexOf(prefix) + prefix.length;
        const rawValue = text.slice(valueIndex).trim();
        return { key, rawValue };
      }
    }
  }
  return null;
};

// Basic fallback value extractor (used if Groq is unavailable)
const basicExtract = (key, raw) => {
  let v = raw.trim();
  if (key === "email")       { v = v.replace(/\s+at\s+/gi,"@").replace(/\s+dot\s+/gi,".").replace(/\s/g,""); }
  if (["amount","phonenumber","pincode"].includes(key)) v = v.replace(/\D/g,"");
  if (key === "gender")      { const l = v.toLowerCase(); return l.includes("female") ? "FEMALE" : l.includes("male") ? "MALE" : "PREFER NOT TO SAY"; }
  return v;
};

const formatFinalValue = (key, val) => {
  if (!val) return val;
  let res = val.toString().trim();
  
  if (key === "address") {
    // Keep spaces, capitalize first letter
    if (res.length > 0) return res.charAt(0).toUpperCase() + res.slice(1);
    return res;
  }
  
  if (key === "email") {
    // Lower case, no spaces
    return res.toLowerCase().replace(/\s/g, "");
  }
  
  if (["amount", "phonenumber", "pincode", "gender"].includes(key)) {
    if (key !== "gender") return res.replace(/\s/g, "");
    return res;
  }
  
  // For any other field (like name)
  // remove all spaces and capitalize first letter
  res = res.replace(/\s/g, "");
  if (res.length > 0) return res.charAt(0).toUpperCase() + res.slice(1);
  return res;
};

const validateValue = (key, value) => {
  if (!value) return "I didn't catch anything. Could you say that again?";
  if (key === "email"       && (!value.includes("@") || !value.includes(".")))
    return `${pickRandom(ERR)} That doesn't look like a valid email. Try saying it like: myname at gmail dot com.`;
  if (key === "amount"      && (!value || Number(value) <= 0))
    return `${pickRandom(ERR)} I need a valid amount in rupees. Just say the number, like five hundred.`;
  if (key === "phonenumber" && value.length !== 10)
    return `${pickRandom(ERR)} A phone number needs exactly 10 digits — I heard ${value.length}. Please say all 10 digits clearly.`;
  if (key === "pincode"     && value.length !== 6)
    return `${pickRandom(ERR)} A pincode needs exactly 6 digits — I heard ${value.length}. Please try again.`;
  return null;
};

// ── Component ──────────────────────────────────────────────────────
function VoiceAI() {
  const [listening, setListening] = useState(false);
  const [speaking,  setSpeaking]  = useState(false);
  const [isActive,  setIsActive]  = useState(false);

  const recognitionRef   = useRef(null);
  const isActiveRef      = useRef(false);
  const listeningRef     = useRef(false);
  // Critical: prevents mic from restarting while Jessy is speaking/processing
  const processingRef    = useRef(false);
  const locationRef      = useRef(null);

  // Form fill (all refs — zero stale closure risk)
  const formModeRef      = useRef(null);    // null | "filling" | "correcting"
  const currentFieldRef  = useRef(null);    // key of field being asked right now
  const fieldQueueRef    = useRef([]);      // remaining fields
  const correctionKeyRef = useRef(null);    // key being corrected
  const filledValuesRef  = useRef({});      // record of all filled values

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { isActiveRef.current = isActive; },   [isActive]);
  useEffect(() => { listeningRef.current = listening; }, [listening]);
  useEffect(() => { locationRef.current = location; },   [location]);
  useEffect(() => () => { recognitionRef.current?.stop(); speechSynthesis.cancel(); }, []);

  // ── Speak ──────────────────────────────────────────────────────
  const speak = (message) => new Promise(resolve => {
    speechSynthesis.cancel();
    if (!voicesLoaded) loadFemaleVoice();
    const msg = new SpeechSynthesisUtterance(message);
    msg.lang = "en-US"; msg.rate = 0.92; msg.pitch = 1.15; msg.volume = 1.0;
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) msg.rate += 0.05;
    if (selectedFemaleVoice) msg.voice = selectedFemaleVoice;
    window.speechKeepAlive = window.speechKeepAlive || [];
    window.speechKeepAlive.push(msg);
    msg.onend  = () => resolve();
    msg.onerror = () => resolve();
    speechSynthesis.speak(msg);
  });

  // ── Listening ──────────────────────────────────────────────────
  const startListening = () => {
    if (!isActiveRef.current || !recognitionRef.current) return;
    if (listeningRef.current || processingRef.current)   return;
    try {
      listeningRef.current = true;
      setListening(true); setSpeaking(false);
      recognitionRef.current.start();
    } catch (e) {
      console.log("Start error:", e.message);
      listeningRef.current = false; setListening(false);
    }
  };

  // ── Groq Value Extraction ──────────────────────────────────────
  // Uses AI to understand natural speech instead of rigid keyword matching
  const extractFieldValueWithGroq = async (userText, field) => {
    // For emails, deterministic formatting is safer than AI summarization (which might strip repeated words)
    if (!groq || field.key === "email") return basicExtract(field.key, userText);
    try {
      const chat = await groq.chat.completions.create({
        messages: [
          { role: "system", content: "You are a precise data extractor. Extract ONLY the requested value from user speech. Return ONLY the value itself — no explanation, no quotation marks, no extra words." },
          { role: "user",   content: field.groqPrompt(userText) }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0,
        max_tokens: 60,
      });
      const extracted = chat.choices[0]?.message?.content?.trim();
      return extracted || basicExtract(field.key, userText);
    } catch (e) {
      console.warn("Groq extraction fallback:", e.message);
      return basicExtract(field.key, userText);
    }
  };

  // ── Form Fill Helpers ──────────────────────────────────────────
  const resetFormMode = () => {
    formModeRef.current     = null;
    currentFieldRef.current = null;
    fieldQueueRef.current   = [];
    correctionKeyRef.current = null;
  };

  const waitForFillHook = async (maxMs = 2500) => {
    const t = Date.now();
    while (typeof window.jessyFillField !== "function" && Date.now() - t < maxMs)
      await new Promise(r => setTimeout(r, 100));
    return typeof window.jessyFillField === "function";
  };

  const applyFill = (key, value) => {
    filledValuesRef.current[key] = value;
    if (typeof window.jessyFillField === "function") {
      window.jessyFillField(key, value);
      console.log(`✅ [${key}] = "${value}"`);
    } else {
      console.warn("jessyFillField not available yet");
    }
  };

  const startFormFill = async () => {
    const ready = await waitForFillHook();
    if (!ready) {
      await speak("Hmm, the form doesn't seem to be loaded yet. Could you try again in a moment?");
      return;
    }
    filledValuesRef.current = {};
    formModeRef.current    = "filling";
    const [first, ...rest]  = DONATE_FIELDS;
    currentFieldRef.current = first.key;
    fieldQueueRef.current   = rest;
    await speak(`Wonderful! Let's fill this out together. ${first.question}`);
  };

  const readBackAllValues = async () => {
    const filled = filledValuesRef.current;
    const parts = DONATE_FIELDS.filter(f => filled[f.key]).map(f => `${f.label}: ${filled[f.key]}`);
    if (!parts.length) { await speak("I haven't filled anything yet. Let's start!"); return; }
    await speak(
      "Alright, let me read back what I have so far. " +
      parts.join(". ") +
      ". If anything sounds wrong, just say for example: my name is wrong, and I'll fix it right away!"
    );
  };

  // Process a user's answer to the current field being asked
  const processFieldAnswer = async (userText) => {
    const key   = currentFieldRef.current;
    const field = getFieldMeta(key);
    if (!key || !field) return false;

    // Extract the meaningful value using Groq AI
    let value = await extractFieldValueWithGroq(userText, field);
    value = formatFinalValue(key, value);
    const error = validateValue(key, value);
    if (error) { await speak(error); return true; } // stay on same field

    applyFill(key, value);
    const ack = fieldAck[key]?.(value) || pickRandom(ACK);

    const queue = fieldQueueRef.current;
    if (queue.length > 0) {
      const next = queue[0];
      currentFieldRef.current = next.key;
      fieldQueueRef.current   = queue.slice(1);

      // Progress encouragement at halfway point
      const totalFilled = DONATE_FIELDS.length - queue.length;
      let transition = `${ack} ${next.question}`;
      if (totalFilled === 4) transition = `${ack} You're halfway there! ${next.question}`;
      if (queue.length === 1) transition = `${ack} Almost done — just one more! ${next.question}`;

      await speak(transition);
    } else {
      currentFieldRef.current = null;
      formModeRef.current     = null;
      await speak(`${ack} That's everything!`);
      await readBackAllValues();
      await speak("Whenever you're ready, just say submit and I'll take care of the rest!");
    }
    return true;
  };

  // Process a correction after user said a field is wrong
  const processCorrectionAnswer = async (userText) => {
    const key   = correctionKeyRef.current;
    const field = getFieldMeta(key);
    if (!key || !field) return false;

    let value = await extractFieldValueWithGroq(userText, field);
    value = formatFinalValue(key, value);
    const error = validateValue(key, value);
    if (error) { await speak(error); return true; }

    applyFill(key, value);
    correctionKeyRef.current = null;

    await speak(`Done! I've updated your ${field.label} to ${value}.`);

    // Resume filling if there are still fields to go
    if (currentFieldRef.current) {
      formModeRef.current = "filling";
      const nextMeta = getFieldMeta(currentFieldRef.current);
      await speak(`Let's carry on. ${nextMeta.question}`);
    } else {
      formModeRef.current = null;
      await speak("All fields are up to date! Say submit whenever you're ready.");
    }
    return true;
  };

  // ── Command Handlers ───────────────────────────────────────────
  const handleExit = async (text) => {
    if (!["thank you","thanks","bye","goodbye","stop listening","stop"].some(p => text.includes(p))) return false;
    setIsActive(false); isActiveRef.current = false;
    setListening(false); listeningRef.current = false;
    resetFormMode();
    await speak("It was my pleasure! Click me anytime you need help. Goodbye!");
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setSpeaking(false);
    return true;
  };

  const handleScroll = async (text) => {
    if (scrollDownKeywords.some(w => text.includes(w))) { await speak("Scrolling down for you."); window.scrollBy({ top: window.innerHeight * 0.8, behavior:"smooth" }); return true; }
    if (scrollUpKeywords.some(w => text.includes(w)))   { await speak("Scrolling up.");           window.scrollBy({ top: -window.innerHeight * 0.8, behavior:"smooth" }); return true; }
    return false;
  };

  const handleHelp = async (text) => {
    if (!["help","what can you do","commands","options","how to use","guide me","what are your features"].some(w => text.includes(w))) return false;
    await speak("I can navigate the website and fill your donation form completely by voice. On the donation page, say fill the form and I'll guide you through every field. If any detail is wrong, just say for example: my name is wrong, and I'll correct it. Say goodbye when you're done!");
    return true;
  };

  const handleNavigate = async (text) => {
    if (homeKeywords.some(w => text.includes(w))) {
      resetFormMode(); await speak("Sure! Taking you home."); navigate("/"); return true;
    }
    if (donationKeywords.some(w => text.includes(w))) {
      resetFormMode(); await speak("Your generosity means a lot. Taking you to the donation page.");
      navigate("/donate");
      await new Promise(r => setTimeout(r, 900));
      await speak("Welcome to the donation page! I'm here to make this easy for you. Just say fill the form whenever you're ready.");
      return true;
    }
    if (aboutKeywords.some(w => text.includes(w))) {
      resetFormMode(); await speak("Taking you to learn more about us!"); navigate("/aboutus"); return true;
    }
    if (contactKeywords.some(w => text.includes(w))) {
      resetFormMode(); await speak("Opening the contact page."); navigate("/contact"); return true;
    }
    if (trusteeKeywords.some(w => text.includes(w))) {
      resetFormMode(); await speak("Showing you our leadership team."); navigate("/trustee"); return true;
    }
    if (["admin","administrator","admin page","admin login","admin panel","i am admin","open admin login"].some(p => text.includes(p))) {
      resetFormMode(); await speak("Opening the admin page."); navigate("/adm"); return true;
    }
    return false;
  };

  const handleDeveloperDetails = async (text) => {
    if (!developer_details.some(w => text.includes(w))) return false;
    await speak("I was created by a passionate developer named HARI. He built me using React and the Web Speech API, with a sprinkle of AI magic from Groq to understand natural language. HARI designed me to make your experience on the GoGreen Trust website as smooth and enjoyable as possible. If you have any feedback or want to know more, feel free to ask!");
    return true;

  }

  // ── Main Command Processor ─────────────────────────────────────
  const processCommand = async (text) => {
    console.log("🗣 User said:", text);
    processingRef.current = true; // Block mic restart while processing
    setSpeaking(true); setListening(false); listeningRef.current = false;

    try {
      // 1. Exit — always highest priority
      if (await handleExit(text)) return;

      // 2. Clear all fields (works in any mode on donate page)
      if (locationRef.current?.pathname === "/donate" && clearFormKeywords.some(w => text.includes(w))) {
        resetFormMode();
        DONATE_FIELDS.forEach(f => applyFill(f.key, ""));
        filledValuesRef.current = {};
        await speak("I have cleared all fields. Just say fill the form when you want to start again.");
        return;
      }

      // 3. Delete specific field
      const deleteKey = detectDeleteIntent(text);
      if (deleteKey) {
        applyFill(deleteKey, "");
        const meta = getFieldMeta(deleteKey);
        await speak(`Okay, I have removed your ${meta.label}.`);
        if (formModeRef.current === "filling" && currentFieldRef.current) {
          const currentMeta = getFieldMeta(currentFieldRef.current);
          await speak(`Now, ${currentMeta.question}`);
        }
        return;
      }

      // 4. Correction intent — user says something is wrong (works in any mode)
      const correctionKey = detectCorrectionIntent(text);
      if (correctionKey) {
        const meta = getFieldMeta(correctionKey);
        correctionKeyRef.current = correctionKey;
        // Freeze current fill position so we resume after correction
        const prevMode = formModeRef.current;
        formModeRef.current = "correcting";
        await speak(`Oh, I'm sorry about that! What should your ${meta.label} be?`);
        if (prevMode !== "filling") formModeRef.current = "correcting";
        return;
      }

      // 5. Out-of-turn Direct Fill (e.g. user says "my address is X" while we are asking for phone)
      const directFill = detectDirectFillIntent(text);
      if (directFill) {
        // If the user used a prefix for the field we are CURRENTLY asking about, just process it normally
        if (formModeRef.current === "filling" && currentFieldRef.current === directFill.key) {
          await processFieldAnswer(directFill.rawValue);
          return;
        }

        // Otherwise, it's out-of-turn or they aren't filling yet. Update that field specifically.
        const field = getFieldMeta(directFill.key);
        let value = await extractFieldValueWithGroq(directFill.rawValue, field);
        value = formatFinalValue(directFill.key, value);
        const error = validateValue(directFill.key, value);
        if (error) { await speak(error); return; }

        applyFill(directFill.key, value);
        await speak(`Got it, I've set your ${field.label} to ${value}.`);

        // If we were filling, re-ask the current question so they aren't lost
        if (formModeRef.current === "filling" && currentFieldRef.current) {
          const currentMeta = getFieldMeta(currentFieldRef.current);
          await speak(`Now, ${currentMeta.question}`);
        }
        return;
      }

      // 6. In correction mode — process the correction answer
      if (formModeRef.current === "correcting" && correctionKeyRef.current) {
        await processCorrectionAnswer(text);
        return;
      }

      // 7. In fill mode — process the field answer
      if (formModeRef.current === "filling" && currentFieldRef.current) {
        await processFieldAnswer(text);
        return;
      }

      // 8. Review / read back
      if (["what did i say","read back","tell me what i said","review","check details","my details"].some(p => text.includes(p))) {
        await readBackAllValues(); return;
      }

      const path = locationRef.current?.pathname || location.pathname;

      // 6. Fill form trigger
      if (path === "/donate" && formModeRef.current === null && fillFormKeywords.some(w => text.includes(w))) {
        await speak("Great! I'll guide you through each field. Just answer naturally and I'll handle the rest.");
        await startFormFill(); return;
      }

      // 7. Voice submit
      if (path === "/donate" && submitKeywords.some(w => text.includes(w))) {
        const btn = document.querySelector("span.btnInner") || document.querySelector("button[type='submit']") || document.querySelector("input[type='submit']");
        if (btn) { btn.click(); await speak("Your donation is being submitted. Thank you so much — you're making a real difference!"); }
        else      await speak("I couldn't find the submit button. Please click it manually.");
        resetFormMode(); return;
      }

      // 8. Help
      if (await handleHelp(text)) return;

      // 9. Scroll
      if (await handleScroll(text)) return;

      // 10. Navigate
      if (await handleNavigate(text)) return;

      // 10. Developer details 
      if (await handleDeveloperDetails(text)) return;

      // 11. Groq conversational fallback
      if (groq) {
        try {
          const chat = await groq.chat.completions.create({
            messages: [
              { role:"system", content:"You are Jessy, a warm and friendly Voice AI assistant for GoGreen Trust charity. Speak naturally, like a helpful human friend. Keep responses under 50 words." },
              { role:"user",   content: text }
            ],
            model:"llama-3.3-70b-versatile", temperature: 0.7,
          });
          await speak(chat.choices[0]?.message?.content || "I'm not sure I understood. Say help if you need guidance!");
        } catch (e) {
          console.error("Groq Error:", e);
          await speak("Sorry, I had a little trouble connecting. Say help to hear what I can do!");
        }
      } else {
        await speak("I'm not sure about that. Say help to hear what I can do!");
      }
    } finally {
      // Always release processing lock and restart listening
      processingRef.current = false;
      setSpeaking(false);
      startListening();
    }
  };

  // ── Setup Recognition ──────────────────────────────────────────
  const setupRecognition = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Speech recognition not supported in this browser."); return null; }
    const r = new SR();
    r.lang = "en-IN"; r.continuous = false; r.interimResults = false; r.maxAlternatives = 1;

    r.onstart  = () => { listeningRef.current = true; setListening(true); setSpeaking(false); };

    r.onresult = async (e) => {
      const text = e.results[0][0].transcript.toLowerCase().trim();
      console.log("Heard:", text);
      listeningRef.current = false; setListening(false);
      await processCommand(text);
    };

    r.onerror  = (e) => {
      console.log("Recognition error:", e.error);
      listeningRef.current = false; setListening(false);
      if (e.error === "aborted" || e.error === "not-allowed") return;
      // Only auto-retry on no-speech / network errors
      if (isActiveRef.current && !processingRef.current)
        setTimeout(startListening, 1500);
    };

    r.onend    = () => {
      listeningRef.current = false; setListening(false);
      // Only auto-restart if we're idle (not processing a command)
      if (isActiveRef.current && !processingRef.current)
        setTimeout(startListening, 500);
    };

    return r;
  };

  // ── Toggle ─────────────────────────────────────────────────────
  const toggleVoice = async () => {
    if (isActive) {
      setIsActive(false); isActiveRef.current = false;
      setListening(false); listeningRef.current = false;
      processingRef.current = false;
      resetFormMode();
      await speak("Goodbye! It was great helping you. Click me anytime!");
      recognitionRef.current?.stop(); recognitionRef.current = null;
      setSpeaking(false); return;
    }
    setIsActive(true); isActiveRef.current = true; setSpeaking(true);
    await speak("Hey there! I'm Jessy and I'm GoGreen Trust's Voice Assistant. I'm here to help and make your experience smoother.");
    if (location.pathname === "/donate")
      await speak("Oh, I see you're already on the donation page! Just say fill the form whenever you're ready and I'll walk you through it.");
    const r = setupRecognition();
    if (!r) return;
    recognitionRef.current = r;
    setSpeaking(false);
    processingRef.current = false;
    startListening();
  };

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div
      className={`button-glossy ${speaking ? "speaking" : listening ? "listening" : ""}`}
      onClick={toggleVoice}
      style={{
        position:"fixed", bottom:"20px", right:"20px",
        width:"70px", height:"70px", borderRadius:"50%",
        background: isActive
          ? "linear-gradient(135deg,yellow 0%,green 100%)"
          : "linear-gradient(135deg,red 0%,blue 100%)",
        color:"#fff", cursor:"pointer",
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        boxShadow: isActive ? "0 10px 40px rgba(42,53,100,0.6)" : "0 10px 30px rgba(0,0,0,0.3)",
        zIndex:9999, textAlign:"center",
        transition:"all 0.3s ease",
        border: isActive ? "3px solid #fff" : "none",
      }}
    >
      <span style={{ fontSize:"24px" }}>
        {speaking ? "" : listening ? "" : ""}
      </span>
      <span style={{ fontSize:"9px", marginTop:"4px", fontWeight:"600" }}>
        {speaking ? "" : listening ? "" : isActive ? "" : "Talk to Jessy"}
      </span>
      {(speaking || listening) && (
        <div style={{ position:"absolute", bottom:"20px", display:"flex", gap:"3px" }}>
          {[0, 0.2, 0.4].map((delay, i) => (
            <span key={i} style={{ width:"8px", height:"20px", background:"#fff", animation:`wave 0.5s infinite ${delay}s`, borderRadius:"10px" }} />
          ))}
        </div>
      )}
    </div>
  );
}

export default VoiceAI;