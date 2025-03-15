import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  // n
  const navigate = useNavigate();

  const handlePostBlog = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    // console.log(e.target.title.value);

    // const blog = () => {
    //   title: title
    //   description : description
    // };

    const response = await fetch("https://blogpost-mern-five.vercel.app/post-blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title:title,
        description:description
      }),
    });

    if (response.status === 200) {
      toast.success("Blog post successfully");
      e.target.title.value = "";
      e.target.description.value = "";
      setTimeout(() => navigate("/"), 2000);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-[90vw] lg:w-[60vw]  mx-auto mt-10 ">
        <h1 className="text-2xl font-bold text-center">Create Blogs</h1>
        <form className="flex flex-col gap-3" onSubmit={handlePostBlog}>
          <label htmlFor="title"  className="text-lg font-semibold">
            title :
          </label>
          <input
            className="px-3 py-2 outline-none border-2 border-gray-300 rounded-md"
            type="text"
            name="title"
            placeholder="Enter the blog site"
          />

          <label htmlFor="title" className="text-lg font-semibold">
            description :
          </label>
          <textarea
            className="outline-none border-2 border-gray-300 rounded-md p-3"
            name="description"
            rows={10}
          />

          <button
            type="submit"
            className=" py-3 bg-purple-300 rounded-md font-bold text-xl text-white hover:bg-purple-500"
          >
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
