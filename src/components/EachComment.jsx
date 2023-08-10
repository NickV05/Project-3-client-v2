import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { post } from "../services/authService";


const EachComment = ({ comment, author, _id, item, getAllDetails }) => {
    const { user } = useContext(AuthContext);
    const [editing, setEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(comment);

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

    return (
        <div>
            <p>{comment}</p>
            <p>Author: {author.fullName}</p>

            {author._id === user._id && (
                <div>
                    <button onClick={deleteReview} className=" text-white border my-3 border-palette-primary text-palette-primary text-lg 
            font-primary font-semibold pt-2 pb-1 leading-relaxed flex justify-center items-center focus:ring-1 focus:ring-palette-light 
            focus:outline-none w-full hover:bg-palette-lighter rounded-sm">Delete review</button>

                    {!editing && <button onClick={editReview} className=" text-white border my-3 border-palette-primary text-palette-primary text-lg 
            font-primary font-semibold pt-2 pb-1 leading-relaxed flex justify-center items-center focus:ring-1 focus:ring-palette-light 
            focus:outline-none w-full hover:bg-palette-lighter rounded-sm">Edit review</button>}

                    {editing && (
                        <div>
                            <form onSubmit={handleFormSubmit}>
                                <label>Edit Your review:</label>
                                <input
                                    type="text"
                                    name="comment"
                                    value={editedComment}
                                    onChange={(e) => setEditedComment(e.target.value)}
                                />

            <button type="submit" className=" text-white border my-3 border-palette-primary text-palette-primary text-lg 
            font-primary font-semibold pt-2 pb-1 leading-relaxed flex justify-center items-center focus:ring-1 focus:ring-palette-light 
            focus:outline-none w-full hover:bg-palette-lighter rounded-sm">Submit</button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default EachComment;