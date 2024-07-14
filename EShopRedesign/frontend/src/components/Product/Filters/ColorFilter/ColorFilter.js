import React, { forwardRef, useImperativeHandle, useState } from 'react';
import './ColorFilter.css';

const ColorFilter = forwardRef((props, ref) => {

    const [checkboxStates, setCheckboxStates] = useState({});

    useImperativeHandle(ref, () => ({
        reset() {
            setCheckboxStates({});
        }
    }));

    const handleChange = (colorName) => {
        setCheckboxStates({
            ...checkboxStates,
            [colorName]: !checkboxStates[colorName]
        });
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        const selectedColors = Object.entries(checkboxStates).filter(([name, checked]) => checked).map(([name]) => name);
        props.onFilterColors(selectedColors);
    };

    return (
        <form onSubmit={onFormSubmit} className={"color-form"}>
            {props.colors && props.colors.map((color) => (
                <label key={color.id} className={`color-checkbox ${color.color}`}
                       style={{ background: color.color === 'MIX' ? `url(${color.value})` : color.value }}>
                    <input type="checkbox" checked={checkboxStates[color.color]} onChange={() => handleChange(color.color)}/>
                    <span className="checkmark"></span>
                </label>
            ))}

            <button className="btn btn-dark mt-3" type="submit">Filter</button>
        </form>
    );
});

export default ColorFilter;
