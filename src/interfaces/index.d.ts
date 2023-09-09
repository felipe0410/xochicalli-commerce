
import { StackProps } from "@chakra-ui/react";
import { User } from "firebase/auth";

export interface UserHeaderCardProps {
  imageURL: string;
  name: string;
  createdAt: string;
}

export interface Shipping {
  names: string,
  address: string,
  zip: string,
  state: string,
  city: string,
  colony: string[] | string,
  email: string,
}

export interface PersonalDataProps {
  name: string;
  fatherSurname: string;
  motherSurname: string;
  birthday: string;
}

export interface NavbarItems {
  id: number;
  text: string;
  path: string;
}

export interface PasswordResetQuestion {
  email: string;
  securitySelect: string;
  securityQuestion: string;
  newPassword: string;
}

export interface PasswordResetEmail {
  email: string;
}

export interface LoginInputs {
  email: string;
  password: string;
}

export interface RegisterInputs {
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  birthday: Date;
  fatherSurname: string;
  motherSurname: string;
  name: string;
  phoneNumber: number;
  securityQuestion: string;
  securitySelect: string;
}

export interface UserInformation {
  gender: string;
  fatherSurname: string;
  age: number;
  securityQuestion: string;
  birthday: string;
  role: string;
  createdAt: string;
  securitySelect: string;
  name: string;
  address: Shipping[] | null;
  email: string;
  profilePicture: string;
  uid: string;
  cards: { [key: string]: string };
  phoneNumber: string;
  motherSurname: string;
}

export interface CommentInfo {
  name: string;
  fatherSurname: string;
  avatar: string;
  comment: string;
  rating?: number;
  createdAt: string;
  id: string;
}

export interface RegisterUserInfo {
  gender: string;
  name: string;
  birthday: Date;
  fatherSurname: string;
  motherSurname: string;
  phoneNumber: number;
  securityQuestion: string;
  securitySelect: string;
}

export interface ContactInputs {
  name: string;
  email: string;
  message: string;
}

export interface Inputs {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: any;
}

export interface FirebaseUser {
  birthday: string;
  role: string;
  createdAt: string;
  phoneNumber: string;
  gender: string;
  securitySelect: string;
  age: number;
  securityQuestion: string;
  fatherSurname: string;
  email: string;
  uid: string;
  motherSurname: string;
  name: string;
  profilePicture: string;
  address: null | Shipping[];
}


export interface UserContextProps {
  user: User | null;
  userRole: string | null;
  userInformation: FirebaseUser | null;
}


export interface Product {
  description?: string;
  image: string;
  category: string;
  title: string;
  price: number;
  sold?: number;
  stock?: number;
  id: string;
}

export interface CartProduct {
  image: string;
  category: string;
  title: string;
  price: number;
  id: string;
  quantity: number;
}

export interface RatingProps {
  defaultValue?: number
  max?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  rootProps?: StackProps
}

export interface DeleteItems {
  title: string
  id: string
}

export interface ActiveUser {
  isUser: User
}

export interface PaymentInformation {
  name: string;
  cardNumber: string;
  expDate: {
    month: string;
    year: string;
  };
  cvv: string;
}


export interface MXZip {
  state: State;
  municipality: string;
  neighborhoods: string[];
  [key: string]: State | string | string[]; // Add the index signature here
}

export enum State {
  Aguascalientes = "Aguascalientes",
  BajaCalifornia = "Baja California",
  BajaCaliforniaSur = "Baja California Sur",
  Campeche = "Campeche",
  Chiapas = "Chiapas",
  Chihuahua = "Chihuahua",
  CoahuilaDeZaragoza = "Coahuila de Zaragoza",
  Colima = "Colima",
  DistritoFederal = "Distrito Federal",
  Durango = "Durango",
  Guanajuato = "Guanajuato",
  Guerrero = "Guerrero",
  Hidalgo = "Hidalgo",
  Jalisco = "Jalisco",
  MichoacánDeOcampo = "Michoacán de Ocampo",
  Morelos = "Morelos",
  México = "México",
  Nayarit = "Nayarit",
  NuevoLeón = "Nuevo León",
  Oaxaca = "Oaxaca",
  Puebla = "Puebla",
  Querétaro = "Querétaro",
  QuintanaRoo = "Quintana Roo",
  SANLuisPotosí = "San Luis Potosí",
  Sinaloa = "Sinaloa",
  Sonora = "Sonora",
  Tabasco = "Tabasco",
  Tamaulipas = "Tamaulipas",
  Tlaxcala = "Tlaxcala",
  VeracruzDeIgnacioDeLaLlave = "Veracruz de Ignacio de la Llave",
  Yucatán = "Yucatán",
  Zacatecas = "Zacatecas",
}


export interface Place {
  "place name": string;
  longitude: string;
  state: string;
  "state abbreviation": string;
  latitude: string;
}

export interface BannerImages {
  images: string[];
  id: string;
}
