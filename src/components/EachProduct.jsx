import { Link } from "react-router-dom";

const EachProduct = ({ cost, name, _id, owner, image}) => {


    return (
      <div className="h-90 w-72 rounded shadow-lg mx-auto border border-palette-lighter">
          <div className="h-62 border-b-2 border-palette-lighter relative">
          <img src={image} alt="productImage" className="transform duration-500 ease-in-out hover:scale-110 h-52 w-50 object-cover" />
          </div>

        <div className="h-48 relative">

        <Link to={`/product-details/${_id}`} className="font-primary text-palette-primary text-2xl pt-4 px-4 font-semibold text-center ">
        <h3>{name}</h3>
        </Link>


          <Link to={`/profile/${owner._id}`}  className="font-primary text-palette-primary text-1xl pt-4 px-4 font-semibold text-center">
          <h3>By:{owner.fullName}</h3>
          </Link>

          <div className="font-primary text-palette-primary text-1xl pt-4 px-4 font-semibold text-center">
          <h3>Price: {cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} $</h3>
          </div>
        </div>
      </div>

    )
  }
  
  export default EachProduct