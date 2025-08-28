

import { CustomSelect } from "components"
import { BUILD_OPTIONS, DISABILITIES, EYE_COLORS, HAIR_COLORS, HEIGHTS_OPTIONS, SMOKE_OPTIONS } from "constant"




const AppearanceInfo = () => {

    return (

        <div>

            <CustomSelect
                name="Height"
                label="My Height"
                labelOutside={true}
                options={HEIGHTS_OPTIONS.map((item) => ({
                    label: item,
                    value: item,
                }))}
            />
            <CustomSelect
                name="MyBuild"
                label="My Build"
                labelOutside={true}
                options={BUILD_OPTIONS.map((item) => ({
                    label: item,
                    value: item,
                }))}
            />
            <CustomSelect
                name="MyHairColour"
                label="My Hair Colour"
                labelOutside={true}
                options={HAIR_COLORS.map((item) => ({
                    label: item,
                    value: item,
                }))}
            />
            <CustomSelect
                name="ColourOfMyEyes"
                label="Colour of My Eyes"
                labelOutside={true}
                options={EYE_COLORS.map((item) => ({
                    label: item,
                    value: item,
                }))}
            />
            <CustomSelect
                name="DoISmoke"
                label="Do I Smoke?"
                labelOutside={true}
                options={SMOKE_OPTIONS.map((item) => ({
                    label: item,
                    value: item,
                }))}
            />
            <CustomSelect

                name="DoIHaveAnyDisabilities"
                label="Do I Have Any Disabilities?"
                labelOutside={true}
                options={DISABILITIES.map((item) => ({
                    label: item,
                    value: item,
                }))}
            />






        </div>
    )
}



export default AppearanceInfo
