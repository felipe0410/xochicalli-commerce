import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore"

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

