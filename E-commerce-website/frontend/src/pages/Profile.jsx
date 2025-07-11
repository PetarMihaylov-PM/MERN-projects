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
    <div className='min-h-screen flex flex-col items-center justify-center'>

      <div className='p-20 rounded-2xl bg-orange-300/40'>
        <div className='flex justify-center items-center text-2xl'>
          <Title text1={"MY"} text2={'PROFILE'} />
        </div>

        <div className='flex flex-col justify-center items-center'>
          <div className='flex flex-col justify-center items-center'> 
            <img className='w-20 object-cover' src={assets.user_icon} alt="" />
            <p>Hello, <span>{user.name}</span></p>
            <p>{user.email}</p>
          </div>

          <div className='flex flex-col'>
            <div>
              <p>My Orders</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-col-1 gap-4">
              <div className="flex flex-col justify-center items-center bg-gray-200 w-40 h-20 text-center rounded">
                <img className="w-10 object-cover" src={assets.payment_icon} />
                <p>Pending Payments</p>
              </div>

              <div className="flex flex-col justify-center items-center bg-gray-200 w-40 h-20 rounded">
                <img className="w-10 object-cover" src={assets.delivered_icon} />
                <p>Delivered</p>
              </div>

              <div className="flex flex-col justify-center items-center bg-gray-200 w-40 h-20 rounded">
                <img className="w-10 object-cover" src={assets.process_icon} />
                <p>Processing</p>
              </div>

              <div className="flex flex-col justify-center items-center bg-gray-200 w-40 h-20 rounded">
                <img className="w-10 object-cover" src={assets.shipped_icon} />
                <p>Shipped</p>
              </div>
            </div>
          </div>


          </div>
      </div>

    </div>
  )
}

export default Profile