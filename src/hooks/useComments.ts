import { useEffect, useState } from 'react'

import { FirebaseError } from 'firebase/app'
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore'

import { CommentInfo } from '@/interfaces'
import { db } from '@/firebase'

export const useComments = (product: string) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [comments, setComments] = useState<CommentInfo[]>([])

    useEffect(() => {
        const getFirebaseComments = async () => {
            setLoading(true)
            try {
                const commentsRef = collection(db, 'comments')

                if (product) {
                    const _query = query(commentsRef, where('product', '==', product), limit(3))

                    onSnapshot(_query, (snapshot) => {
                        return setComments(snapshot.docs.map((doc) => ({
                            ...doc.data(),
                            id: doc.id
                        })) as CommentInfo[])
                    })
                } else {
                    return [] as CommentInfo[]
                }
            } catch (error) {
                return error as FirebaseError;
            }
            setLoading(false)
        }

        getFirebaseComments()
    }, [loading, product, comments])

    return {
        loading,
        comments,
    }
}