import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
// import ReactLoading from "react-loading";
import MoonLoader from "react-spinners/MoonLoader";


const Home = () => {
  const [posts, setPosts] = useState([]);

  const [editbutton, setEditButton] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getPosts();
  }, []);

  // GET DATA =====
  const getPosts = async () => {
    setLoading(true);
    const response = await fetch(
      "https://blogpost-mern-five.vercel.app/get-blogs"
    );
    // console.log(response)
    const data = await response.json();
    setLoading(false);
    // console.log(data.blogs);
    setPosts(data.blogs);
  };

  // DELETE DATA ======

  const handleDeleteBlog = async (id) => {
    const response = await fetch(
      `https://blogpost-mern-five.vercel.app/delete-blog/${id}`,
      {
        method: "DELETE",
      }
    );
    try {
      if (response.status === 200) {
        // console.log("Deleted");
        toast.success("Blog deleted successffully");
        getPosts();
      }
    } catch (error) {
      toast.error("moethinng went wrong", error);
    }
  };

  // UPDATE DATA=====

  const handleUpdateBlog = async (id) => {
    // console.log(title, description)
    const response = await fetch(
      `https://blogpost-mern-five.vercel.app/update-blog/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      }
    );

    if (response.status === 200) {
      // console.log("Deleted");
      toast.success("Blog updated successffully");
      setEditButton(!editbutton);
    } else {
      toast.error("Smoethinng went wrong");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-row justify-center mt-8 items-center">

      <MoonLoader 
    // cssOverride={"display: flex; align-items: center;"}

        color={"#000000"}
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>

      {posts.map((post) => {
        // {console.log(post)}
        return (
          <div
            className="w-[35vw] sm:w-[40vw] rounded-md shadow-md my-10 p-3 mx-auto"
            key={post._id}
          >
            <div className="flex justify-end gap-3 text-xl ">
              <MdOutlineEdit
                className={` ${
                  selectedPost === post._id && editbutton
                    ? "text-blue-500 scale-110"
                    : "text-gray-400"
                } text-gray-400 hover:text-blue-500 hover:scale-110 transition-all cursor-pointer`}
                onClick={() => {
                  setEditButton(!editbutton);
                  setSelectedPost(post._id);
                }}
              />
              <AiFillDelete
                className="text-gray-400 cursor-pointer hover:text-red-500 hover:scale-110 transition-all"
                onClick={() => handleDeleteBlog(post._id)}
              />
            </div>
            <h1
              className={
                "font-bold text-lg my-2 outline-none focus:bg-gray-200"
              }
              contentEditable={editbutton}
              onInput={(e) => setTitle(e.target.innerText)}
            >
              {" "}
              {post.title}
            </h1>
            <h3
              className="font-semibold text-gray-500 outline-none focus:bg-gray-100 selection:bg-green-200"
              contentEditable={editbutton}
              onInput={(e) => setDescription(e.target.innerText)}
            >
              {post.description}
            </h3>
            <button
              className={`${
                selectedPost === post._id && editbutton ? "block" : "hidden"
              }
                font-bold bg-purple-400 text-white px-3 py-1 my-1 mt-2 rounded-md `}
              onClick={() => handleUpdateBlog(post._id)}
            >
              Save
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Home;
