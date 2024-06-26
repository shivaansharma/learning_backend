import {v2 as cloudinary} from 'cloudinary';
import exp from 'constants';
import fs from 'fs';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

const uplodeOnCloudinary = async (localFilePatch)=>{
    try {
        if(!localFilePatch) return null
      const res =  cloudinary.uploader.upload(localFilePatch,
            {
                resource_type:"auto"
            }
        );
        console.log("file succesfully uploades : \n",res)
        return res;
    }
    catch(err){
        fs.unlinkSync(localFilePatch)
        return null;
    }
}

export {uplodeOnCloudinary}