// Firebase SDK integration using global script imports
// This avoids using npm packages for Firebase

// We'll use a singleton pattern to ensure we only initialize Firebase once
let app = null;
let database = null;

// Function to load Firebase scripts dynamically
export const loadFirebaseScripts = async () => {
  if (typeof window === 'undefined') return null;
  
  // Only load scripts if they haven't been loaded already
  if (!window.firebase) {
    // Create a promise that resolves when all scripts are loaded
    return new Promise((resolve, reject) => {
      // First, load the core Firebase app
      const appScript = document.createElement('script');
      appScript.src = 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js';
      appScript.async = true;
      
      // After core is loaded, load the database module
      appScript.onload = () => {
        const dbScript = document.createElement('script');
        dbScript.src = 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database-compat.js';
        dbScript.async = true;
        
        // When database module is loaded, initialize Firebase
        dbScript.onload = () => {
          try {
            const firebase = initializeFirebase();
            resolve(firebase);
          } catch (error) {
            console.error('Firebase initialization error:', error);
            reject(error);
          }
        };
        
        dbScript.onerror = (e) => {
          console.error('Error loading Firebase Database script', e);
          reject(e);
        };
        
        document.head.appendChild(dbScript);
      };
      
      appScript.onerror = (e) => {
        console.error('Error loading Firebase App script', e);
        reject(e);
      };
      
      document.head.appendChild(appScript);
    });
  }
  
  // If Firebase is already loaded, just initialize
  return initializeFirebase();
};

// Get Firebase config from environment variables
const getFirebaseConfig = () => {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || process.env.FIREBASE_MEASUREMENT_ID
  };
};

// Initialize Firebase
export const initializeFirebase = () => {
  if (typeof window === 'undefined') return null;
  
  // Check if Firebase is available
  if (!window.firebase) {
    console.error('Firebase SDK not loaded yet. Call loadFirebaseScripts first.');
    return null;
  }
  
  // Only initialize once
  if (!app) {
    // Get Firebase configuration from environment variables
    const firebaseConfig = getFirebaseConfig();

    // Initialize Firebase using the global firebase object
    app = window.firebase.initializeApp(firebaseConfig);
    database = window.firebase.database();
  }
  
  return { app, database };
};

// Save chat message to Firebase with error handling
export const saveChatMessage = async (sessionId, message) => {
  try {
    if (!database) {
      const firebase = await loadFirebaseScripts();
      if (!firebase || !firebase.database) {
        console.error('Failed to initialize Firebase database');
        return false;
      }
      database = firebase.database;
    }
    
    const timestamp = new Date().toISOString();
    const chatRef = database.ref(`chats/${sessionId}/messages`);
    await chatRef.push({
      sender: message.sender,
      text: message.text,
      timestamp
    });
    
    // Update session metadata
    const sessionRef = database.ref(`chats/${sessionId}/metadata`);
    await sessionRef.update({
      lastUpdated: timestamp,
      messageCount: window.firebase.database.ServerValue.increment(1)
    });
    
    return true;
  } catch (error) {
    console.error('Error saving chat message:', error);
    return false;
  }
};

// Get all chat sessions with error handling
export const getChatSessions = async () => {
  try {
    if (!database) {
      const firebase = await loadFirebaseScripts();
      if (!firebase || !firebase.database) {
        console.error('Failed to initialize Firebase database');
        return [];
      }
      database = firebase.database;
    }
    
    const chatsRef = database.ref('chats');
    const snapshot = await chatsRef.once('value');
    
    const sessions = [];
    snapshot.forEach((childSnapshot) => {
      const sessionId = childSnapshot.key;
      const data = childSnapshot.val();
      
      // Process each session's messages into an array
      const messages = data.messages ? 
        Object.keys(data.messages).map(key => ({
          id: key,
          ...data.messages[key]
        })) : [];
      
      sessions.push({
        id: sessionId,
        metadata: data.metadata || {},
        messages
      });
    });
    
    return sessions;
  } catch (error) {
    console.error('Error getting chat sessions:', error);
    return [];
  }
};

// Get a single chat session with error handling
export const getChatSession = async (sessionId) => {
  try {
    if (!database) {
      const firebase = await loadFirebaseScripts();
      if (!firebase || !firebase.database) {
        console.error('Failed to initialize Firebase database');
        return null;
      }
      database = firebase.database;
    }
    
    const sessionRef = database.ref(`chats/${sessionId}`);
    const snapshot = await sessionRef.once('value');
    const data = snapshot.val();
    
    if (!data) return null;
    
    // Process messages into an array
    const messages = data.messages ? 
      Object.keys(data.messages).map(key => ({
        id: key,
        ...data.messages[key]
      })) : [];
    
    return {
      id: sessionId,
      metadata: data.metadata || {},
      messages
    };
  } catch (error) {
    console.error('Error getting chat session:', error);
    return null;
  }
};

// Initialize a new chat session with error handling
export const initChatSession = async () => {
  try {
    if (!database) {
      const firebase = await loadFirebaseScripts();
      if (!firebase || !firebase.database) {
        console.error('Failed to initialize Firebase database');
        return null;
      }
      database = firebase.database;
    }
    
    const sessionId = generateSessionId();
    const timestamp = new Date().toISOString();
    
    // Create session metadata
    const sessionRef = database.ref(`chats/${sessionId}/metadata`);
    await sessionRef.set({
      created: timestamp,
      lastUpdated: timestamp,
      messageCount: 0,
      status: 'active'
    });
    
    return sessionId;
  } catch (error) {
    console.error('Error initializing chat session:', error);
    return null;
  }
};

// Helper function to generate a random session ID
const generateSessionId = () => {
  return 'session_' + Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}; 