import useShipping from "../hooks/useShipping"
import provinceData from "../helpers/provinceData"
import ShippingModal from "./ShippingModal"
import { useState } from "react"

const Shipping = ({ product }) => {
  const [showShippingInfo, setShowShippingInfo] = useState(false)
  const { 
    triggerFetch: fetchCities,
    cities: citiesData
  } = useShipping.cities()
  const {
    triggerFetch: fetchCost,
    setCityId,
    costs,
    isLoading
  } = useShipping.costs()

  const provinceChanged = (evt) => {
    fetchCities(evt.target.value)
  }

  const cityChanged = (evt) => {
    setCityId(evt.target.value)
  }

  const handleGetCost = () => {
    fetchCost(product.id)
    setShowShippingInfo(true)
  }

  return (
    <>
      <p className="text-bold font-medium">Shipping Fee</p>
      <p className="text-xs font-thin text-slate-500">Please note that shipping fees may vary based on the destination, weight, and dimensions of the items in your cart. The provided estimates are subject to change based on the finalization of your order.</p>
      <div className="flex gap-2 mt-4">
        <select
          id="countries"
          className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
          defaultValue="default"
          onChange={provinceChanged}
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
          onChange={cityChanged}
        >
          <option value="default" disabled>Choose a City</option>
          {citiesData.map(p => {
            return <option key={p.city_id} value={p.city_id}>{p.city}</option>
          })}
        </select>
      </div>
      <p className="cursor-pointer font-medium text-sm text-blue-700 mt-0" onClick={handleGetCost}>Get Shipping Fee</p>

      { showShippingInfo && !isLoading && costs ? 
        <ShippingModal 
          costs={costs}
          setShowShippingInfo={setShowShippingInfo}
        /> : 
      null }
    </>
  )
}

export default Shipping