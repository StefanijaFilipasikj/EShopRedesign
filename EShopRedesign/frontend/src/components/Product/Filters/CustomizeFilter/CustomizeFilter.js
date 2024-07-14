import React, { forwardRef, useImperativeHandle, useState } from 'react';
import './CustomizeFilter.css';
import woman from './customize-images/woman.png';
import woman_dress_short from './customize-images/woman-dress-short.png';
import woman_dress_long from './customize-images/woman-dress-long.png';
import woman_neckline_v from './customize-images/woman-neckline-v.png';
import woman_neckline_straight from './customize-images/woman-neckline-straight.png';
import woman_neckline_square from './customize-images/woman-neckline-square.png';
import woman_sleeves_straps from './customize-images/woman-sleeves-straps.png';
import woman_sleeves_short from './customize-images/woman-sleeves-short.png';
import woman_skirt_long from './customize-images/woman-skirt-long.png'
import woman_skirt_short from './customize-images/woman-skirt-short.png'
import woman_waist_high from './customize-images/woman-waist-high.png'
import woman_waist_low from './customize-images/woman-waist-low.png'
import woman_jeans_slim from './customize-images/woman-jeans-slim.png'
import woman_jeans_straight from './customize-images/woman-jeans-straight.png'
import woman_jeans_wide from './customize-images/woman-jeans-wide.png'

import man from './customize-images/man.png';
import man_shirt_long from './customize-images/man-shirt-long.png'
import man_shirt_short from './customize-images/man-shirt-short.png'
import man_sleeves_short from './customize-images/man-sleeves-short.png'
import man_sleeves_long from './customize-images/man-sleeves-long.png'
import man_neckline_crew from './customize-images/man-neckline-crew.png'
import man_neckline_polo from './customize-images/man-neckline-polo.png'
import man_trousers_slim from './customize-images/man-trousers-slim.png'
import man_trousers_standard from './customize-images/man-trousers-standard.png'
import man_trousers_wide from './customize-images/man-trousers-wide.png'
import man_waist_high from './customize-images/man-waist-high.png'
import man_waist_low from './customize-images/man-waist-low.png'

import girl from './customize-images/girl.png'
import girl_shirt_long from './customize-images/girl-shirt-long.png'
import girl_shirt_short from './customize-images/girl-shirt-short.png'
import girl_neckline_crew from './customize-images/girl-neckline-crew.png'
import girl_neckline_square from './customize-images/girl-neckline-square.png'
import girl_sleeves_long from './customize-images/girl-sleeves-long.png'
import girl_sleeves_short from './customize-images/girl-sleeves-short.png'
import girl_sleeves_straps from './customize-images/girl-sleeves-straps.png'

const configurations = {
    WOMEN: {
        DRESSES: {
            fields: ['length', 'sleeves', 'neckline'],
            images: {
                length: { SHORT: woman_dress_short, LONG: woman_dress_long },
                sleeves: { STRAPS: woman_sleeves_straps, SHORT: woman_sleeves_short },
                neckline: { V: woman_neckline_v, STRAIGHT: woman_neckline_straight, SQUARE: woman_neckline_square }
            }
        },
        SKIRTS: {
            fields: ['length', 'waist'],
            images: {
                length: { SHORT: woman_skirt_short, LONG: woman_skirt_long },
                waist: { HIGH: woman_waist_high, LOW: woman_waist_low }
            }
        },
        JEANS: {
            fields: ['waist', 'fit'],
            images: {
                waist: { HIGH: woman_waist_high, LOW: woman_waist_low },
                fit: { SLIM: woman_jeans_slim, STRAIGHT: woman_jeans_straight, WIDE: woman_jeans_wide }
            }
        }
    },
    MEN: {
        T_SHIRTS_AND_TOPS: {
            fields: ['length', 'sleeves', 'neckline'],
            images: {
                length: {LONG: man_shirt_long, SHORT: man_shirt_short},
                sleeves: { LONG: man_sleeves_long, SHORT: man_sleeves_short },
                neckline: { CREW: man_neckline_crew, POLO: man_neckline_polo }
            }
        },
        TROUSERS: {
            fields: ['waist', 'fit'],
            images: {
                waist: { HIGH: man_waist_high, LOW: man_waist_low },
                fit: { SLIM: man_trousers_slim, STANDARD: man_trousers_standard, WIDE: man_trousers_wide }
            }
        }
    },
    GIRLS: {
        T_SHIRTS_AND_TOPS: {
            fields: ['length','sleeves', 'neckline'],
            images: {
                length: {LONG: girl_shirt_long, SHORT: girl_shirt_short},
                sleeves: { LONG: girl_sleeves_long, SHORT: girl_sleeves_short, STRAPS: girl_sleeves_straps },
                neckline: { CREW: girl_neckline_crew, SQUARE: girl_neckline_square }
            }
        }
    }
};

const defaultClothing = {
    WOMEN: 'DRESSES',
    MEN: 'T_SHIRTS_AND_TOPS',
    GIRLS: 'T_SHIRTS_AND_TOPS'
};

const CustomizeFilter = forwardRef((props, ref) => {
    const [person, setPerson] = useState('WOMEN');
    const [clothing, setClothing] = useState(defaultClothing[person]);
    const [attributes, setAttributes] = useState({});
    const [step, setStep] = useState(1); // Step 1 for person and clothing, Step 2 for attributes

    useImperativeHandle(ref, () => ({
        reset() {
            setPerson('WOMEN');
            setClothing(defaultClothing[person]);
            setAttributes({});
            setStep(1);
        }
    }));

    const handleAttributeChange = (field, value) => {
        setAttributes(prev => ({ ...prev, [field]: value }));
    };

    const handlePersonChange = (e) => {
        const newPerson = e.target.value;
        setPerson(newPerson);
        setClothing(defaultClothing[newPerson]);
    };

    const handlePersonClothingSubmit = (e) => {
        e.preventDefault();
        console.log(person, clothing)
        setStep(2);
    };

    const handleBackToFirstStepSubmit = (e) => {
        e.preventDefault();
        attributes.length = '';
        attributes.sleeves = '';
        attributes.neckline = '';
        attributes.waist = '';
        attributes.fit = '';
        setStep(1);
    }

    const handleAttributesSubmit = (e) => {
        e.preventDefault();

        let length = attributes.length === undefined ? '' : attributes.length;
        let sleeves = attributes.sleeves === undefined ? '' : attributes.sleeves;
        let neckline = attributes.neckline === undefined ? '' : attributes.neckline;
        let waist = attributes.waist === undefined ? '' : attributes.waist;
        let fit = attributes.fit === undefined ? '' : attributes.fit;

        props.onFilterCustom(person, clothing, length, sleeves, neckline, waist, fit);
    };

    const getImageSrc = (field, value) => {
        return configurations[person][clothing].images[field][value];
    };

    const currentConfig = configurations[person][clothing];

    return (
        <div>
            {step === 1 ? (
                <form onSubmit={handlePersonClothingSubmit}>
                    <div>
                        <select className="form-control" name="person" onChange={handlePersonChange} value={person}>
                            <option value="WOMEN">Women</option>
                            <option value="MEN">Men</option>
                            <option value="GIRLS">Girls</option>
                        </select>
                    </div>
                    <div>
                        <select className="form-control" name="clothing" onChange={(e) => setClothing(e.target.value)} value={clothing}>
                            {Object.keys(configurations[person]).map(clothingType => (
                                <option key={clothingType} value={clothingType}>{clothingType}</option>
                            ))}
                        </select>
                    </div>
                    <button className="btn btn-dark" type="submit">Next</button>
                </form>
            ) : (
                <div>
                    <form onSubmit={handleBackToFirstStepSubmit}>
                        <button className="btn btn-dark mb-3" type="submit">Back</button>
                    </form>
                    <form onSubmit={handleAttributesSubmit}>
                        {currentConfig.fields.map(field => (
                            <div key={field}>
                                <select className="form-control" name={field} onChange={(e) => handleAttributeChange(field, e.target.value)} required>
                                    <option disabled value="">{field.charAt(0).toUpperCase() + field.slice(1)}</option>
                                    {Object.keys(currentConfig.images[field]).map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                        <div className="custom-display m-4">
                            <img className="custom-filter-img base" src={person === 'WOMEN' ? woman : person === 'MEN' ? man : girl} alt="base"/>
                            {Object.keys(attributes).map(attr => attributes[attr] && (
                                <img key={attr} className={`custom-filter-img decoration ${attr}`} src={getImageSrc(attr, attributes[attr])} alt={attr}/>
                            ))}
                        </div>
                        <button className="btn btn-dark" type="submit">Filter</button>
                    </form>
                </div>
            )}
        </div>
    );
});

export default CustomizeFilter;
