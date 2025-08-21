import { CustomSelect } from "components"
import { BEARD, KEEPS_HALAL, PERFROMS_SALAAH, PREFER_HIJAB, RELIGION_OPTIONS, SEC_DATA } from "constant"
import { FormProvider, useForm } from "react-hook-form"


const ReligionInfo = () => {
    const methods = useForm()
    return (
        <div>
            <FormProvider {...methods} >
                <CustomSelect
                    name="Religiousness"
                    label="Religiousness"
                    labelOutside={true}
                    options={RELIGION_OPTIONS.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
                <CustomSelect
                    name="MySect"
                    label="My Sect"
                    labelOutside={true}
                    options={SEC_DATA.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
                <CustomSelect
                    name="Hijab/Niqab"
                    label="Hijab/Niqab"
                    labelOutside={true}
                    options={PREFER_HIJAB.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
                <CustomSelect
                    name="Beard"
                    label="Beard"
                    labelOutside={true}
                    options={BEARD.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
                <CustomSelect
                    name="AreYouARevert?"
                    label="Are You A Revert?"
                    labelOutside={true}
                    options={BEARD.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
                <CustomSelect
                    name="DoYouKeepHalal?"
                    label="Do You Keep Halal?"
                    labelOutside={true}
                    options={KEEPS_HALAL.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
                <CustomSelect
                    name="DoYouPerformSalaah?"
                    label="Do You Perform Salaah?"
                    labelOutside={true}
                    options={PERFROMS_SALAAH.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
            </FormProvider>
        </div>
    )
}

export default ReligionInfo
