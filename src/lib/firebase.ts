import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, updateDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD5_j4-MIbJUJBqXYpPUvwDlJf9aAbAU8Q",
  authDomain: "projeto-empresario.firebaseapp.com",
  projectId: "projeto-empresario",
  storageBucket: "projeto-empresario.firebasestorage.app",
  messagingSenderId: "974768326154",
  appId: "1:974768326154:web:67dcaa1a73045dabdb41f3",
  measurementId: "G-KFQ2SCKKYM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Database Operations
export const createDocument = async (collectionName: string, id: string, data: any) => {
  try {
    await setDoc(doc(db, collectionName, id), {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

export const updateDocument = async (collectionName: string, id: string, data: any) => {
  try {
    await updateDoc(doc(db, collectionName, id), {
      ...data,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const deleteDocument = async (collectionName: string, id: string) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

export const queryDocuments = async (collectionName: string, conditions: { field: string; operator: any; value: any }[]) => {
  try {
    const q = query(
      collection(db, collectionName),
      ...conditions.map(c => where(c.field, c.operator, c.value))
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error querying documents:', error);
    throw error;
  }
};