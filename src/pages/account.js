import React, { useEffect } from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import { useAuth0 } from "../utils/auth"
import { ProtectedRoute } from "../components/protected-route"
import { Navigation } from "../components/nav-bar"

const Account = () => {
  const { loading, user, isAuthenticated } = useAuth0()
  if (loading || !user) {
    return <p>Loading...</p>
  }

  return (
    <Layout>
      <ProtectedRoute>
        <Navigation />
        <h1 className="title">Main Account Page</h1>
        <p className="subtitle">
          Check out the user data supplied by Auth0, below:
        </p>
        <pre>{isAuthenticated && JSON.stringify(user, null, 2)}</pre>
      </ProtectedRoute>
    </Layout>
  )
}

export default Account
