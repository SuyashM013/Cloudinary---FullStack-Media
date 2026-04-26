import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: null,
  });

  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const url = "http://localhost:5500/";

  const fetchUsers = async () => {
    try {
      const res = await fetch(url + "api/get-users");
      const data = await res.json();
      setUsers(data);
      // console.log("Fetched users:", data);
    } catch (error) {
      // console.error("Error fetching users:", error);
      alert('Failed to fetch users. Please try again later.', error);
    }
  };

  useEffect(() => {
    // console.log("Fetching users...", users);
    fetchUsers();
  }, []);

  const deleteImage = async (id) => {
    try{
      const res = await fetch(url + `api/delete/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error(res.Error || "Delete failed");

      const result = await res.json();
      // console.log('Delete successful:', result);
      alert('Image deleted successfully!');

      await fetchUsers(); // ✅ clean reuse

    }
    catch(error){
      // console.error("Error deleting image:", error);
      alert('Failed to delete image. Please try again later.', error);
    }
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files?.[0] || null,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("image", formData.image);

    try {
      const res = await fetch(url + "api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Upload failed");
      
      const result = await res.json();
      // console.log('Upload successful:', result);
      alert('Image uploaded successfully!');

      await fetchUsers(); // ✅ clean reuse

      setFormData({
        name: "",
        email: "",
        image: null,
      });

    } catch (error) {
      // console.error("Upload failed:", error);
      alert('Image upload failed. Please try again.', error);
    }
  };


  return (
    <div className=' bg-slate-400 flex flex-col   gap-10 items-center justify-center min-h-screen p-5'>
      <h1 className=" mt-10 text-3xl font-bold underline">
        Welcome to Cloudinary Full Stack App

      </h1>

      <div className='w-2/3 h-1/2 bg-slate-300 rounded-lg flex flex-col justify-center gap-5 p-5'>
        <h2>Workflow looks like - </h2>

        <p>
          1. User uploads an image from the frontend.
          <br />
          2. The image is sent to the backend server.
          <br />
          3. The backend server processes the image and uploads it to Cloudinary.
          <br />
          4. Cloudinary returns a URL for the uploaded image.
          <br />
          5. The backend server sends the image URL back to the frontend.
          <br />
          6. The frontend displays the uploaded image using the received URL.

        </p>
      </div>


      <div className='w-4/5 h-1/2 bg-slate-300/60 rounded-lg flex flex-col items-center justify-center gap-5 p-5'>
        <h2 className='text-xl bold ' >Upload Image</h2>


        <form onSubmit={handleSubmit} method='post' encType='multipart/form-data' className='flex flex-col gap-3 w-2/3  bg-white/40 backdrop-blur-lg  p-4 rounded-lg'>

          <label htmlFor='name' className='font-semibold bg-white/30 p-2 rounded-xl'>Name</label>
          <input
            id='name'
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='border border-slate-300 bg-cyan-100/30  rounded-xl px-3 py-2'
            placeholder='Enter your name'
            required
          />

          <label htmlFor='email' className='font-semibold bg-white/30 p-2 rounded-xl'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='border border-slate-300 bg-cyan-100/30  rounded-xl px-3 py-2'
            placeholder='Enter your email'
            required
          />

          <label htmlFor='image' className='font-semibold bg-white/30 p-2 rounded-xl'>Image</label>
          <input
            id='image'
            type='file'
            name='image'
            accept='image/*'
            onChange={handleChange}
            className='border border-slate-300 rounded px-3 py-2 bg-blue-300 cursor-pointer'
            required
          />

          <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer' type="submit">Upload</button>

        </form>
      </div>

      <div className='w-4/5 h-1/2 bg-slate-300/60 rounded-lg flex flex-col items-center justify-center gap-5 p-5'>
        <h2 className='text-xl bold '> Gallery</h2>

        <div className='w-full h-full bg-white/40 backdrop-blur-lg rounded-lg p-5 flex flex-wrap gap-5 justify-center items-center overflow-y-auto'>

          {users.map((data) => {
            return (
              <div key={data._id} className='w-60 h-60 bg-slate-300 rounded-lg flex flex-col items-center justify-center gap-3 p-3'>

                <img src={data.imageUrl} alt={data.name} className='w-full h-3/4 object-cover rounded-lg' />
                 
                <h3 className='text-lg font-semibold'>{data.name}</h3>

                <div className='flex gap-3'>

                <button><a href={data.imageUrl} target="_blank" rel="noopener noreferrer" className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded cursor-pointer'>View</a></button>

                <button onClick={() => deleteImage(data._id)} className='bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded cursor-pointer'>Delete</button>

                </div>
      
              </div>
            )
          })}

        </div>

      </div>


    </div>
  )
}

export default App




