import axios from 'axios';
import { useEffect, useState } from 'react';
import { backendUrl } from '../../../admin/src/App';
import { toast } from 'react-toastify';
import { assets } from '../assets/frontend_assets/assets.js';
import Title from '../components/Title.jsx'

function Profile() {

  const [user, setUser] = useState(null);

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
    <div class="flex flex-col items-center max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">

      {/* Background img */}
      <div class="flex relative rounded-t-lg w-full h-40 overflow-hidden">
          <img class="absolute object-cover object-top w-full top-[-30px]" src={assets.clothing_bg} alt='clothing' />
      </div>


      {/* Profile img */}
      <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img class="object-cover object-center h-32" src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Woman looking front' />
      </div>


      {/* Profile name and email */}
      <div class="text-center mt-2">
          <h2 class="font-semibold">{user.name}</h2>
          <p class="text-gray-500">{user.email}</p>
      </div>


      {/* Buttons for orders checking */}
      <ul class="py-4 mt-2 text-gray-700 grid grid-cols-2 place-items-center gap-y-5 w-[80%]">
          <li class="flex flex-col items-center justify-around">
              <img class="w-4 fill-current text-blue-900" src={assets.delivered_icon} />
              <div>Delivered</div>
          </li>

          <li class="flex flex-col items-center justify-around px-3 py-1 border border-gray-300 rounded">
              <img class="w-4 fill-current text-blue-900" src={assets.shipped_icon} />
              <div>Shipped</div>
          </li>

          <li class="flex flex-col items-center justify-around w-20">
              <img class="w-4 fill-current text-blue-900" src={assets.process_icon} />
              <div>Processed</div>
          </li>

          <li class="flex flex-col items-center justify-around w-20">
              <img class="w-4 fill-current text-blue-900" src={assets.payment_icon} />
              <div>Payed</div>
          </li>
      </ul>

      {/* Change password option */}
      <div class="p-4 border-t mx-8 mt-2">
          <button class="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Follow</button>
      </div>
  </div>
  )
}

export default Profile