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

        {!editing && <div className="flex flex-col justify-between align-middle h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128">
      <div>
        <h4 className = "text-center">Name: {userProfile.fullName}</h4>
        <h4 className = "text-center">Username: {userProfile.username}</h4>
        <img src={userProfile.image} alt="userImage"/>
        <h4 className = "text-center">Location: {userProfile.location}</h4>
        {user ? <div className = "flex justify-center mt-4">
        {(user._id === userId) && <button onClick={editProfile} >Edit Profile</button>}

        </div>
          : <p>Loading</p>
        }
      </div>
      <h3 className ="text-center mb-5">Listed items:</h3>
      {userProfile.listedItems.length ? userProfile.listedItems.map((item) => {
        console.log("Profile item:", item)
          return (
      
            <ItemInProfile key={item._id} {...item} />
      
          );
        }) : <p>No listed items yet!</p>
        
        }

        </div>}


        { (editing && updatedUser) &&
      
      <section class="h-80 flex justify-center align-middle">

    <div class="md:w-4/12 lg:ml-6 lg:w-4/12 flex justify-center align-middle">
      <form
        onSubmit={handleSubmit}
        class="flex flex-col justify-center align-middle mt-60"
      >
        <div class="relative mb-6 flex justify-center" data-te-input-wrapper-init>
          <input
            type="text"
            name="fullName"
            value={updatedUser.fullName}
            class="peer flex min-h-[auto]  justify-center align-middle rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] 
            outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 
            motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 
            [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            onChange={handleTextChange}
          />
        </div>

        <div class="relative mb-6 flex justify-center" data-te-input-wrapper-init>
        <textarea
             type="text"
            name="username"
            value={updatedUser.username}
            class="peer min-h-[auto] rounded flex justify-center align-middle border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] 
            outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 
            motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 
            [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleFormControlInput33"
            onChange={handleTextChange}
          />
        </div>

        <div class="relative mb-6 flex justify-center" data-te-input-wrapper-init>
          <input
           type="text"
            name="location"
            value={updatedUser.location}
            class="peer block min-h-[auto] rounded justify-center align-middle border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] 
            outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 
            motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 
            [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleFormControlInput33"
            onChange={handleTextChange}
          />
        </div>

        <div class="relative mb-6 flex justify-center" data-te-input-wrapper-init>
          <input
            type="file" 
            name="image" 
            class="peer block min-h-[auto] w-3/4 rounded justify-center align-middle border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] 
            outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 
            motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 
            [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleFormControlInput33"
            onChange={handleFileChange} 
          />
        </div>


        <button
          type="submit"
          className=" w-72 ml-4 flex justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
          transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
          focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
          focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
          dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
          dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
          dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-init
          data-te-ripple-color="light"
          disabled={buttonDisabled}
        >
          Update info
        </button>

      </form>
    </div>
</section>
      
      }

      </div>}

    </div>
  )
}

export default Profile
