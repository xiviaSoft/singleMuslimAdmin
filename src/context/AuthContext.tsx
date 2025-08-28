import { createContext, useEffect, useState } from "react"
import { DocumentReference, Timestamp, } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "libs";


interface Admin {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "admin" | "super-admin";
    // status: "pending" | "active" | "inactive" | "deleted";
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
interface AuthUserContextType {
    user: Admin | null;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}
export const AuthContextData = createContext<AuthUserContextType>(
    {
        isLoading: true,
        user: null,
        setIsLoading: () => { },
    }

)
const AuthContext = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Admin | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Transform Firebase User to Admin type
                const adminUser: Admin = {
                    id: currentUser.uid,
                    firstName: currentUser.displayName?.split(' ')[0] || '',
                    lastName: currentUser.displayName?.split(' ')[1] || '',
                    email: currentUser.email || '',
                    password: '',
                    role: 'admin',
                    createdAt: Timestamp.now(),
                    updatedAt: Timestamp.now()
                };
                setUser(adminUser);
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);



    return (
        <div>
            <AuthContextData.Provider value={{ user, isLoading, setIsLoading, }}>
                {children}
            </AuthContextData.Provider>
        </div>
    )
}

export default AuthContext
