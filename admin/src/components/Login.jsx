import React from 'react'

const Login = () => {
  return (
    <div>
      <h1>
        Admin Panel
      </h1>
      <form>
        <div>
            <p>
                Email Address
            </p>
            <input type="email" placeholder='your@email.com' required/>
        </div>
      </form>
    </div>
  )
}

export default Login