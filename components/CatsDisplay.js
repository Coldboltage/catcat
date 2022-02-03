// Cat Display will display all cats that we have available from API key

import React, { useEffect, useState } from 'react'
import Cat from './Cat'
import CheckFavs from "../components/CheckFavs"
import GetVotes from "../components/GetVotes"


const CatsDisplay = ({ data }) => {
  const [catData, setCatdata] = useState(data)
  const [favs, setFavs] = useState([])
  const [votes, setVotes] = useState([])
  const [stopCall, setStopCall] = useState(false)

  useEffect(() => {
    async function fetchFavs()  {
      const response = await CheckFavs(setFavs);
      return response
    }
    fetchFavs()
  },[stopCall])

  useEffect(() => {
    async function fetchVotes()  {
      const response = await GetVotes(setVotes);
      return response
    }
    fetchVotes(setVotes)
  },[stopCall])


  return (
    <div className="grid justify-center grid-cols-4 gap-4 text-center">
      {catData ? catData.map((item) => {
        // Checking favs
        const isFavourite = favs.some(favItem => favItem.image.id === item.id)
        const favData = favs.find(favItem => favItem.image.id === item.id)
        // Checking votes
        const voteData = votes.find(voteItem => voteItem.image_id === item.id)
        return (
        <Cat key={item.id} catData={item} isFavourite={isFavourite} setFavs={setFavs} setStopCall={setStopCall} favData={favData} setVotes={setVotes} voteData={voteData} setCatdata={setCatdata}/>
      )}): <h3>You might want to start adding some cats?</h3>}
      
    </div>
  )
}
export default CatsDisplay
