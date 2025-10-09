import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, firebaseConfig } from "libs";
import { FormData } from "types";

const removeUndefined = (obj: Record<string, any>) =>
    Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));

const toDate = (value: any): Date | null => {
    if (!value) return null;
    return value instanceof Date ? value : new Date(value);
};

const useCreateUser = (
    showToast: (msg: string, type: "success" | "error") => void
) => {
    return useMutation({
        mutationFn: async (data: FormData) => {

            const secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");
            const secondaryAuth = getAuth(secondaryApp);

            // Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(
                secondaryAuth,
                data.email,
                data.password
            );

            const uid = userCredential.user.uid;

            // Destructure fields
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

            // Save user data with actual Date objects
            await setDoc(doc(db, "users", uid), {
                ...cleanedRest,
                uid,
                isActive: true,
                isSuspended: false,

                // Firestore timestamps (auto-handled as Timestamps)
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                lastLogin: serverTimestamp(),

                // Convert dateOfBirth to Date (not string)
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
                    startDate: startDate ? toDate(startDate) : null,
                    address: companyaddress || "",
                    endDate: isCurrent ? null : endDate ? toDate(endDate) : null,
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

            // Sign out secondary auth to prevent conflicts
            await secondaryAuth.signOut();
        },

        onSuccess: () => showToast("User created successfully!", "success"),
        onError: (error: any) =>
            showToast(error.message || "Failed to create user", "error"),
    });
};

export default useCreateUser;
