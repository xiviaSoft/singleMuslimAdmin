import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, firebaseConfig } from "libs";
import { FormData } from "types";

const removeUndefined = (obj: Record<string, any>) =>
    Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));

const toDate = (value: any): Date | null => {
    if (!value) return null;
    // If value is already a Date, return it. Otherwise, convert from string.
    return value instanceof Date ? value : new Date(value);
};

const useCreateUser = (showToast: (msg: string, type: "success" | "error") => void) => {
    return useMutation({
        mutationFn: async (data: FormData) => {
            // 🔹 Secondary app to prevent login swap
            const secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");
            const secondaryAuth = getAuth(secondaryApp);

            // 1️⃣ Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(
                secondaryAuth,
                data.email,
                data.password
            );
            const uid = userCredential.user.uid;

            // 2️⃣ Clean and normalize data
            const {
                password,
                companyName,
                companyaddress,
                companydescription,
                role,
                startDate,
                endDate,
                isCurrent,
                technicalSkills,
                softSkills,
                languages,
                facebook,
                twitter,
                linkedin,
                instagram,
                bio,
                highestDegree,
                institutionName,
                graduationYear,
                fieldOfStudy,
                dateOfBirth,
                ...rest
            } = data;

            const cleanedRest = removeUndefined(rest);

            // 3️⃣ Save data in Firestore with proper date conversion
            await setDoc(doc(db, "users", uid), {
                ...cleanedRest,
                uid,
                isActive: true,
                isSuspended: false,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                lastLogin: serverTimestamp(),

                // ✅ Ensure dateOfBirth is stored as a Date object
                dateOfBirth: toDate(dateOfBirth),

                bio: bio || "",
                educationInformation: {
                    highestDegree: highestDegree || "",
                    institutionName: institutionName || "",
                    graduationYear: graduationYear || null,
                    fieldOfStudy: fieldOfStudy || "",
                },
                workExperience: {
                    companyName: companyName || "",
                    role: role || "",
                    startDate: toDate(startDate),
                    address: companyaddress || "",
                    endDate: isCurrent ? null : toDate(endDate),
                    isCurrent: isCurrent || false,
                    description: companydescription || "",
                },
                socialLinks: {
                    facebook: facebook || "",
                    twitter: twitter || "",
                    linkedin: linkedin || "",
                    instagram: instagram || "",
                },
                skills: {
                    technicalSkills: Array.isArray(technicalSkills)
                        ? technicalSkills
                        : technicalSkills
                            ? technicalSkills.split(",").map((s) => s.trim())
                            : [],
                    softSkills: Array.isArray(softSkills)
                        ? softSkills
                        : softSkills
                            ? softSkills.split(",").map((s) => s.trim())
                            : [],
                    languages: Array.isArray(languages)
                        ? languages
                        : languages
                            ? languages.split(",").map((s) => s.trim())
                            : [],
                },
            });

            // 4️⃣ Sign out secondary auth (prevents login swap)
            await secondaryAuth.signOut();
        },

        onSuccess: () => showToast("User created successfully!", "success"),
        onError: (error: any) =>
            showToast(error.message || "Failed to create user", "error"),
    });
};

export default useCreateUser;
