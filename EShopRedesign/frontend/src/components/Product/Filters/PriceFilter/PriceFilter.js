import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './PriceFilter.css';

const PriceFilter = forwardRef((props, ref) => {
    const valuetext = (value) => {
        return `${value}€`;
    }

    const [value, setValue] = React.useState([0, 100]);

    useImperativeHandle(ref, () => ({
        reset() {
            setValue([0, 100]);
        }
    }));

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.onFilterPrice(value[0], value[1]);
    };

    return (
        <form onSubmit={onFormSubmit}>
            <div className={"price-filter"}>
                <Box>
                    <Slider getAriaLabel={() => 'Price range'} value={value} onChange={handleChange}
                            valueLabelDisplay="on" getAriaValueText={valuetext} color="dark"/>
                </Box>
            </div>
            <button className={"btn btn-dark mt-3"} type={"submit"}>Filter</button>
        </form>
    );
});
export default PriceFilter;