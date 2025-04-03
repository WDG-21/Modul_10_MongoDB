import { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploaded, setUploaded] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const fileToUpload = e.target.files[0];
    setFile(fileToUpload);
    setPreview(URL.createObjectURL(fileToUpload));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!file) return;

    const formData = new FormData();
    formData.append('my-file', file);

    try {
      setLoading(true);

      const res = await fetch('http://localhost:3000/file-upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setUploaded(data.filepath);
      // console.log(data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {uploaded && (
        <>
          <h2>Uploaded Image</h2>
          <img src={uploaded} alt='' />
        </>
      )}
      <form className='mx-auto w-76 border-2' onSubmit={handleSubmit}>
        <label className='cursor-pointer'>
          <span>Select an image: </span>
          <input type='file' name='my-file' onChange={handleChange} />
        </label>
        <button disabled={loading} className='cursor-pointer disabled:cursor-not-allowed'>
          Upload
        </button>
      </form>
      {preview && (
        <>
          <h2>Preview Image</h2>
          <img src={preview} alt='' />
        </>
      )}
    </div>
  );
}

export default App;
