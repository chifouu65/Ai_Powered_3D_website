import React from 'react'
import { Button } from '../components'

const FilePicker = ({file,setFile, readFile}) => {
  return (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col'>
        <input  
          id='file-upload'	
          type='file'
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor='file-upload' className='
          border-2 border-dashed rounded-md p-4 flex flex-col items-center
        '>
          Upload Image file
        </label>
        <p className='mt-2 text-gray-900 text-normal truncate'>
          {file === '' ? 'No file selected' : file.name}
        </p>
         {
          file !== '' && (
            <div className='mt-2 flex flex-col items-center'>
              <img src={URL.createObjectURL(file)} alt='preview' className='w-8 h-8 object-cover' />
            </div>
          )
         }

      </div>
      
      <div className='mt-4 flex flex-wrap gap-3'>
        <Button
          type={'filled'}
          title='apply'
          customStyles='text-xs'
          handleClick={() => readFile('logo')}
        />
        <Button
          type={'filled'}
          title='Full'
          customStyles='text-xs'
          handleClick={() => readFile('full')}
        />
      </div>
    </div>
  )
}

export default FilePicker