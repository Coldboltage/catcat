import React, {useEffect} from 'react'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div>
      <div className="container px-10 mx-auto">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
