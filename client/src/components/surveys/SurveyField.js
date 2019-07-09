// survey field contains logic to render single label & input field
import React from 'react';

export default ({ input, label }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} />
        </div>
    );
;}