import { Link } from "react-router-dom";

const ItemInProfile = ({ _id, name, image}) => {

  return (
    <div >
        <Link to={`/product-details/${_id}`} className="flex flex-col align-middle justify-center">
        <img src={image} className ="shadow-lg h-3/4"/>
        <h3 className ="text-center leading-relaxed font-extrabold text-1xl text-palette-primary">{name}</h3>
      </Link>
      </div>
  )
}

export default ItemInProfile
