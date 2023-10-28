import { db } from "@/firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore"

// Obtener los archivos de la colección "users"
export const getUsers = async () => {
    try {
        const usersRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersRef);
        const users: any = [];
        usersSnapshot.forEach((doc: any) => {
            users.push({ id: doc.id, ...doc.data() });
        });
        return users;
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        return [];
    }
};

export const updateUser = async (userId: string, newData: any) => {
    try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, newData);
        console.log(`Usuario actualizado correctamente :${userId} `);
        return true
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        return false
    }
};