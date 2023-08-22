import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

const Message = ({ creator, text, image, read }) => {
    const { user } = useContext(AuthContext);
    console.log("Text ==>",text)
    console.log("Creator ==>",creator)
    console.log("User ==>",user)



  return (
    <>
    {!creator && !user && creator._id != user._id ?

      <div class="col-start-1 col-end-8 p-3 rounded-lg">
        <div class="flex flex-row items-center">
          {creator.fullName && <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          {creator.fullName[0]}
          </div>}
          <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
            <div>
            {text}
            </div>
          </div>
        </div>
      </div>
        :
        <div class="col-start-6 col-end-13 p-3 rounded-lg">
        <div class="flex items-center justify-start flex-row-reverse">
          <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
            {user.fullName[0]}
          </div>
          <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
            <div>{text}</div>
            <div class="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
              {read && <p>Seen</p>}
            </div>
          </div>
        </div>
      </div>
    }
    </>
  );
};

export default Message;
