import React from 'react';
import TelephoneDemo from './TelephoneDemo'
import DateDemo from './DateDemo'
import './Demo.css'

function Demo() {
    return (
        <div className='demo'>
            <div className='demo-input'>
                <TelephoneDemo />
            </div>
            <div className='demo-input'>
                <DateDemo />
            </div>
        </div>
    )
}

export default Demo;
