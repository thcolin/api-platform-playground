import React from 'react'
import { Response } from './Response'
import { Runtime } from './Runtime'
import { usePHP } from '../utils/usePHP'

export const Playground = ({ ...props }) => {
  const { FS, stdout, stderr, runCode, versions, reset, ccall } = usePHP()

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}></div>
        <div>
          <span>PHP Version: {versions.php}</span>
          <br/>
          <span>API Platform Version: {versions.apiPlatform}</span>
        </div>
      </header>

      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <label for="example">Example: </label>
          <select id="example" name="example">
            <option value="guide" selected>Extend Open API</option>
            <option value="provide-the-resource-state">Provide the Resource state</option>
            <option value="use-doctrine">Use Doctrine</option>
          </select>
          {/* <button class="secondary" title="Toggle file tree" data-toggle="file-list-container">Hide files</button> */}
          <button class="secondary" id="save" title="Save" disabled>💾 Save</button>
        </div>
      </div>

      <div style={{ flex: 1, maxHeight: '60vh', display: 'flex' }}>
        <div id="editor" style={{ flex: 1 }}>
          <Runtime />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '40%', paddingLeft: '1em' }}>
          <div>
            <form id="request" style={{ display: 'flex', flexDirection: 'column' }}>
              <div id="request-content" class="hide">
                <div style={{ flex: 1 }}>
                  <label for="accept">Accept
                    <select name="accept" style={{ maxWidth: '30%' }}>
                      <option selected value="application/ld+json">application/ld+json</option>
                      <option value="application/json">application/json</option>
                      <option value="application/vnd.api+json">application/vnd.api+json</option>
                    </select>
                  </label>
                  <label for="content-type">Content-Type
                    <select name="content-type">
                      <option selected value="application/ld+json">application/ld+json</option>
                      <option value="application/json">application/json</option>
                      <option value="application/vnd.api+json">application/vnd.api+json</option>
                      <option value="application/merge-patch+json">application/merge-patch+json</option>
                    </select>
                  </label>
                </div>
                <details style={{ flex: 1 }}>
                  <summary>Body</summary>
                  <iframe id="body" src="response.html" frameBorder="0" width="100%" style={{ maxHeight: '100px' }}></iframe>
                </details> 
              </div>
              {/* <div style="flex-direction: column;">
                <label for="route"><select name="route" id="routes">
                </select></label>
                <input type="submit" value="Send" />
                <button id="open-request" data-toggle="request-content">Configure</button>
              </div> */}
            </form>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Response />
          </div>
        </div>
      </div>
    </div>
  )
}
