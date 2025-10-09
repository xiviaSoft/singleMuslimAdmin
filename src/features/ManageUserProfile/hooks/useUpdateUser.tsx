import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "collections";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "libs";

// ✅ Cleans undefined/null recursively
const cleanDeep = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(cleanDeep).filter((v) => v !== undefined);
  } else if (obj !== null && typeof obj === "object" && !(obj instanceof Date)) {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined && value !== null) {
        result[key] = cleanDeep(value);
      }
    }
    return result;
  }
  return obj;
};

// ✅ Converts date strings (YYYY-MM-DD or ISO) to JS Date objects
const convertDatesToDateObjects = (obj: any): any => {
  if (obj === null || obj === undefined) return obj;

  // ⚡ If it's already a Date → keep it
  if (obj instanceof Date) return obj;

  if (typeof obj === "string") {
    // Matches "2025-10-09"
    if (/^\d{4}-\d{2}-\d{2}$/.test(obj)) {
      return new Date(obj);
    }

    // Matches ISO strings
    if (!isNaN(Date.parse(obj))) {
      return new Date(obj);
    }

    return obj; // Not a date
  }

  if (Array.isArray(obj)) {
    return obj.map(convertDatesToDateObjects);
  }

  if (typeof obj === "object") {
    // ⚡ Build new object carefully (don’t mutate Dates)
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = convertDatesToDateObjects(value);
    }
    return result;
  }

  return obj;
};

const useUpdateUser = (uid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: Partial<User>) => {
      if (!uid) throw new Error("No UID provided");

      const userRef = doc(db, "users", uid);

      // ✅ Convert all date strings to real JS Dates
      const converted = convertDatesToDateObjects(updates);

      // ✅ Clean undefined/null values
      const cleaned = cleanDeep(converted);

      console.log("📌 Final Firestore data:", cleaned);

      // ✅ Log each field type for debugging
      for (const [k, v] of Object.entries(cleaned)) {
        console.log(`➡️ ${k}:`, v, v instanceof Date ? "✅ Date" : typeof v);
      }

      await setDoc(
        userRef,
        {
          ...cleaned,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", uid] });
    },
  });
};

export default useUpdateUser;
