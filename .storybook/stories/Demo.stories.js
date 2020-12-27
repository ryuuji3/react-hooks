import React from 'react';

import DateDemo from './components/DateDemo'
import TelephoneDemo from './components/TelephoneDemo'
import PostalCodeDemo from './components/PostalCodeDemo'

const story = {
    title: 'Demo',
}

export default story

export const _DateDemo = () => <DateDemo debug />
_DateDemo.storyName = 'DateDemo'

export const _TelephoneDemo = () => <TelephoneDemo debug />
_TelephoneDemo.storyName = 'TelephoneDemo'

export const _PostalCodeDemo = () => <PostalCodeDemo debug />
_PostalCodeDemo.storyName = 'PostalCodeDemo'