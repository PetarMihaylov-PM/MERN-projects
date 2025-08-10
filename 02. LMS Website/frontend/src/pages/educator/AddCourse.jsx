import React, { useRef, useState } from 'react';
import uniqid from 'uniqid';
import Quill from 'quill';

function AddCourse() {

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState(null);

  return (
    <div>AddCourse</div>
  )
}

export default AddCourse