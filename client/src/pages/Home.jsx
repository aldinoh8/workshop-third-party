import { useQuery } from "@tanstack/react-query"
import axios from 'axios'
import Card from "../components/Card"

const Home = () => {
  const { isLoading, error, data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get("http://localhost:8000/products")
  })

  if(isLoading) return 'Loading ...'
  if(error) return 'An error has occured: ' + error.message

  return (
    <>
      {/* {JSON.stringify(products.data, "", 2)} */}
      <div className="w-1/2 mx-auto mt-12">
        <div className="flex gap-4 justify-center flex-row flex-wrap">
          {products.data.map(p => {
            return <Card product={p} key={p.id} />
          })}
        </div>
      </div>
    </>
  )
}

export default Home