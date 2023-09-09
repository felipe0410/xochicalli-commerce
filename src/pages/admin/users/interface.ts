export interface User {
    id: string;
    uid: string;
    gender: string;
    securitySelect: string;
    fatherSurname: string;
    address: {
        state?: string;
        names?: string;
        city?: string;
        zipCode?: string;
        colony?: string;
        address?: string;
    };
    securityQuestion: string;
    age: number;
    name: string;
    birthday: string;
    role: string;
    profilePicture: string | null;
    createdAt: string;
    phoneNumber: string;
    email: string;
    motherSurname: string;
}