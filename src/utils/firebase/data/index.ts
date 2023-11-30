import { FirebaseError } from "firebase/app";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";

import { db, storage } from "@/firebase";
import { CommentInfo, PersonalDataProps, Shipping } from "@/interfaces";
import { Value } from "@/pages/admin/addProduct/interface";

export const updateInformation = async (
  values: PersonalDataProps,
  uid: string
): Promise<void | FirebaseError> => {
  const { name, fatherSurname, motherSurname } = values;
  try {
    const userRef = doc(db, `/users/${uid}`);

    let birthday: string = "";

    if (values.birthday) {
      const stringDate = new Date(values.birthday);
      if (!isNaN(stringDate.getTime())) {
        birthday = stringDate.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        });
      } else {
        throw new Error("Invalid date format");
      }
    }

    return await updateDoc(userRef, {
      name,
      fatherSurname,
      motherSurname,
      birthday,
    });
  } catch (error) {
    return error as FirebaseError;
  }
};

export const updateProfilePicture = async (
  fileRef: File,
  uid: string
): Promise<string | FirebaseError | false> => {
  try {
    const imgRef = ref(storage, `profilePictures/${uid}`);
    const imgUpload = uploadBytesResumable(imgRef, fileRef);

    const url = await new Promise<string>((resolve, reject) => {
      imgUpload.on(
        "state_changed",
        ({ state }: { state: any }) => {
          switch (state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (err: any) => {
          reject(err);
        },
        async () => {
          try {
            const url = await getDownloadURL(imgUpload.snapshot.ref);

            await updateDoc(doc(db, "users", uid), { profilePicture: url });
            resolve(url);
          } catch (err) {
            reject(err);
          }
        }
      );
    });

    return url;
  } catch (error) {
    return error as FirebaseError;
  }
};

export const queryUser = async (
  uid: string
): Promise<DocumentData | undefined> => {
  try {
    const queriedUser = await getDoc(doc(db, "users", uid));
    return queriedUser && queriedUser.data();
  } catch (error) {
    if (error instanceof FirebaseError) throw error;
  }
};

export const deleteUser = async (uid: string): Promise<any> => {
  try {
    const userRef = doc(db, "users", uid);
    await deleteDoc(userRef);
    return true;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw error;
    }
    return false;
  }
};

export const queryDirections = async (
  uid: string
): Promise<DocumentData | undefined> => {
  try {
    const queriedUser = await getDoc(doc(db, "directions", uid));
    return queriedUser && queriedUser.data();
  } catch (error) {
    if (error instanceof FirebaseError) throw error;
  }
};

export const getProducts = async (): Promise<
  { id: string }[] | FirebaseError
> => {
  try {
    const { docs } = await getDocs(collection(db, "products"));

    const products = docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return products;
  } catch (error) {
    return error as FirebaseError;
  }
};

export const getProduct = async (
  collectionName: string,
  id: string
): Promise<false | DocumentData | FirebaseError> => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() && { ...docSnap.data(), id: docSnap.id };
  } catch (error) {
    console.log('getProduct::>', error)
    return {};
  }
};

export const getComments = async (): Promise<Comment[] | FirebaseError> => {
  try {
    const { docs } = await getDocs(collection(db, "comments"));

    const comments = docs.map((doc: any) => ({
      ...doc.data(),
    }));

    return comments;
  } catch (error) {
    return error as FirebaseError;
  }
};

export const addComment = async (
  values: CommentInfo,
  product: string
): Promise<void | FirebaseError> => {
  try {
    const prevComment = await addDoc(collection(db, "comments"), {
      comment: values.comment,
      fatherSurname: values.fatherSurname,
      name: values.name,
      createdAt: new Date().toLocaleDateString("es-ES"),
      product,
      id: crypto.randomUUID(),
      checked: false,
    });

    return await setDoc(
      doc(db, "products", prevComment.id),
      { id: prevComment.id },
      { merge: true }
    );
  } catch (error) {
    return error as FirebaseError;
  }
};

export const addOrder = async (
  items: any,
  total: number,
  card: string,
  uid: string
) => {
  try {
    const trimmedCard = card.slice(-4);
    const timeStamp = new Date();
    const formatted = timeStamp.toISOString();
    const orderRef = collection(db, `orders/${uid}`, formatted);
    await addDoc(orderRef, {
      items,
      total,
      cardUsed: trimmedCard,
    });
    return localStorage.removeItem("cart");
  } catch (e) {
    return e as FirebaseError;
  }
};

export const addAddress = async (
  values: Shipping,
  uid: string
): Promise<void | FirebaseError> => {
  try {
    const userRef = doc(db, "users", uid);

    const valuesToAdd = {
      names: values.names,
      zipCode: values.zip,
      address: values.address,
      city: values.city,
      state: values.state,
      colony: values.colony,
    };

    return await updateDoc(userRef, {
      address: arrayUnion(valuesToAdd),
    });
  } catch (e) {
    return e as FirebaseError;
  }
};

export const deleteAddress = async () => {
  try {
  } catch (e) {
    return e as FirebaseError;
  }
};

export const queryData = async (col: string): Promise<any | FirebaseError> => {
  try {
    const { docs } = await getDocs(collection(db, col));

    return docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
  } catch (error) {
    return error as FirebaseError;
  }
};

export const uploadImage = async (
  fileRef: any
): Promise<string | undefined | null | FirebaseError> => {
  try {
    const file = fileRef.current?.files?.[0] ?? new Blob();
    const fileName = file?.name;
    const imgRef = ref(storage, `products/${v4() + fileName}`);
    const imgUpload = uploadBytesResumable(imgRef, file);

    if (!file) {
      console.error("No file selected");
      return null; // Return null instead of void
    }

    const url = await new Promise<string>((resolve, reject) => {
      imgUpload.on(
        "state_changed",
        ({ state }: { state: any }) => {
          switch (state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (err: any) => {
          reject(err);
        },
        async () => {
          try {
            const url = await getDownloadURL(imgUpload.snapshot.ref);
            resolve(url);
          } catch (err) {
            reject(err);
          }
        }
      );
    });

    return url; // Return the URL
  } catch (error) {
    return error as FirebaseError;
  }
};

export const addProduct = async (data: Value) => {
  try {
    const docRef = await addDoc(collection(db, "products"), data);
    return docRef.id; // Devuelve el ID del documento recién creado
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    return false;
  }
};

export const deleteProduct = async (
  id: string,
  image: string
): Promise<void | FirebaseError> => {
  try {
    await deleteDoc(doc(db, "products", id));
    await deleteObject(ref(storage, image));
  } catch (error) {
    return error as FirebaseError;
  }
};

export const guardarDireccion = async (userId: string, direction: any) => {
  try {
    const direccionRef = doc(db, "directions", userId);
    await setDoc(direccionRef, direction);
    console.log("Address saved successfully");
  } catch (error) {
    console.error("Error saving address:", error);
  }
};

export const getCategorias = async () => {
  try {
    const { docs } = await getDocs(collection(db, "categorias"));
    const categorias: any = {};
    const categoriasArray: any = [];
    docs.map((doc: any) => console.log(doc.id));
    docs.forEach((doc) => {
      categorias[doc.id] = doc.data();
      categoriasArray.push(doc.id);
    });
    categorias["categorias"] = categoriasArray;
    return categorias;
  } catch (error) {
    return error as FirebaseError;
  }
};

export const saveCategoriasToFirebase = async (data: any) => {
  try {
    const categoriasRef = doc(db, "categorias", data.categoria);
    await setDoc(categoriasRef, data);
    console.log("Datos guardados en Firebase correctamente.");
    return true;
  } catch (error) {
    console.error(
      "Error al guardar los datos en Firebase:",
      error as FirebaseError
    );
    return false;
  }
};

export const deleteCategoria = async (categoriaId: string) => {
  try {
    const categoriaRef = doc(db, "categorias", categoriaId);
    await deleteDoc(categoriaRef);
    console.log(`Categoría con ID ${categoriaId} eliminada correctamente.`);
    return true;
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
    return false;
  }
};
