import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { createContext, useState } from 'react'
import app from '../Pages/Config';
import useAxiousPublic from '../hooks/useAxiousPublic';

export const AuthContext = createContext(null)
const auth = getAuth(app)
const GoogleProvider = new GoogleAuthProvider();
const axiosPublic = useAxiousPublic()
const AuthProvider = ({ children }) => {
    const [user, setuser] = useState('null')
    const [looding, setlooding] = useState(true)

    const CreateUserByEmail = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const LoginByEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const LiginByGoogle = () => {
        return signInWithPopup(auth, GoogleProvider)
    }
    const UpdateInfo = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }
    const UpdatePayment = () => {
        return updateProfile(auth.currentUser, {
            PaymentVirifide: true,
        })
    }

    const LogOut = () => {

        signOut(auth)
    }

    onAuthStateChanged(auth, (user) => {
        const email = user?.email || user?.email;
        const useremail = { email };
        if (user) {
            setuser(user)
            setlooding(false)

            axiosPublic.post('/jwt', useremail)
                .then(res => {
                    localStorage.setItem("acces-token", res.data)
                })
        }
        else {
            setlooding(false)
            setuser(null)
            localStorage.removeItem("acces-token")
        }
    })

    const info = {
        user,
        CreateUserByEmail,
        looding,
        setlooding,
        LoginByEmail,
        LiginByGoogle,
        LogOut,
        UpdateInfo,
        setuser,
        UpdatePayment,
    }
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;