import { NavLink } from "react-router-dom"
import { formatter as numberWithCommas } from "../helpers/currency"

const Card = ({ product }) => {

  const trimName = () =>{
    if (product.name.length > 42) {
      return product.name.slice(0, 42) + " ..."
    }

    return product.name
  }

  return (
    <NavLink 
      to={`/products/${product.id}`}
      className="w-full max-w-xs bg-white cursor-pointer hover:border hover:scale-105">
      <img className="p-4" src={product.thumbnail} alt="product image" />
      <div className="px-5 pb-5">
          <h5 className="text-lg font-semibold tracking-tight text-gray-900">{trimName()}</h5>
        <div className="flex items-center justify-between">
        <span className="text-md font-bold text-red-700">Rp. {numberWithCommas(product.price)}</span>
        </div>
      </div>
    </NavLink>
  )
}

export default Card