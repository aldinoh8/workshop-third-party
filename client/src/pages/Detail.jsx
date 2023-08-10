import { useState } from "react"
import Icon from "../components/Icon"
import { useQuery } from "@tanstack/react-query"
import { NavLink, useParams } from "react-router-dom"
import { formatter as numberWithCommas } from "../helpers/currency"
import axios from 'axios'
import provinceData from "../helpers/provinceData"

const Detail = () => {
  const { id } = useParams();
  const [mainImg, setMainImg] = useState("")
  const { isLoading, error, data: product } = useQuery({
    queryKey: ['product', id],
    queryFn: () => axios.get("http://localhost:8000/products/" + id),
    onSuccess: ({ data }) => {
      setMainImg(data.images[0])
    }
  })

  if(isLoading) return 'Loading ...'
  if(error) return 'An error has occured: ' + error.message

  return (
    <>
      <div className="w-1/2 mx-auto mt-12 grid grid-cols-2 gap-6">
        <div className="w-full flex flex-col gap-4">
          <img src={mainImg} className="object-cover h-auto max-w-full border" />
          <div className="grid grid-cols-4 gap-2">
            {product.data.images.map((img,idx) => {
              return (
                <img 
                  src={img}
                  key={idx} 
                  className="object-cover h-auto max-w-full border cursor-pointer"
                  onClick={() => setMainImg(img)}
                />
              )
            })}
          </div>
        </div>
        
        <div>
          <p className="text-sm">- Back to <NavLink to="/" className="text-blue-700 cursor-pointer">Main Menu</NavLink></p>
          
          <div className="mt-7">
            <p className="text-2xl font-bold">{product.data.name}</p>
            <p className="text-xl font-bold text-blue-800 mt-5">Rp. {numberWithCommas(product.data.price)}</p>
            <div className="text-slate-700">
              <p className="font-bold text-sm mt-5">Availibility: <span className="font-normal">{product.data.stock} in Stock</span></p>
              <p className="font-bold text-sm">Tags: <span className="font-normal">Sport</span></p>
              <p className="text-sm font-normal mt-5">
                {product.data.description}
              </p>
            </div>

            <div className="mt-10 w-full flex flex-col justify-between gap-1 border-t pt-4">
              <p className="text-bold font-medium">Shipping Fee</p>
              <p className="text-xs font-thin text-slate-500">Please note that shipping fees may vary based on the destination, weight, and dimensions of the items in your cart. The provided estimates are subject to change based on the finalization of your order.</p>
              <div className="flex gap-2 mt-4">
                <select 
                  id="countries" 
                  className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  defaultValue="default"
                >
                  <option value="default" disabled>Choose a Province</option>
                  {provinceData.map(p => {
                    return <option key={p.province_id} value={p.province_id}>{p.province}</option>
                  })}
                </select>
                <select 
                  id="countries" 
                  className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  defaultValue="default"
                >
                  <option value="default" disabled>Choose a City</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </div>
              <p className="cursor-pointer font-medium text-sm text-blue-700 mt-0">Get Shipping Fee</p>
            </div>

            <div className="mt-10 w-full flex">
              <button type="button" className="w-full text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 font-medium  text-sm px-5 py-3.5 text-center mr-2 mb-2">Add to Cart</button>
              <button type="button" className="w-full text-slate-900 bg-white hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-300 font-medium  text-sm px-5 py-3.5 text-center mr-2 mb-2 border">Add to Wishlist</button>
            </div>
            
            <div className="mt-10 w-full flex justify-between gap-4 border-y py-4">
              <p className="text-bold font-medium">Share product</p>
              <div className="flex gap-8">
                <Icon.Facebook/>
                <Icon.Twitter />
                <Icon.Instagram />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Detail
