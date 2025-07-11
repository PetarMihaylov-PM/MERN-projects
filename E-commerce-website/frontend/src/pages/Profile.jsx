import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../../../admin/src/App';
import { toast } from 'react-toastify';

function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchUserProfile = async () => {
      try {
        
        const token = localStorage.getItem('token');
        const response = await axios.get(backendUrl + '/api/user/profile', {headers:{token}});

        if(response.data.success){
          setUser(response.data.data);
        } else {
          toast.error(response.data.message);
        }

      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

  },[])

  return (
    <div>

    </div>
  )
}

export default Profile