import React from 'react';

import DateDemo from './components/DateDemo'
import TelephoneDemo from './components/TelephoneDemo'

const story = {
    title: 'Demo',
}

export default story

export const _DateDemo = () => <DateDemo />
_DateDemo.storyName = 'DateDemo'

export const _TelephoneDemo = () => <TelephoneDemo />
_TelephoneDemo.storyName = 'TelephoneDemo'
