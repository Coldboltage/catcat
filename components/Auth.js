import { v4 as uuidv4 } from 'uuid'
import React, { useEffect, useState } from 'react'

// console.log(uuidv4())

const Auth = () => {
  // Create Storage which checks for ID
  if (localStorage.getItem('id')) {
    // If it does, solid
    console.log(
      `LocalStorage has a key called Id. The Id is currently ${localStorage.getItem(
        'id'
      )}`
    )
  } else {
    // If Storage doesn't have key, create key
    localStorage.setItem('id', JSON.stringify(uuidv4()))
    console.log('id has been created')
  }
  return null
}

export default Auth
