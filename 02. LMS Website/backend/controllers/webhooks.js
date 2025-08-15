import { Webhook } from "svix";
import User from "../models/user.js";

// API controller to manage Clrek User with database

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    
    await whook.verify(JSON.stringify(req.body), {
      'svix-id': req.headers['svix-id'],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    });

    const { data, type } = req.body;

    switch(type){
      case 'user.created':
        const userData = {
          _id: data.id
        }
        break;

      case 'user.created':

        break;
      
      case 'user.created':

        break;
    }

  } catch (error) {
    
  }
}