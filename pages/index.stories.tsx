import React, { ComponentProps } from 'react'

import { Story } from '@storybook/react'

import Home from './index'

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Home',
  component: Home,
}

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Home>> = (args) => <Home {...args} />

export const HomeStory = Template.bind({})
HomeStory.args = {
  /*👇 The args you need here will depend on your component */
}
