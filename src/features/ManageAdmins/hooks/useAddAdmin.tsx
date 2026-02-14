import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, firebaseConfig } from "libs";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


export const useAddAdmin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: any) => {
            // 🔹 Create a secondary app to avoid affecting the main auth session
            const secondaryApp = initializeApp(firebaseConfig, "Secondary");
            const secondaryAuth = getAuth(secondaryApp);

            // Create user using secondary auth instance
            const userCredential = await createUserWithEmailAndPassword(
                secondaryAuth,
                data.email,
                data.password
            );

            const newUid = userCredential.user.uid;

            // Store admin data in Firestore
            await setDoc(doc(db, "admins", newUid), {
                adminId: newUid,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                role: data.role,
                phoneNumber: data.phoneNumber || null,
                createdAt: new Date(),
                lastLogin: new Date(),
                isActive: true,
                createdBy: auth.currentUser?.uid || null,
            });

            // ✅ Important: sign out from the secondary auth to clean up
            await secondaryAuth.signOut();
        },

        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admins"] }),
    });
};
