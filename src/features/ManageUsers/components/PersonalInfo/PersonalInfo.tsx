import { CustomSelect } from "components"
import { COUNTRIES, CURRENT_INCOME, HAS_CHILDREN, LIVING_ARRANGEMENTS, LOOKING_TO_MARRY, MARITAL_STATUS, PAKISTAN_STATES, RELOCATE } from "constant"
import { FormProvider, useForm } from "react-hook-form"



const PersonalInfo = () => {
//   const methods = useForm({
//   defaultValues: {
//     city: "",
//     country: "",
//     relocate: "",
//     LookingToMarry: "",
//     MyIncome: "",
//     MaritalStatus: "",
//     liketoHaveChildren: "",
//     DoIHaveChildrens: "",
//     MyLivingArrangements: "",
//     Country: "",
//     STATE: ""
//   }
// });

    return (

        <div>
            {/* <FormProvider {...methods}> */}
                <CustomSelect
                    name="city"
                    label="My Citizenship"
                    labelOutside={true}
                    options={COUNTRIES.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
                <CustomSelect
                    name="country"
                    label="Country of Origin"
                    labelOutside={true}
                    options={COUNTRIES.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
                <CustomSelect
                    name="relocate"
                    label="Willing to Relocate?"
                    labelOutside={true}
                    options={RELOCATE.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
                <CustomSelect
                    name="LookingToMarry"
                    label="I am Looking to Marry"
                    labelOutside={true}
                    options={LOOKING_TO_MARRY.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
                <CustomSelect
                    name="MyIncome"
                    label="My Income"
                    labelOutside={true}
                    options={CURRENT_INCOME.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
                <CustomSelect
                    name="MaritalStatus"
                    label="Marital Status"
                    labelOutside={true}
                    options={MARITAL_STATUS.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
                <CustomSelect
                    name="liketoHaveChildren"
                    label="I would like to have Children"
                    labelOutside={true}
                    options={HAS_CHILDREN.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
                <CustomSelect
                    name="DoIHaveChildrens"
                    label="Do I have Children"
                    labelOutside={true}
                    options={HAS_CHILDREN.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
                <CustomSelect
                    name="MyLivingArrangementsap"
                    label="My Living Arrangements?"
                    labelOutside={true}
                    options={LIVING_ARRANGEMENTS.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
                <CustomSelect
                    name="Country"
                    label="My Country"
                    labelOutside={true}
                    options={COUNTRIES.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
                <CustomSelect
                    name="STATE"
                    label="My State"
                    labelOutside={true}
                    options={PAKISTAN_STATES.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
                <CustomSelect
                    name="STATE"
                    label="My State"
                    labelOutside={true}
                    options={PAKISTAN_STATES.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />

            {/* </FormProvider> */}
        </div>
    )
}

export default PersonalInfo
