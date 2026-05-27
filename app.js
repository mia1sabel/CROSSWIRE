import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import emailjs from "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";

const firebaseConfig = {
  apiKey: "AIzaSyDnS4cZyU2tmn7gcgI3GzJXLqCOOf69Ks8",
  authDomain: "crosswire-site.firebaseapp.com",
  projectId: "crosswire-site",
  storageBucket: "crosswire-site.firebasestorage.app",
  messagingSenderId: "559146024531",
  appId: "1:559146024531:web:2070f92bc8ce3c328710a6",
  measurementId: "G-VEHKJ4VZKS"
};

const EMAILJS_PUBLIC_KEY = "T03MF8lsTk9YmAljW";
const EMAILJS_SERVICE_ID = "service_u88c30o";
const EMAILJS_TEMPLATE_ID = "template_a7ayx8p";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
emailjs.init(EMAILJS_PUBLIC_KEY);

const form = document.getElementById("waitlistForm");
const emailInput = document.getElementById("emailInput");
const submitBtn = document.getElementById("submitBtn");
const statusMessage = document.getElementById("statusMessage");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const emailValue = emailInput.value.trim();
  if (!emailValue) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "TRANSMITTING...";
  showStatus("Securing connection...", "text-gray-400");

  try {
    await addDoc(collection(db, "waitlist"), {
      email: emailValue,
      timestamp: serverTimestamp()
    });

    const templateParams = {
      user_email: emailValue, 
      reply_to: emailValue
    };

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

    showStatus("SUCCESS. ACCESS GRANTED. CHECK INBOX.", "text-green-500");
    form.reset();

  } catch (error) {
    console.error("Transmission Error:", error);
    showStatus("CONNECTION ERROR. TRY AGAIN.", "text-[#b80f0a]");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Join Inner Circle";
  }
});

function showStatus(text, textColorClass) {
  statusMessage.textContent = text;
  statusMessage.className = `text-[11px] font-mono uppercase tracking-widest mt-4 block ${textColorClass}`;
}
