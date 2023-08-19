import { Link } from "react-router-dom";

const ItemInProfile = ({ _id, name, image}) => {

  return (
    <div className = "flex flex-col justify-center align-middle ">
        <Link to={`/product-details/${_id}`}>
        <img src={image} className =" w-28 h-20 ml-32 shadow-lg "/>
        <h3 className ="text-center leading-relaxed font-extrabold text-1xl text-palette-primary">{name}</h3>
      </Link>
      </div>
  )
}

export default ItemInProfile
