import axios from 'axios';
import { useEffect, useState } from 'react';
import { backendUrl } from '../../../admin/src/App';
import { toast } from 'react-toastify';
import { assets } from '../assets/frontend_assets/assets.js';

function Profile() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpdate = async (imageFile) => {
    
    if (!imageFile) return toast.error('Please select an image');

    try {
      setLoading(true)
      const token = localStorage.getItem('token');

      const formData = new FormData();

      formData.append('image', imageFile);
      formData.append('userId', user._id);

      const response = await axios.post(backendUrl + '/api/user/profile/update-image',
        formData,
        {
          headers: {
            token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if(response.data.success){
        toast.success('Profile image updated!');
        fetchUserProfile();
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const fetchUserProfile = async () => {
      try {

        const token = localStorage.getItem('token');
        const response = await axios.post(backendUrl + '/api/user/profile', {}, { headers: { token } });

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          console.log(response.data.message)
          toast.error(response.data.message);
        }

      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

  useEffect(() => {
    fetchUserProfile();
  }, []);
  console.log(user);

  if (!user) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
    </div>
    );
  }

  return (
    <div className="flex flex-col items-center max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-md xl:max-w-lg sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl/15 rounded-lg text-gray-900">

      {/* Background img */}
      <div className="flex relative rounded-t-lg w-full h-40 overflow-hidden">
          <img className="absolute object-cover object-top w-full top-[-30px]" src={assets.clothing_bg} alt='clothing' />
      </div>


      {/* Profile img */}
      <div className="flex relative mx-auto w-33 h-32 -mt-16 border-2 border-white rounded-full">
          {!loading ? 
          <div className='flex items-center object-cover w-full h-full'>
            <img className="w-full h-full object-cover object-center rounded-full" src={user?.profileImg?.url || assets.user_icon} alt='user-img'/>
            <div className='bg-gray-300/50 absolute bottom-0 right-3 w-7 p-1 rounded-full'>
              <img className='' src={assets.add_img_icon} alt="add-img-icon" />
            </div>
          </div>
           :  
          <div className="w-full h-full flex items-center justify-center bg-white/70 rounded-full">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent"></div>
          </div>
          }
          <input type="file" className='absolute w-full h-full rounded-full cursor-pointer opacity-0' 
              onChange={(e) => {
                const file = e.target.files[0];
                if(file) {
                  handleImageUpdate(file);
                }
              }
          } />
      </div>

    


      {/* Profile name and email */}
      <div className="text-center mt-2">
          <h2 className="font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
      </div>


      {/* Buttons for orders checking */}
      <ul className="py-4 mt-2 text-gray-700 grid grid-cols-2 place-items-center gap-y-8 w-[80%]">
          <li className="flex flex-col items-center justify-around py-1 w-26 h-14 border border-gray-300 rounded cursor-pointer hover:bg-orange-100 hover:shadow-lg/10 transition-all ease-in-out">
              <img className="w-6 fill-current text-blue-900" src={assets.delivered_icon} />
              <div>Delivered</div>
          </li>

          <li className="flex flex-col items-center justify-around py-1 w-26 h-14 border border-gray-300 rounded cursor-pointer hover:bg-orange-100 hover:shadow-lg/10 transition-all ease-in-out">
              <img className="w-6 fill-current text-blue-900" src={assets.shipped_icon} />
              <div>Shipped</div>
          </li>

          <li className="flex flex-col items-center justify-around py-1 w-26 h-14 border border-gray-300 rounded cursor-pointer hover:bg-orange-100 hover:shadow-lg/10 transition-all ease-in-out">
              <img className="w-6 fill-current text-blue-900" src={assets.process_icon} />
              <div>Processed</div>
          </li>

          <li className="flex flex-col items-center justify-around py-1 w-26 h-14 border border-gray-300 rounded cursor-pointer hover:bg-orange-100 hover:shadow-lg/10 transition-all ease-in-out">
              <img className="w-6 fill-current text-blue-900" src={assets.payment_icon} />
              <div>Paid</div>
          </li>
      </ul>

      {/* Change password option */}
      <div className="p-4 border-t mx-8 mt-5 w-[80%]">
          <button className="w-[60%] py-2 block text-sm mx-auto rounded-full border bg-gray-900 hover:bg-white hover:text-black hover:border font-semibold text-white px-6 transition-all ease-in-out cursor-pointer">Change Password</button>
      </div>
  </div>
  )
}

export default Profile