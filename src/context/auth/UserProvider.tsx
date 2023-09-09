import { useState, useEffect, FC } from 'react'

import { onAuthStateChanged, User } from 'firebase/auth';

import { ContextProps } from '@/types';
import { auth } from '@/firebase';
import { UserContext } from "."
import { queryUser } from '@/utils';
import { UserInformation } from '@/interfaces';

export const UserProvider: FC<ContextProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<string>('')
  const [user, setUser] = useState<User | null>(null);
  const [userInformation, setUserInformation] = useState<UserInformation>({
    gender: '',
    fatherSurname: '',
    age: 0,
    securityQuestion: '',
    birthday: '',
    role: '',
    createdAt: '',
    securitySelect: '',
    name: '',
    address: null,
    email: '',
    profilePicture: '',
    uid: '',
    cards: {},
    phoneNumber: '',
    motherSurname: '',
  })

  useEffect(() => {
    const getUserRole = async () => {
      const userData = await queryUser(user?.uid as string)
      if (userData && userData.role) {
        setUserInformation(userData as UserInformation)
        setUserRole(userData.role)
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (activeUser) => {
      if (activeUser) {
        setUser(activeUser);
      } else {
        setUser(null);
      }
    });

    getUserRole()

    return unsubscribe;
  }, [user?.uid, userInformation]);

  return (
    <UserContext.Provider value={{ user, userRole, userInformation }}>
      {children}
    </UserContext.Provider>);
};