import type { Request, Response } from 'express';
import type { AuthDto } from '../dtos';
import { auth } from '../services';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseErrorToText } from '../errors';
import type { FirebaseError } from 'firebase/app';

export const registerUser = (req: Request, res: Response) => {
    if (!req.body?.email || !req.body?.password) {
        res.status(400).json({ error: 'email-and-password-required' });
        return;
    }
    const { email, password } = req.body as AuthDto;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            res.status(201).json(user);
            console.log("user created with email:", user.email, user.uid)
        })
        .catch((error: FirebaseError) => {
            if (error.code as string in firebaseErrorToText) {
                res.status(400).json({ error: firebaseErrorToText[error.code as keyof typeof firebaseErrorToText] });
                return;
            }
            console.log("error unknown: ", error)
            res.status(400).json(error);
        });
};

export const loginUser = (req: Request, res: Response) => {
    if (!req.body?.email || !req.body?.password) {
        res.status(400).json({ error: 'email-and-password-required' });
        return;
    }
    const { email, password } = req.body as AuthDto;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            res.status(200).json(user);
            console.log("sign in ok with user:", user.email, user.uid)
        })
        .catch((error: FirebaseError) => {
            if (error.code in firebaseErrorToText) {
                res.status(400).json({ error: firebaseErrorToText[error.code as keyof typeof firebaseErrorToText] });
                return;
            }
            console.log("error unknown: ", error)
            res.status(400).json(error);
        });
};