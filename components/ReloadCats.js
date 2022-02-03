import React from 'react';

const ReloadCats = async (setCatdata) => {
  const res = await fetch("https://api.thecatapi.com/v1/images?limit=20", {
    method: "GET",
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_CATS_API_KEY,
    }
  })
  const data = await res.json()

  if (data) {
    console.log(data)
    setCatdata(data)
  }
};

export default ReloadCats;
