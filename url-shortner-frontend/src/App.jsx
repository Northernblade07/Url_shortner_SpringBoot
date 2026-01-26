import React from 'react'
import { getApps } from './utils/helper'

const CurrentApp = getApps();
const App = () => {
  return (
   <CurrentApp/>
  )
}

export default App