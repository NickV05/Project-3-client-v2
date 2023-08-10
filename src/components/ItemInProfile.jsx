import { Link } from "react-router-dom";

const ItemInProfile = ({ _id, name, image}) => {

  return (
    <div>
        <Link to={`/product-details/${_id}`}>
        <h3>{name}</h3>
      </Link>
      </div>
  )
}

export default ItemInProfile
