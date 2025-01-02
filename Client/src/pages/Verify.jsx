
import axios from 'axios'
import backendUrl from "../App" 
import { useContext, useState ,useEffect } from 'react'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'

const Verify = () => {
  const {navigate, token,setCartItems} = useContext(ShopContext)
  const [searchParams, setSearchParams] = useState()
  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  const verifyPayment = async () => {
    try {
      if(!token){
        return null;
      }
      const response = await axios.post(backendUrl + '/api/order/verifyStripe',{success,orderId},{headers:{token}})
      if(response.data.success){
        setCartItems({})
        navigate('/orders')
      }else{
        navigate('/cart')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [token])
  
  return (
    <div>Verify</div>
  )
}

export default Verify