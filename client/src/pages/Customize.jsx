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
  
  const snap = useSnapshot(state)
  
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
                      handleClick={() => {}}
                    />
                  ))}
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
                    isActiveTab=''
                    handleClick={() => {}}
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