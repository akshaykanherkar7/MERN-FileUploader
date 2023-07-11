import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    birthdate: '',
    photo: ''
  });

  const handleImageChange = (e) => {
    setNewUser({...newUser, photo: e.target.files[0]});
    console.log("photo", newUser.photo)
  };

  const handleChange = (e) => {
    setNewUser({...newUser, [e.target.name]: e.target.value})
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', newUser.photo);
    formData.append('birthdate', newUser.birthdate);
    formData.append('name', newUser.name);

    console.log("formData", formData);
    
      await axios.post('http://localhost:3000/file/upload', formData)
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log("err",err);
      });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
        <input type="file" accept=".png, .jpg, .jpeg" name="photo" onChange={handleImageChange} />
        <input type="text" placeholder='name' name="name" value={newUser.name} onChange={handleChange} />
        <input type="date" name="birthdate" value={newUser.date} onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImageUpload;
