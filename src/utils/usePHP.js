import { useEffect, useRef, useMemo, useState } from 'react'
import { Observable } from 'rxjs'

const phpBinary = require('../../php-wasm/php-web.js')

const NUM = 'number'
const STR = 'string'

export const usePHP = () => {
  const [instance, setInstance] = useState({ loading: true, versions: {} })

  const onStdout = useRef({ next: () => {} })
  const onStderr = useRef({ next: () => {} })

  const stdout = useMemo(() => new Observable((subscriber) => { onStdout.current = subscriber }), [])
  const stderr = useMemo(() => new Observable((subscriber) => { onStderr.current = subscriber }), [])

  useEffect(() => {
    (async () => {
      const { ccall, FS } = await phpBinary({
        onAbort(reason) {
          console.error(`WASM aborted: ${reason}`)
        },
        print(data) {
          if (data) {
            onStdout.current.next(data)
          }
        },
        printErr(data) {
          if (data) {
            onStderr.current.next(data)
          }
        },
      })

      ccall('pib_init', NUM, [STR], [])

      setInstance({
        ccall,
        FS,
        stdout,
        stderr,
        loading: false,
        versions: {
          php: ccall('pib_exec', STR, [STR], ['phpversion();']),
          apiPlatform: ccall('pib_exec', STR, [STR], [`str_replace('^', '', json_decode(file_get_contents('/src/api-platform/composer.json'))->require->{'api-platform/core'});`]),
        },
        runCode: (phpCode) => ccall('pib_run', NUM, [STR], [`?> ${phpCode}`]),
        reset: () => ccall('pib_refresh', NUM, [], []),
      })
    })()    
  }, [])

  return instance
}
