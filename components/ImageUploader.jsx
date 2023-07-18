import { useState } from 'react'
import Loader from './Loader';
import { STATE_CHANGED, auth, storage } from '@/lib/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const ImageUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  const uploadFile = (event) => {
    const file = Array.from(event.target.files)[0];
    const extension = file.type.split('/')[1];
    const fileRef = ref(storage, `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`);
    setUploading(true);
    const task = uploadBytesResumable(fileRef,file);
    
    task.on(STATE_CHANGED, (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(progress);
    },
    (error) => {
      //console.log(error);
    },
    async () => {
      //complete function
      const url = await getDownloadURL(fileRef);
      setDownloadURL(url);
      setUploading(false);
    })
  }

  return (
    <div className="box">
      <Loader show={uploading} />
      {
        uploading ?
        <h3>{progress}%</h3> :
        <>
          <label className='btn'>
            📷 Upload Img
            <input type="file" onChange={uploadFile} accept="image/x-png,image/gif,image/jpeg" />
          </label>
        </>
      }
      {
        downloadURL && <code className="upload-snippet">{`![alt](${downloadURL})`}</code>
      }
    </div>
  )
}

export default ImageUploader