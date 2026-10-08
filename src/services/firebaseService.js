import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp, 
  setDoc 
} from "firebase/firestore";
import { db } from "../firebase";

// Fallback logic for reading static data if Firebase is empty initially
import { upcomingEvents, pastEvents } from "../data/eventsData";
import { teamData } from "../data/teamData";
import { galleryData } from "../data/galleryData";

const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID
);

// -- EVENTS --
export const getEvents = async () => {
  if (!isFirebaseConfigured) return [...upcomingEvents, ...pastEvents];
  const q = query(collection(db, "events"), orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addEvent = async (eventData) => {
  return await addDoc(collection(db, "events"), { ...eventData, createdAt: serverTimestamp() });
};

export const updateEvent = async (id, eventData) => {
  return await updateDoc(doc(db, "events", id), eventData);
};

export const deleteEvent = async (id) => {
  return await deleteDoc(doc(db, "events", id));
};

// -- GALLERY --
// User requested: old setup where they provide Github raw URL:
// { caption, eventId, imageUrl, uploadedAt, uploadedBy }
export const getGallery = async () => {
  if (!isFirebaseConfigured) return galleryData;
  const q = query(collection(db, "gallery"), orderBy("uploadedAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addGalleryImage = async (data) => {
  return await addDoc(collection(db, "gallery"), { ...data, uploadedAt: serverTimestamp() });
};

export const deleteGalleryImage = async (id) => {
  return await deleteDoc(doc(db, "gallery", id));
};

// -- TEAM --
export const getTeam = async () => {
  if (!isFirebaseConfigured) return teamData;
  const snapshot = await getDocs(collection(db, "team"));
  
  // Try to group them by category if necessary
  const members = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return members;
};

export const addTeamMember = async (data) => {
  return await addDoc(collection(db, "team"), data);
};

export const updateTeamMember = async (id, data) => {
  return await updateDoc(doc(db, "team", id), data);
};

export const deleteTeamMember = async (id) => {
  return await deleteDoc(doc(db, "team", id));
};

// -- RESOURCES --
export const getResources = async () => {
  if (!isFirebaseConfigured) return [];
  const q = query(collection(db, "resources"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addResource = async (data) => {
  return await addDoc(collection(db, "resources"), { ...data, createdAt: serverTimestamp() });
};

export const updateResource = async (id, data) => {
  return await updateDoc(doc(db, "resources", id), data);
};

export const deleteResource = async (id) => {
  return await deleteDoc(doc(db, "resources", id));
};

// -- ADMINS --
export const getAdmins = async () => {
  if (!isFirebaseConfigured) return [];
  const snapshot = await getDocs(collection(db, "admins"));
  return snapshot.docs.map(doc => ({ email: doc.id, ...doc.data() }));
};

export const addAdmin = async (email) => {
  return await setDoc(doc(db, "admins", email), { addedAt: serverTimestamp() });
};

export const removeAdmin = async (email) => {
  return await deleteDoc(doc(db, "admins", email));
};

export const firebaseStatus = {
  isConfigured: isFirebaseConfigured,
};

// -- NEWSLETTER --
export const subscribeNewsletter = async (email) => {
  return await addDoc(collection(db, "newsletter"), { email, subscribedAt: serverTimestamp() });
};

// -- COMMUNITY --
export const joinCommunity = async (memberData) => {
  return await addDoc(collection(db, "community_members"), { ...memberData, joinedAt: serverTimestamp() });
};

// -- EVENT REGISTRATION --
export const registerForEvent = async (eventId, studentData) => {
  return await addDoc(collection(db, "registrations"), { eventId, ...studentData, registeredAt: serverTimestamp() });
};

// -- FALLBACKS FOR OLD ROUTES --
import { projectsData } from "../data/projectsData";
import { blogsData } from "../data/blogsData";

export const getProjects = async () => {
  return projectsData;
};

export const getBlogs = async () => {
  return blogsData;
};
