import React from 'react'
import { render } from 'react-dom'

import { Playground } from '../../src'

const Demo = ({ ...props }) => (
  <Playground />
)

export default Demo

render(<Demo/>, document.querySelector('#demo'))
