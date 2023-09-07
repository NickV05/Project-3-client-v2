import { AuthContext } from "../context/auth.context";
import { useContext, useState, useEffect } from "react";
import { get, post } from "../services/authService";
import { useParams, useNavigate, Link } from "react-router-dom";
import Message from "../components/Message";

const Messenger = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [adress, setAdress] = useState(userId);
  const { user, setUser } = useContext(AuthContext);
  const [convo, setConvo] = useState();
  const [message, setMessage] = useState("");
  const [anotherUser, setAnother] = useState(null);

  const getConvo = () => {

      get(`/users/get-convo/${adress}`).then((results) => {
        console.log("Conversation ===>", results);
        setConvo(results.data.convo);
        setUser(results.data.myUser);
      });
  };

  const getUserInfo = () => {
    
      get(`/users/user-detail/${adress}`).then((results) => {
        console.log("Conversation with: ===>", results.data);
        setAnother(results.data);
      });
    
  };

  const goToConvo = (id) => {
    setAdress(id);
    navigate(`/messenger/${id}`);
    get(`/users/get-convo/${id}`).then((results) => {
      setConvo(results.data.convo);
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    post(`/users/send-message/${adress}`, { message: message }).then(
      (results) => {
        console.log("Updated conversation/Created conversation ===>", results);
        setConvo(results.data.convo);
        setUser(results.data.user);
        setMessage("");
      }
    );
  };

  const sendMessage = (e) => {
    setMessage(e.target.value);
  };

  useEffect( () => {
      getUserInfo();
      getConvo();
    },
    [userId],
    [convo]
  );

  return (
    <div class="md:flex antialiased md:pt-9 text-gray-800">
      {user && (
        <div class="md:flex md:flex-row w-full overflow-x-hidden">
          <div class="flex flex-col md:py-8 md:pl-6 md:pr-2 md:w-64 w-screen bg-white md:flex-shrink-0">
            <div class="flex flex-row items-center justify-center h-12 w-full">
              <div class="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-14 mt-5 md:mt-0">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
              </div>
              <div class="ml-2 font-bold text-2xl mt-5 md:mt-0">MarketLink Messenger</div>
            </div>
            
            <div class="flex md:flex-col flex-row justify-center items-center bg-indigo-100 border border-gray-200 mt-4 
            md:w-full md:py-6 py-3 md:px-4 rounded-lg w-2/3 ml-16 md:ml-0  ">
              {convo && convo.userOne && convo.userTwo ? (
                <div class="h-16 w-16 rounded-full border overflow-hidden mr-5 md:mr-0">
                  {convo.userOne._id != user._id ? (
                    <img
                      src={convo.userOne.image}
                      alt="Avatar"
                      class="h-full w-full"
                    />
                  ) : (
                    <img
                      src={convo.userTwo.image}
                      alt="Avatar"
                      class="h-full w-full"
                    />
                  )}
                </div>
              ) : (
                <div class="h-20 w-20 rounded-full border overflow-hidden mr-5 md:mr-0">
                  {anotherUser && (
                    <img
                      src={anotherUser.image}
                      alt="Avatar"
                      class="h-full w-full"
                    />
                  )}
                </div>
              )}

              {convo && convo.userOne && convo.userTwo ? (
                <div class="text-sm font-semibold mt-2">
                  {convo.userOne._id != user._id ? (
                    <Link to={`/profile/${convo.userOne._id}`}>
                      <p>{convo.userOne.fullName}</p>
                    </Link>
                  ) : (
                    <Link to={`/profile/${convo.userTwo._id}`}>
                      <p>{convo.userTwo.fullName}</p>
                    </Link>
                  )}
                </div>
              ) : (
                <div class="md:text-sm font-semibold md:mt-2 text-lg">
                <Link to={`/profile/${adress}`}>
                  {anotherUser && anotherUser._id != user._id && <p>{anotherUser.fullName}</p>}
                  {anotherUser && anotherUser._id == user._id && <p>You</p>}
                  </Link>
                </div>
              )}
            </div>
            <div class="flex flex-col mt-3">
              <div class="flex flex-row items-center md:justify-between justify-center text-xs">
                <span class="font-bold ">Your Conversations</span>
                <span class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full ml-3 md:ml-0">
                  {user.conversations.length}
                </span>
              </div>
              <div class="flex flex-col space-y-1 mt-4 -mx-2 md:h-96 overflow-y-auto">
                {user && user.conversations ? (
                  user.conversations
                    .slice()
                    .sort((a, b) => a.createdAt - b.createdAt)
                    .map((conversation) => (
                      <>
                        {conversation.userOne && (
                          <>
                            {conversation.userOne._id != user._id ? (
                              <button
                                onClick={() =>
                                  goToConvo(conversation.userOne._id)
                                }
                                class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                              >
                                <div class="flex items-center justify-center h-8 w-8 bg-pink-200 rounded-full">
                                  {conversation.userOne.fullName[0]}
                                </div>
                                <div class="ml-2 text-sm font-semibold ">
                                  <p>{conversation.userOne.fullName}</p>
                                </div>
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  goToConvo(conversation.userTwo._id)
                                }
                                class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 "
                              >
                                <div class="flex items-center justify-center h-8 w-8 bg-pink-200 rounded-full">
                                  {conversation.userTwo.fullName[0]}
                                </div>
                                <div class="ml-2 text-sm font-semibold">
                                  {conversation.userTwo.fullName}
                                </div>
                              </button>
                            )}
                          </>
                        )}
                      </>
                    ))
                ) : (
                  <p className="text-center">No messages yet!</p>
                )}
              </div>

            </div>
          </div>

          <div class="flex flex-col flex-auto md:h-screen md:p-6 p-2">
            <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <div class="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  {convo && convo.message ? (
                    <div className="grid grid-cols-12 gap-y-2">
                      {convo.message
                        .slice()
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .map((message) => (
                          <Message key={message._id} {...message} />
                        ))}
                    </div>
                  ) : (
                    <>
                    {anotherUser && anotherUser._id != user._id ? <img
                      src="https://res.cloudinary.com/dyto7dlgt/image/upload/v1692827653/project3/message_arsqdr.png"
                      alt="No messages"
                      className = "h-2/3 w-1/3 md:mt-28 md:ml-96 ml-28 opacity-40"
                    /> : <div className = "flex justify-center align-middle">
                    {user.conversations.length ?
                    <p className = "md:h-2/3 md:w-1/3 md:mt-80 mt-3 md:ml-40 opacity-40 md:text-2xl text-xl"
                    >Select a chat to start messaging</p> :

                    <p className = "md:h-2/3 md:w-1/3 md:mt-80 mt-3 md:ml-40 opacity-40 md:text-2xl text-xl"
                    >You don't have active chats</p>}
                    
                    </div>}
                    </>
                  )}
                </div>
              </div>
              {anotherUser && anotherUser._id != user._id && <form
                onSubmit={handleFormSubmit}
                class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-2"
              >

                <div class="flex-grow ">
                  <div class="relative w-full">
                    <input
                      type="text"
                      name="message"
                      class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      value={message}
                      onChange={sendMessage}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  class="flex ml-3 items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                  <span>Send</span>
                  <span class="ml-2">
                    <svg
                      class="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </form>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messenger;
