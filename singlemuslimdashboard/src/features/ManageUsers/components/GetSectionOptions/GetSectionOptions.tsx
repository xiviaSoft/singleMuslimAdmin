import { CustomSelect } from "components";
import { SECTION } from "constant";


const GetSectionOptions = () => {
    return (
        <>
            {SECTION.map((section) => {
                const options = Object.entries(section.data).map(([key, value]) => ({
                    value: key,
                    label: `${key}: ${value}`, // label shows both key and value
                }));

                return (
                    <CustomSelect
                        key={section.title}
                        name={section.title.replace(/\s+/g, "_").toLowerCase()}
                        label={section.title} // section title as label
                        options={options}
                        width="100%"
                    />
                );
            })}
        </>
    );
}

export default GetSectionOptions
