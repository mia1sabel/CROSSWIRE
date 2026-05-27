import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDnS4cZyU2tmn7gcgI3GzJXLqCOOf69Ks8",
  authDomain: "crosswire-site.firebaseapp.com",
  projectId: "crosswire-site",
  storageBucket: "crosswire-site.firebasestorage.app",
  messagingSenderId: "559146024531",
  appId: "1:559146024531:web:2070f92bc8ce3c328710a6",
  measurementId: "G-VEHKJ4VZKS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Global wrapper to guarantee HTML forms can trigger the code directly
window.handleWaitlistSubmit = async function(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const emailInput = form.querySelector('input[type="email"]');
    const targetEmail = emailInput.value.toLowerCase().trim();
    
    submitButton.disabled = true;
    submitButton.textContent = 'TRANSMITTING...';

    try {
        await addDoc(collection(db, "waitlist"), {
            email: targetEmail,
            timestamp: serverTimestamp()
        });

        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: 'service_u88c30o',
                template_id: 'template_m7s3b72',
                user_id: 'T03MF8IsTk9YmAjW',
                template_params: {
                    'user_email': targetEmail
                }
            })
        });

        submitButton.textContent = 'ENTRY SECURED';
        submitButton.style.backgroundColor = '#b80f0a';
        form.reset();
    } catch (error) {
        console.error("Pipeline failure:", error);
        submitButton.textContent = 'RETRY ERROR';
    }

    setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Join Inner Circle';
        submitButton.style.backgroundColor = '';
    }, 3500);
};

window.handlePortalSubmit = async function(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    submitButton.disabled = true;
    submitButton.textContent = 'TRANSMITTING...';

    const type = form.querySelector('select[name="portal_type"]').value;
    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const message = form.querySelector('textarea[name="message"]').value;

    try {
        await addDoc(collection(db, "applications"), {
            applicationType: type,
            applicantName: name,
            email: email.toLowerCase().trim(),
            conceptDetails: message,
            timestamp: serverTimestamp()
        });

        submitButton.textContent = 'APPLICATION FILED';
        submitButton.style.backgroundColor = '#b80f0a';
        form.reset();
    } catch (error) {
        console.error("Firestore Error:", error);
        submitButton.textContent = 'RETRY ERROR';
    }

    setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Application';
        submitButton.style.backgroundColor = '';
    }, 3500);
};