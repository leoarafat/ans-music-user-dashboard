import React, { useState } from 'react';
const MyFormComponent = () => {
  const [formData, setFormData] = useState({
    title: '',
    hide: false,
    room_category_id: '65829c7b796042f3d4955d33',
    hotel_id: '658137fc47f7dd68dc0909b6',
    food_package: 'Standard',
    // ... add other form fields
  });
  const handleFileChange = (e) => {
    const files = e.target.files;
    // You can process and handle the selected files here
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('roomData', JSON.stringify(formData));
    // Assuming you have a file input with the name "images"
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        form.append('images', files[i]);
      }
    }
    try {
      // Make a request to your server with the form data
      const response = await fetch('/api/createRoom', {
        method: 'POST',
        body: form,
      });
      // Handle the response as needed
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
      </label>
      {/* Add other form fields */}
      <input type="file" name="images" onChange={handleFileChange} multiple />
      <button type="submit">Submit</button>
    </form>
  );
};
export default MyFormComponent;