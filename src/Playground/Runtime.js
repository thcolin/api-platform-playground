import React from 'react'
import Editor from '@monaco-editor/react'

export const Runtime = ({ ...props }) => {
  return (
    <Editor
      defaultLanguage='php'
      defaultValue={`<?php\n  `}
      options={{
        wordWrap: 'on',
        automaticLayout: true,
      }}
    />
  )
}
