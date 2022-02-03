import Head from 'next/head'
import Layout from "../components/Layout"
import {useEffect, useState} from "react"
import CatsDisplay from "../components/CatsDisplay"
import {Auth} from "../components/Auth"
import {useRouter} from "next/router"



export default function Home(props) {
  const router = useRouter()
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="my-10">
        <h1 className="my-10 text-4xl font-bold text-center">Cat cat Nyai</h1>
        <CatsDisplay data={props.res}/>
        <div className='mt-10 '>
          <button className='p-4 text-center border-2' onClick={() => router.push("/upload")}>Upload more cats</button>
          
        </div>
        
      </main>

    </Layout>
  )
}

export async function getServerSideProps() {

  const data = await fetch("https://api.thecatapi.com/v1/images?limit=20", {
    method: "GET",
    headers: {
      'x-api-key': process.env.CATS_API_KEY,
    }
  })
  const res = await data.json()
  // console.log(res)
  return {
    props: {res}
  }
}


