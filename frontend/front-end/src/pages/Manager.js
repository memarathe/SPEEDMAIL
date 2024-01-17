import React from 'react'
import '../styles/Manager.css'
import AssignDriverButton from '../components/AssignDriverButton'
import AddEmployeeForm from '../components/AddEmployeeForm'
import QueryCustomerForm from '../components/QueryCustomerForm'

const Manager = () => {
  return (
    <div className='App'>
        {/* <header className="App-header">
        <h1>Welcome, Manager!</h1>
      </header> */}
      <div className="form-container">
      <main>
        <div className="functionality-section">
          <AssignDriverButton />
        </div>
        <div className="functionality-section">
          <AddEmployeeForm />
        </div>
        <div className="functionality-section">
          <QueryCustomerForm />
        </div>
      </main>
      </div>
      
    </div>
  )
}

export default Manager
