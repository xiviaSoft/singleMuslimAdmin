// hooks/useAdmins.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, doc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "libs";
import { Admin } from "collections";

export type AdminWithId = Admin & { id: string };

const ADMINS_QUERY_KEY = ["admins"];

// --------------------
// Hook: useAdmins
// --------------------
export const useAdmins = () => {
    const queryClient = useQueryClient();

    const query = useQuery<AdminWithId[]>({
        queryKey: ADMINS_QUERY_KEY,
        queryFn: async () => {
            // Return [] as fallback until onSnapshot populates
            return [];
        },
        initialData: [],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchInterval: false,
    });

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "admins"), (snapshot) => {
            const admins: AdminWithId[] = snapshot.docs.map((docSnap) => ({
                id: docSnap.id,
                ...(docSnap.data() as Admin),
            }));
            queryClient.setQueryData(ADMINS_QUERY_KEY, admins);
        });

        return unsubscribe;
    }, [queryClient]);

    return query;
};

// --------------------
// Hook: useDeleteAdmin
// --------------------
export const useDeleteAdmin = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            await deleteDoc(doc(db, "admins", id));
        },
        // no need to invalidate; onSnapshot will auto-update
    });
};

// --------------------
// Hook: useUpdateAdmin
// --------------------
export const useUpdateAdmin = () => {
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Partial<Admin> }) => {
            await updateDoc(doc(db, "admins", id), data);
        },
    
    });
};
