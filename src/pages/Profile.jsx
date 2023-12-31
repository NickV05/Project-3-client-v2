import { AuthContext } from "../context/auth.context";
import { useContext, useState, useEffect } from "react";
import { get, post} from "../services/authService";
import ItemInProfile from "../components/ItemInProfile";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fileChange } from '../services/fileChange'

const Profile = () => {
  const [userProfile, setUser] = useState(null);
  const { user, authenticateUser, storeToken } = useContext(AuthContext);
  const { userId } = useParams();
  const [editing, setEdit] = useState(false);
  const navigate = useNavigate();
  const [updatedUser, setUpdatedUser] = useState(user);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [following, setFollowing] = useState(false)

  const getUserInfo = () => {
    get(`/users/user-detail/${userId}`)
      .then((userInfo) => {
        setUser(userInfo.data);
        if(user){
          const checking = userInfo.data.followers.some((follower) => 
          follower == user._id)
          setFollowing(checking)
        }
      })
      .catch((error) => console.log(error));
  };

  const handleTextChange = (e) => {
    setUpdatedUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setButtonDisabled(true);

    fileChange(e)
      .then((response) => {
        setUpdatedUser((prev) => ({
          ...prev,
          [e.target.name]: response.data.image,
        }));
        setButtonDisabled(false);
      })
      .catch((err) => {
        setButtonDisabled(false);
        console.log("Error while uploading the file: ", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post(`/users/user-update/${user._id}`, updatedUser)
      .then((results) => {
        storeToken(results.data.authToken);
        setUser(results.data.user);
        setEdit(false);
        navigate(`/profile/${results.data.user._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editProfile = () => {
    setEdit(true);
  };

  const unFollow =() => {
    post(`/users/unfollow/${userProfile._id}`)
    .then((results) => {
      setFollowing(false)
      setUser(results.data)
    })
  }


  const toFollow =() => {
    post(`/users/follow/${userProfile._id}`)
    .then((results) => {
      setFollowing(true)
      setUser(results.data)
    })
  }

  useEffect(() => {
    authenticateUser();
    getUserInfo();
    if (user) {
      setUpdatedUser(user);
    }
  }, [userId]);

  return (
    <div>
      {userProfile && (
        <div>
          {!editing && (
            <div className=" p-11">
              <div className="p-6 bg-white shadow mt-24">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                    <div>
                      <p className="font-bold text-gray-700 text-xl">
                        {userProfile.followers.length}
                      </p>
                      <p className="text-gray-400">Followers</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-700 text-xl">
                        {userProfile.listedItems.length}
                      </p>
                      <p className="text-gray-400">Products</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-700 text-xl">
                        {userProfile.follow.length}
                      </p>
                      <p className="text-gray-400 ">Follows</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div
                      className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center
       text-indigo-500"
                    >
                      <img
                        src={userProfile.image}
                        className="h-48 w-48 rounded-full"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      />
                    </div>
                  </div>

                  {user && user._id !== userId && (
                    <div className="space-x-8 flex mt-32 md:mt-0 justify-center">
                      {!following && (
                        <button
                          onClick={toFollow}
                          className="text-white py-2 md:px-4 px-2 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        >
                          + Follow
                        </button>
                      )}

                      {following && (
                        <button
                          onClick={unFollow}
                          className="text-white md:px-4 px-2 uppercase rounded bg-red-600 hover:bg-red-700 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        >
                          Unfollow
                        </button>
                      )}
                      <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                        <Link to={`/messenger/${userId}`}>Message</Link>
                      </button>
                    </div>
                  )}

                  {user && user._id === userId && (
                    <div className="space-x-8 flex mt-32 md:mt-0 justify-center">
                      <button
                        onClick={editProfile}
                        className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg 
                        font-medium transition transform hover:-translate-y-0.5"
                      >
                        Edit info
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-20 text-center border-b pb-12">
                  <h1 className="text-4xl font-medium text-gray-700">
                    {userProfile.fullName}
                  </h1>
                  <p className="font-light text-gray-600 mt-3">
                    {userProfile.location}
                  </p>
                </div>

                {userProfile.listedItems.length ? (
                  <div className="py-6 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">
                    {userProfile.listedItems.map((item) => {
                      return <ItemInProfile key={item._id} {...item} />;
                    })}
                  </div>
                ) : (
                  <p className="text-center mt-5">No listed items yet!</p>
                )}
              </div>
            </div>
          )}

          {editing && updatedUser && (
            <div
              id="defaultModal"
              tabIndex="-1"
              className="flex fixed md:mt-72 mt-16 top-0 right-0 left-0 z-50 justify-center items-center w-screenmd:inset-0 h-52 md:h-52 "
            >
              <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                  <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Update profile info
                    </h3>

                    <button
                      onClick={handleSubmit}
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-toggle="defaultModal"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                      <div>
                        <img src={updatedUser.image} className=" h-52 ml-14 md:ml-0 rounded-full" />
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={updatedUser.fullName}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          id="exampleFormControlInput3"
                          onChange={handleTextChange}
                        />
                      </div>
                      <div className="relative mt-20 flex justify-center">
                        <input
                          type="file"
                          name="image"
                          className="peer block w-3/4 rounded justify-center align-middle border-0 bg-transparent 
            px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear 
            focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none 
            dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          id="exampleFormControlInput33"
                          onChange={handleFileChange}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={updatedUser.username}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          id="exampleFormControlInput333"
                          onChange={handleTextChange}
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={updatedUser.location}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          id="exampleFormControlInput33"
                          onChange={handleTextChange}
                        />
                      </div>
                    </div>
                    <button
                      disabled={buttonDisabled}
                      type="submit"
                      className="text-white bg-blue-500 inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      <svg
                        className="mr-1 -ml-1 w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Update profile
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile
