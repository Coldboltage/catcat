import React, { useEffect } from 'react'
import Auth from "../components/Auth"

Auth()


const CheckFavs = async (setFavs) => {
  const res = await fetch('https://api.thecatapi.com/v1/favourites', {
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_CATS_API_KEY,
    },
  })
  const favourites = await res.json()


  if (favourites) {
    console.log("List of favourites are ready")
    setFavs(favourites) 
  } 
}

export default CheckFavs
