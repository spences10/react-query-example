import React, { useState } from "react"
import { useQuery } from "react-query"
import { ReactQueryDevtools } from "react-query-devtools"

export default function App() {
  return (
    <>
      <Tickers />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

const fetchTickers = async start => {
  const response = await fetch(
    `https://api.coinlore.net/api/tickers/?start=${start}`
  )
  const data = await response.json()
  return data
}

export const Tickers = () => {
  const [ticker, setTicker] = useState("start=100&limit=100")
  const { status, data } = useQuery([ticker], fetchTickers, {
    refetchAllOnWindowFocus: false,
  })

  if (status === "loading") return <div>loading...</div>
  if (status === "error") return <div>there was an error... sorry</div>

  return (
    <div>
      <button onClick={() => setTicker("")}>0-100</button>
      <button onClick={() => setTicker("200&limit=100")}>100-200</button>
      <button onClick={() => setTicker("300&limit=100")}>200-300</button>
      <button onClick={() => setTicker("400&limit=100")}>300-400</button>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
