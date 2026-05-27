// Bring in the browser-friendly versions of the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your exact app credentials from the Firebase popup
const firebaseConfig = {
  apiKey: "AIzaSyDnS4cZyU2tmn7gcgI3GzJXLqCOOf69Ks8",
  authDomain: "crosswire-site.firebaseapp.com",
  projectId: "crosswire-site",
  storageBucket: "crosswire-site.firebasestorage.app",
  messagingSenderId: "559146024531",
  appId: "1:559146024531:web:2070f92bc8ce3c328710a6",
  measurementId: "G-VEHKJ4VZKS"
};

// Start the fire up pipelines
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. HANDLE INNER CIRCLE WAITLIST FORM SUBMISSIONS
    const waitlistForm = document.getElementById('waitlistForm');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = waitlistForm.querySelector('button[type="submit"]');
            const emailInput = waitlistForm.querySelector('input[type="email"]');
            
            submitButton.disabled = true;
            submitButton.textContent = 'TRANSMITTING...';

            try {
                // Inserts a clean record directly into your "waitlist" data panel
                await addDoc(collection(db, "waitlist"), {
                    email: emailInput.value.toLowerCase().trim(),
                    timestamp: serverTimestamp()
                });

                submitButton.textContent = 'ENTRY SECURED';
                submitButton.style.backgroundColor = '#b80f0a';
                waitlistForm.reset();
            } catch (error) {
                console.error("Firestore Error:", error);
                submitButton.textContent = 'RETRY ERROR';
            }

            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Join Inner Circle';
                submitButton.style.backgroundColor = '';
            }, 3500);
        });
    }

    // 2. HANDLE STREETWEAR VENDOR & PRESS PORTAL SUBMISSIONS
    const portalForm = document.getElementById('portalForm');
    if (portalForm) {
        portalForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = portalForm.querySelector('button[type="submit"]');
            
            submitButton.disabled = true;
            submitButton.textContent = 'TRANSMITTING...';

            const type = portalForm.querySelector('select[name="portal_type"]').value;
            const name = portalForm.querySelector('input[name="name"]').value;
            const email = portalForm.querySelector('input[name="email"]').value;
            const message = portalForm.querySelector('textarea[name="message"]').value;

            try {
                // Inserts application metadata right into your "applications" data panel
                await addDoc(collection(db, "applications"), {
                    applicationType: type,
                    applicantName: name,
                    email: email.toLowerCase().trim(),
                    conceptDetails: message,
                    timestamp: serverTimestamp()
                });

                submitButton.textContent = 'APPLICATION FILED';
                submitButton.style.backgroundColor = '#b80f0a';
                portalForm.reset();
            } catch (error) {
                console.error("Firestore Error:", error);
                submitButton.textContent = 'RETRY ERROR';
            }

            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit Application';
                submitButton.style.backgroundColor = '';
            }, 3500);
        });
    }
});