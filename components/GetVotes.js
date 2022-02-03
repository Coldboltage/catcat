import React, { useEffect } from 'react'
import Auth from "../components/Auth"

Auth()


const GetVotes = async (setVotes) => {
  const res = await fetch('https://api.thecatapi.com/v1/votes', {
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_CATS_API_KEY,
    },
  })
  const votes = await res.json()


  if (votes) {
    console.log("list of votes are ready")
    setVotes(votes) 
  } 
}

export default GetVotes