import React from 'react'
import { Form } from 'react-router-dom'
import { UserPlusIcon } from '@heroicons/react/24/solid'

import illustration from "../assets/illustration.jpg"
import graph from "../assets/graph.svg"

const SplashPage = () => {
  return (
    <div className='splash-container'>
      <div className='splash'>
        <div>
      <h1>Control your <span className='accent'>Finance</span></h1>
      </div>
      <div className='splash-form'>
    <Form method='post'> 
      <input type="text" name="userName" placeholder="Who might you be?" autoComplete='given-name' required />
      <input type="hidden" name="__action" value="newUser"/>
      <button type="submit" className="btn btn--primary">Get Started <UserPlusIcon width={20}/> </button>
    </Form>
    </div>
    
    </div>
    <img src={graph} width={500}></img>
    </div>
  )
}

export default SplashPage