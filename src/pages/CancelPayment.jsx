import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
const CancelPayment = () => {
    const navigate = useNavigate();
    useEffect(() => {
    navigate("/cart")
    },[])
  return (
    <img
              src="https://res.cloudinary.com/dyto7dlgt/image/upload/v1691760277/project3/spinner_jtv0k4.gif"
              class="w-full flex justify-center align-middle"
              alt="Spinner"
            />
  )
}

export default CancelPayment
