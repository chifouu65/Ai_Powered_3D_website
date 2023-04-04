import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import config from '../config/config'
import state from '../store'
import { download } from '../assets'
import { downloadCanvasToImage, reader } from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'

import { AiPicker, ColorPicker, Button, FilePicker, Tab } from '../components'

const Customize = () => {
  
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');
  const [promp, setPromp] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  //show tab content depending on the active tab
  const genereteTabContent = () => {
    switch(activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />
      case 'filepicker':
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      case 'aipicker':
        return <AiPicker 
          promp={promp}
          setPromp={setPromp}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      default:
        return null
    };
  };

  const handleSubmit = async (type) => {
    if(!promp) return alert('Please enter a text')
    
    try {
      //call our api to generate an ai image
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false)
      setActiveEditorTab('')
    }
  }

  const handleDecals = (type, res) => {
    const decalType = DecalTypes[type]

    state[decalType.stateProperty] = res

    if (!activeEditorTab[decalType.FilterTabs]) {
      handleActiveFilterTab(decalType.FilterTabs)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName]
        break;
      case 'stylishShirt':
        state.isStylishTexture = !activeFilterTab[tabName]
        break;
      default:
        state.isLogoTexture = true
        state.isStylishTexture = false
    };

    //after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      };
    });
  }

  const readFile = (type) => {
    reader(file, type)
      .then((res) => {
        handleDecals(type, res)
        setActiveEditorTab('')
      })
      .catch((err) => console.log(err));
  }
  return (
    <AnimatePresence>
     {
        !snap.intro && (
          <>
            <motion.div className='absolute top-0 left-0 z-10'
            {...slideAnimation('left')}
            key='custom'
            >
              <div className='flex items-center min-h-screen'>
                <div className='editortabs-container tabs'>
                  {EditorTabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      tab={tab}
                      handleClick={() => setActiveEditorTab(tab.name)}
                    />
                  ))}
                  {genereteTabContent()}
                </div>
              </div>
            </motion.div>
            <motion.div
              className='absolute top-5 right-5 z-10'
              {...fadeAnimation}
            >
              <Button 
                type={'filled'} 
                title={'Go Back'}
                customStyles={'w-fit px-4 py-2.5 font-bold text-sm'}
                handleClick={() => { state.intro = true }}
              />
            </motion.div>

            <motion.div
              className='filtertabs-container'
              {...slideAnimation('up')}
            >
              {FilterTabs.map((tab) => (
                  <Tab
                    tab={tab}
                    key={tab.name}
                    isFilterTab
                    isActiveTab={activeFilterTab[tab.name]}
                    handleClick={() => handleActiveFilterTab(tab.name)}
                  />
              ))}
            </motion.div>
          </>
        )
     } 
    </AnimatePresence>
  )
}

export default Customize