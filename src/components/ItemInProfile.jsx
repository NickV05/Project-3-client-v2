import { Link } from "react-router-dom";

const ItemInProfile = ({ _id, name}) => {

  return (
    <div className = "flex flex-col justify-center align-middle">
        <Link to={`/product-details/${_id}`}>
        <h3 className ="text-center leading-relaxed font-extrabold text-1xl text-palette-primary">{name}</h3>
      </Link>
      </div>
  )
}

export default ItemInProfile
