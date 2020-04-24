import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import { useAuth0 } from "../utils/auth"
import { ProtectedRoute } from "../components/protected-route"
import { Navigation } from "../components/nav-bar"

const MyAccount = () => <h2>Main Account Page</h2>

const Profile = ({ children }) => {
  const { loading, user } = useAuth0()
  return loading || !user ? <p>Loading...</p> : <>{children}</>
}

const Account = () => {
  const { logout, isAuthenticated, user } = useAuth0()
  return (
    <Layout>
      <ProtectedRoute>
        <h1>Account</h1>
        <Navigation />
        <Profile>
          <button type="button" onClick={() => logout()}>
            Logout
          </button>
          <Router>
            <MyAccount path="/account/" />
          </Router>
          <p>Check out the user data supplied by Auth0, below:</p>
          <pre>{isAuthenticated && JSON.stringify(user, null, 2)}</pre>
        </Profile>
      </ProtectedRoute>
    </Layout>
  )
}

export default Account
