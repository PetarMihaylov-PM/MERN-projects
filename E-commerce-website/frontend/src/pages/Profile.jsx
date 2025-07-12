import axios from 'axios';
import { useEffect, useState } from 'react';
import { backendUrl } from '../../../admin/src/App';
import { toast } from 'react-toastify';
import { assets } from '../assets/frontend_assets/assets.js';
import Title from '../components/Title.jsx'

function Profile() {

  const [user, setUser] = useState(null);
  const [imageInput, setImageInput] = useState('');

  const handleImageUpdate = async () => {
    try {
      
      const token = localStorage.getItem('token');

      const response = await axios.post(backendUrl + '/api/profile/update-image', {profileImg: imageInput}, {headers: {token}});

      if(response.data.success){
        toast.success('Profile image updated!');
        setUser(response.data.user);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
  }

  useEffect(() => {

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

    fetchUserProfile();
  }, []);
  console.log(user)

  if (!user) return <p>Loading...</p>

  return (
    <div class="flex flex-col items-center max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-md xl:max-w-lg sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl/15 rounded-lg text-gray-900">

      {/* Background img */}
      <div class="flex relative rounded-t-lg w-full h-40 overflow-hidden">
          <img class="absolute object-cover object-top w-full top-[-30px]" src={assets.clothing_bg} alt='clothing' />
      </div>


      {/* Profile img */}
      <div class="mx-auto w-33 h-32 relative -mt-16 border-2 border-white rounded-full overflow-hidden">
          <img class="object-cover object-center" src={user.profileImg ||assets.user_icon} alt='User'/>
      </div>

      


      {/* Profile name and email */}
      <div class="text-center mt-2">
          <h2 class="font-semibold">{user.name}</h2>
          <p class="text-gray-500">{user.email}</p>
      </div>


      {/* Buttons for orders checking */}
      <ul class="py-4 mt-2 text-gray-700 grid grid-cols-2 place-items-center gap-y-8 w-[80%]">
          <li class="flex flex-col items-center justify-around py-1 w-26 h-14 border border-gray-300 rounded cursor-pointer hover:bg-orange-100 hover:shadow-lg/10 transition-all ease-in-out">
              <img class="w-6 fill-current text-blue-900" src={assets.delivered_icon} />
              <div>Delivered</div>
          </li>

          <li class="flex flex-col items-center justify-around py-1 w-26 h-14 border border-gray-300 rounded cursor-pointer hover:bg-orange-100 hover:shadow-lg/10 transition-all ease-in-out">
              <img class="w-6 fill-current text-blue-900" src={assets.shipped_icon} />
              <div>Shipped</div>
          </li>

          <li class="flex flex-col items-center justify-around py-1 w-26 h-14 border border-gray-300 rounded cursor-pointer hover:bg-orange-100 hover:shadow-lg/10 transition-all ease-in-out">
              <img class="w-6 fill-current text-blue-900" src={assets.process_icon} />
              <div>Processed</div>
          </li>

          <li class="flex flex-col items-center justify-around py-1 w-26 h-14 border border-gray-300 rounded cursor-pointer hover:bg-orange-100 hover:shadow-lg/10 transition-all ease-in-out">
              <img class="w-6 fill-current text-blue-900" src={assets.payment_icon} />
              <div>Paid</div>
          </li>
      </ul>

      {/* Change password option */}
      <div class="p-4 border-t mx-8 mt-5 w-[80%]">
          <button class="w-[60%] py-2 block text-sm mx-auto rounded-full border bg-gray-900 hover:bg-white hover:text-black hover:border font-semibold text-white px-6 transition-all ease-in-out cursor-pointer">Change Password</button>
      </div>
  </div>
  )
}

export default Profile