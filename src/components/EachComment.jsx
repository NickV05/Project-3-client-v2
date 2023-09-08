import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { post } from "../services/authService";
import { Link } from "react-router-dom";


const EachComment = ({ comment, author, _id, getAllDetails }) => {
    const { user } = useContext(AuthContext);
    const [editing, setEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(comment);
    const [dropDown, setDropdown] = useState(false)

    const deleteReview = () => {
        post(`/items/delete-review/${_id}`)
            .then((updatedItem) => {
                console.log("Client updated item:", updatedItem.data);
                getAllDetails();
            })
            .catch((err) => console.log(err));
    };

    const editReview = () => {
        setEditing(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { comment: editedComment };
        setEditing(false);
        post(`/items/review-update/${_id}`, requestBody)
            .then((response) => {
                console.log("Updated review", response.data);
                getAllDetails();
            });
    };

    const handleDropDown =() => {
        setDropdown(!dropDown)
    }

    return (

      <section class="bg-white dark:bg-gray-900 py-8 lg:py-16">
        <div class="max-w-2xl mx-auto px-4">
          <article class="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
            <footer class="relative flex justify-between items-center mb-2">
              <div class="flex items-center">
                <Link
                  to={`/profile/${author._id}`}
                  class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"
                >
                  <img
                    class="mr-2 w-6 h-6 rounded-full"
                    src={author.image}
                    alt="author"
                  />
                  {author.fullName}
                </Link>
              </div>

              {author._id === user._id && (
                <div className="">
                  <button
                    onClick={handleDropDown}
                    id="dropdownComment1Button"
                    data-dropdown-toggle="dropdownComment1"
                    class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button"
                  >
                    <svg
                      class="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    </svg>
                    <span class="sr-only">Comment settings</span>
                  </button>

                  {dropDown && (
                    <div
                      id="dropdownComment1"
                      class="absolute flex align-middle justify-center right-0 mt-2 z-10 w-28 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <ul
                        class="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownMenuIconHorizontalButton"
                      >
                        <li className="flex align-middle justify-center">
                          <button
                            onClick={deleteReview}
                            type="button"
                            className="inline-flex items-center text-white bg-red-600
                     hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 
                     text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                          >
                            <svg
                              className="w-5 h-5 mr-1.5 -ml-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 
                        100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 
                        0 00-1-1z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            Delete
                          </button>
                        </li>
                        <li className="flex align-middle justify-center">
                          {!editing && (
                            <button
                              type="button"
                              onClick={() => {
                                editReview();
                                handleDropDown();
                              }}
                              className="text-white inline-flex items-center bg-primary-700 w-full justify-center hover:bg-primary-800 focus:ring-4 
                        focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
                        dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                              <svg
                                className="mr-1 -ml-1 w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                <path
                                  fillRule="evenodd"
                                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              Edit
                            </button>
                          )}
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </footer>
            <p class="text-gray-500 dark:text-gray-400">{comment}</p>
          </article>

          {editing && (
            <div>
              <form onSubmit={handleFormSubmit}>
                <div
                  className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 
                dark:border-gray-700"
                >
                  <textarea
                    type="text"
                    name="comment"
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                    className="px-0 w-full text-sm text-gray-900 border-0
                    focus:ring-0 focus:outline-none dark:text-white
                    dark:placeholder-gray-400 dark:bg-gray-800"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="inline-flex bg-blue-500 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg 
                  focus:ring-4 
            focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    );
};

export default EachComment;