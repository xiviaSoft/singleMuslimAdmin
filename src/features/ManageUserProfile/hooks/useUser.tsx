// hooks/useUser.ts
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "libs";
import { User } from "collections";

const useUser = (uid: string) => {
    return useQuery({
        queryKey: ["user", uid],
        queryFn: async () => {
            const ref = doc(db, "users", uid);
            const snap = await getDoc(ref);
            if (!snap.exists()) throw new Error("User not found");
            return snap.data() as User;
        },
        enabled: !!uid, // only run if uid exists
    });
};

export default useUser;
