// Cat will be given data to render out a cat to then display

import React from 'react'
import Image from 'next/image'
import CheckFavs from './CheckFavs'
import GetVotes from './GetVotes'
import ReloadCats from './ReloadCats'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'

const Cat = ({
  catData,
  isFavourite,
  setFavs,
  setStopCall,
  favData,
  setVotes,
  voteData,
  setCatdata,
}) => {
  const favouriteThatCat = async () => {
    const raw = JSON.stringify({
      image_id: `${catData.id}`,
      sub_id: `${localStorage.getItem('id')}`,
    })
    try {
      const res = await fetch('https://api.thecatapi.com/v1/favourites', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_CATS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: raw,
      })
      CheckFavs(setFavs)
      setStopCall(true)
    } catch (error) {
      console.log(error)
    }
  }

  const hateCat = async () => {
    try {
      const res = await fetch(
        `https://api.thecatapi.com/v1/favourites/${favData.id}`,
        {
          method: 'DELETE',
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_CATS_API_KEY,
          },
        }
      )
      CheckFavs(setFavs)
      setStopCall(true)
    } catch (error) {
      console.log(error)
    }
  }

  const upvote = async () => {
    const raw = JSON.stringify({
      image_id: catData.id,
      sub_id: localStorage.getItem('id'),
      value: 1,
    })

    console.log('Upvote Fired')
    try {
      const res = await fetch(`https://api.thecatapi.com/v1/votes`, {
        method: 'POST',
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_CATS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: raw,
      })
      GetVotes(setVotes)
    } catch (error) {
      console.log(error)
    }
  }

  const downVote = async () => {
    console.log('Downvoting the cat my lord')
    const res = await fetch(
      `https://api.thecatapi.com/v1/votes/${voteData.id}`,
      {
        method: 'DELETE',
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_CATS_API_KEY,
        },
      }
    )
    GetVotes(setVotes)
    console.log('GetVotes Fired')
  }

  const deleteCat = async () => {
    console.log("deleting cat")
    const res = await fetch(
      `https://api.thecatapi.com/v1/images/${catData.id}`,
      {
        method: 'DELETE',
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_CATS_API_KEY,
        },
      }
    )
    // Create a function to update all the cats for real
    console.log('Reload Cats fired')
    ReloadCats(setCatdata)
  }

  return (
    <div className="flex flex-col gap-1 ">
      <img
        src={catData.url}
        alt={catData.original_fileName}
        onClick={() => console.log(catData, favData, voteData)}
        onDoubleClick={() =>
          confirm('Are you sure you want to delete?')
            ? deleteCat()
            : alert('Saved')
        }
      />
      {/* Buttons */}
      <div className="flex items-center justify-between ">
        {!isFavourite ? (
          <button
            className="border-2 border-green-400 py-0.5 px-2"
            onClick={favouriteThatCat}
          >
            Love it
          </button>
        ) : (
          <button
            className="border-2 border-red-400 py-0.5 px-2"
            onClick={hateCat}
          >
            Hate it
          </button>
        )}
        <div>
          <button
            className="mr-2 rounded-full border-2 border-black py-0.5 px-2"
            onClick={upvote}
          >
            <FaChevronUp />
          </button>
          <button
            className="rounded-full border-2 border-black py-0.5 px-2"
            onClick={downVote}
          >
            <FaChevronDown />
          </button>
        </div>
        <div>
          <button>{voteData?.value ? voteData.value : 0}</button>
        </div>
      </div>
    </div>
  )
}

export default Cat
