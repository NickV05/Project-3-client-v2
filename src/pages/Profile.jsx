import { AuthContext } from "../context/auth.context";
import { useContext, useState, useEffect } from "react";
import { get, post} from "../services/authService";
import ItemInProfile from "../components/ItemInProfile";
import { useParams, useNavigate } from "react-router-dom";
import { fileChange } from '../services/fileChange'

const Profile = () => {
    const [userProfile, setUser] = useState(null);
    const { user, storeToken } = useContext(AuthContext);
    const { userId } = useParams();
    const [editing, setEdit] = useState(false);
    const navigate = useNavigate();
    const [updatedUser, setUpdatedUser] = useState(user)
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const getUserInfo = () => {
        get(`/users/user-detail/${userId}`)
          .then((userInfo) => {
            console.log("UserProfile:", userInfo.data)
            setUser(userInfo.data)
            
        })
          .catch((error) => console.log(error));
      };

    const handleTextChange = (e) => {
        setUpdatedUser((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleFileChange = (e) => {

        setButtonDisabled(true)

        fileChange(e)
          .then((response) => {
            console.log(response.data);
            setUpdatedUser((prev) => ({...prev, [e.target.name]: response.data.image}));
            setButtonDisabled(false);
          })
          .catch((err) => {
            setButtonDisabled(false);
            console.log("Error while uploading the file: ", err);
          });

    }


    const handleSubmit = (e) => {

        e.preventDefault()

        post(`/users/user-update/${user._id}`, updatedUser)
            .then((results) => {
                console.log("Results", results.data)
                storeToken(results.data.authToken)
                setUser(results.data.user)
                setEdit(false);
                navigate(`/profile/${results.data.user._id}`)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const editProfile = () => {
        setEdit(true);
    }

    useEffect(() => {
        getUserInfo();
        if(user){
          setUpdatedUser(user)
        }
    },[user])
   

  return (
    <div>

      {userProfile && 
      <div>

        {!editing && <div>
      <div>
        <h4>Name: {userProfile.fullName}</h4>
        <h4>Username: {userProfile.username}</h4>
        <img src={userProfile.image} alt="userImage"/>
        <h4>Location: {userProfile.location}</h4>
        {user ? <div>
        {(user._id === userId) && <button onClick={editProfile}>Edit Profile</button>}

        </div>
          : <p>Loading</p>
        }
      </div>

      {userProfile.listedItems.length ? userProfile.listedItems.map((item) => {
        console.log("Profile item:", item)
          return (
            <ItemInProfile key={item._id} {...item} />
          );
        }) : <p>No listed items yet!</p>
        
        }

        </div>}


        { (editing && updatedUser) &&<form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="fullName"
          value={updatedUser.fullName}
          onChange={handleTextChange}
        />
        
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={updatedUser.username}
          onChange={handleTextChange}
        />

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={updatedUser.location}
          onChange={handleTextChange}
        />

        <label>Avatar</label>
        <input 
          type="file" 
          name="image" 
          onChange={handleFileChange} 

          />

      <button type='submit' disabled={buttonDisabled}>Update Profile</button>

      </form>}

      </div>}

    </div>
  )
}

export default Profile
