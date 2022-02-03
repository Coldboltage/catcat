import { env } from 'process'
import React, { useState } from 'react'
import Layout from './../components/Layout'
import Image from 'next/image'
import {useRouter} from "next/router"
import {FaChevronLeft} from "react-icons/fa"


const upload = () => {
  const [image, setImage] = useState(null)
  const router = useRouter()
  console.log(image)

  const handleUpload = async (e) => {
    e.preventDefault()
    try {
      var formdata = new FormData()
      formdata.append('file', image)
      formdata.append('sub_id', '')

      const res = await fetch('https://api.thecatapi.com/v1/images/upload', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_CATS_API_KEY,
        },
        body: formdata,
      })
      if (res.ok === true) {
        router.push("/")
      }
      const data = await res.json()
      console.log(res)
    } catch (error) {
      console.log("I think the image didn't upload?")
      console.log(error)
    }
  }

  return (
    <Layout>
      {/* Page Title */}
      <div>
        <h1 className="my-10 text-4xl font-bold text-center">
          Page Upload Maybe?
        </h1>
      </div>
      {/* Need someonewhere to upload something */}
      <div>
        <button onClick={() => router.push("/")} className="p-2 my-3 border-2"><span className="inline-block"><FaChevronLeft/></span> Maybe we see lits of cats?</button>
        <form className="pb-5" onSubmit={handleUpload}>
          <label className="block pb-5">
            Upload something cunto
          </label>
          <input
            className="block pb-5"
            type="file"
            name="file"
            id="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) => {
              setImage(e.target.files[0])
            }}
          />
          <input
            className="block p-2 mb-5 border-2 rounded-xl"
            type="submit"
            value="Submit"
          />
        </form>
        {image && (
          <>
            <p>Cat exists</p>
            {/* <Image src={image}></Image> */}
          </>
        )}
      </div>
    </Layout>
  )
}

export default upload
