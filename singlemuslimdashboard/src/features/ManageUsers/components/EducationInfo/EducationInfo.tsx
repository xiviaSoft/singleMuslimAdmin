

import { CustomSelect } from "components"
import { BUILD_OPTIONS, DISABILITIES, EDUCATION_LEVEL, EYE_COLORS, HAIR_COLORS, HEIGHTS_OPTIONS, SMOKE_OPTIONS } from "constant"

import { FormProvider, useForm } from "react-hook-form"



const EducationInfo = () => {
    const methods = useForm()
    return (

        <div>
            <FormProvider {...methods}>

                <CustomSelect
                    name="EducationLevel"
                    label="My Education Level"
                    labelOutside={true}
                    options={EDUCATION_LEVEL.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
                <CustomSelect
                    name="mySubject"
                    label="Subject I Studied"
                    labelOutside={true}
                    options={EDUCATION_LEVEL.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />






            </FormProvider>
        </div>
    )
}






export default EducationInfo
