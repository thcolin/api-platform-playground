import React from 'react'
import Editor from '@monaco-editor/react'

export const Response = ({ ...props }) => {
  return (
    <Editor
      defaultLanguage='json'
      defaultValue=''
      options={{
        hideCursorInOverviewRuler: true,
        overviewRulerBorder: false,
        overviewRulerLanes: 0,
        minimap: {
          enabled: false
        },
        scrollBeyondLastLine: false,
        lineNumbers: false,
        glyphMargin: false,
        folding: false,
        lineDecorationsWidth: 0,
        lineNumbersMinChars: 0,
        contextmenu: false,
        automaticLayout: true,
      }}
    />
  )
}
