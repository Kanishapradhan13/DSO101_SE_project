// File: frontend/src/App.tsx

import React, { useState, useEffect } from 'react'
import './style.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom'
import * as ROUTES from './routes'
import { useTranslation } from 'react-i18next'
import Environment from 'components/Environment'
import { HEARTBEAT } from './api'
import BMICalculator from './components/BMICalculator';

const BackendConnectionTest = () => {
  const [response, setResponse] = useState(undefined as any)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    setIsFetching(true)
    fetch(HEARTBEAT).then(
      (response) => response.json()
    )
      .then(
        (response) => setResponse(response),
        (response) => setResponse(response),
      ).finally(() =>
        setIsFetching(false)
      )
  }, [])

  return (
    <>
      <h3>
        Backend connection test:
      </h3>
      <p>
        {isFetching ?
          <p>
            Trying to reach backend...
          </p>
          :
          <>
            <p>
              Backend responded with following message:
            </p>
            <b>
              <pre>
                <code>
                  {JSON.stringify(response, null, 2)}
                </code>
              </pre>
            </b>
          </>
        }
      </p>
    </>
  )
}

// Home component for the root route
const Home = () => {
  return (
    <>
      <Environment />
      <hr className="dotted" />
      <BackendConnectionTest />
      <hr className="dotted" />
      <div style={{ marginTop: '20px' }}>
        <h3>Navigation:</h3>
        <nav>
          <Link to="/bmi" style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            margin: '10px 0'
          }}>
            Go to BMI Calculator
          </Link>
        </nav>
      </div>
    </>
  )
}

const App: React.FC = () => {
  // Depends of your implementation of authentication
  const isLoggedIn = false

  return (
    <Router>
      {!isLoggedIn &&
        <Switch>
          {/* BMI Calculator Route */}
          <Route path="/bmi" exact>
            <div>
              <nav style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
                <Link to="/" style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px'
                }}>
                  ← Back to Home
                </Link>
              </nav>
              <BMICalculator />
            </div>
          </Route>
          {/* Root Route */}
          <Route path={ROUTES.ROOT} exact>
            <Home />
          </Route>
          {/* Redirect any other routes to root */}
          <Redirect from={'*'} to={ROUTES.ROOT} />
        </Switch>
      }
      {isLoggedIn &&
        <div>
          {/* <AuthenticatedSwitch /> */}
          {/* You can add BMI Calculator to authenticated routes too if needed */}
        </div>
      }
    </Router>
  )
}

export default App