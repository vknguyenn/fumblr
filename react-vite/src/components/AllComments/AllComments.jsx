import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { loadCommentsThunk } from "../../redux/comment"

const AllComments = () => {
    const dispatch = useDispatch()
    const comments = useSelector(state => state.comment.comment)
    console.log("comments: ", comments)
    // const commentObj = Object.values(comments)
    // console.log("comments OBJ: ", commentObj)

    useEffect(() => {
        dispatch(loadCommentsThunk());
    }, [dispatch])

    return (
        <>
            {comments ? (
                comments.map((com) => (
                    <div key={com.id}>
                        <p>{com.comment}</p>
                    </div>
                ))
            ) : (
                <p>Loading comments...</p>
            )}
        </>
    )


}

export default AllComments