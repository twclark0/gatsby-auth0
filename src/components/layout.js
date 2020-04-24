import React from "react"

const Layout = ({ title, children }) => {
  return (
    <div>
      <header>
        <h1>{title}</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
