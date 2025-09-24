import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const app = initializeApp({
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID
});
const db = getFirestore(app);

await addDoc(collection(db, 'events'), {
    title: 'Intro to Firebase & React',
    name: 'Intro to Firebase & React',
    date: new Date(Date.now() + 86400000),
    eventDate: new Date(Date.now() + 86400000),
    venue: 'Auditorium Hall',
    location: 'Auditorium Hall',
    description: 'Workshop covering Auth, Firestore & deploy.',
    registerUrl: 'https://example.com/register',
    link: 'https://example.com/register',
    imageUrl: 'https://placehold.co/800x450/png',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
});
console.log('Seed event added');
process.exit(0);