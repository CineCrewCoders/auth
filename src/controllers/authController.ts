import type { Request, Response } from 'express';
import type { AuthDto } from '../dtos';
import { auth } from '../services';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const registerUser = (req: Request, res: Response) => {
    if (!req.body?.email || !req.body?.password) {
        res.status(400).json({ error: 'Email and password are required.' });
        return;
    }
    const { email, password } = req.body as AuthDto;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            res.status(201).json(user);
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                res.status(400).json({ error: 'email-exists' });
                return;
            }
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
        })
        .catch((error) => {
            if (error.code === 'auth/invalid-credential') {
                res.status(400).json({ error: 'invalid-credentials' });
                return;
            }
            console.error(error);
            res.status(400).json(error);
        });
};