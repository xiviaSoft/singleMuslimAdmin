import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "libs";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { FormData } from "types";

const removeUndefined = (obj: Record<string, any>) =>
    Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));

const useCreateUser = (showToast: (msg: string, type: "success" | "error") => void) => {
    return useMutation({
        mutationFn: async (data: FormData) => {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const uid = userCredential.user.uid;

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
                ...rest
            } = data;

            const cleanedRest = removeUndefined(rest);

            await setDoc(doc(db, "users", uid), {
                ...cleanedRest,
                uid,
                isActive: true,
                isSuspended: false,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                lastLogin: serverTimestamp(),
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
                    startDate: startDate ? new Date(startDate) : null,
                    address: companyaddress || "",
                    endDate: isCurrent ? null : endDate ? new Date(endDate) : null,
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
        },
        onSuccess: () => {
            showToast("User signed up successfully", "success");
        },
        onError: (error: any) => {
            showToast(error.message || "Failed to sign up user", "error");
        },
    });
};

export default useCreateUser 