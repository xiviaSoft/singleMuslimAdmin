import { CustomSelect } from "components"
import { LANGUAGES } from "constant"
import { FormProvider, useForm } from "react-hook-form"


const LanguageInfo = () => {
    // const methods = useForm(
    //     {
    //         defaultValues: {
    //             MyFirstLanguage: LANGUAGES[0],
    //             MySecondLanguage: LANGUAGES[2]
    //         }
    //     }
    // )
    return (

        <div>
            {/* <FormProvider {...methods}> */}

                <CustomSelect
                    name="MyFirstLanguage"
                    label="My First Language"
                    labelOutside={true}
                    options={LANGUAGES.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
                <CustomSelect
                    name="MySecondLanguage"
                    label="My Second Language"
                    labelOutside={true}
                    options={LANGUAGES.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />

            {/* </FormProvider> */}
        </div>
    )
}


export default LanguageInfo
