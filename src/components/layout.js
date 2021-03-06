import React from "react"
import ContainerStyles from "../styles/container.module.css"
const Layout = ({ title, children }) => {
  return (
    <div className={ContainerStyles.container}>
      <main>{children}</main>
    </div>
  )
}

export default Layout
