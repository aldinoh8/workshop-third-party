import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"

const fetchCities = (id) => axios.get("http://localhost:8000/shipping/cities?province_id=" + id)
const fetchCosts = ({cityId, productId}) => {
  console.log("fetch cost ", {cityId, productId})
  return axios.get(`http://localhost:8000/shipping/costs?city_id=${cityId}&product_id=${productId}`)
}

const useShippingCities = () => {
  const [cities, setCities] = useState([])
  const { mutate, isLoading, isError, error } = useMutation(fetchCities, {
    onSuccess: ({ data }) => {
      setCities(data)
      console.log(data)
    },
  })

  return {
    cities,
    triggerFetch: mutate,
    isLoading,
    isError,
    error
  }
}

const useShippingCosts = () => {
  const [cityId, setCityId] = useState(0)
  const [costs, setCosts] = useState(null)

  const { mutate, isLoading, isError, error } = useMutation(fetchCosts, {
    onSuccess: ({ data }) => {
      setCosts(data)
      console.log(data)
    }
  })

  const triggerFetch = (productId) => {
    mutate({cityId, productId})
  }

  return {
    setCityId,
    costs,
    triggerFetch,
    isLoading,
    isError,
    error
  }
}

export default {
  cities: useShippingCities,
  costs: useShippingCosts
}