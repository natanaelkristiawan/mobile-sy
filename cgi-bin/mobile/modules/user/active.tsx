// useLibs

import { esp, LibCurl, UseSelector } from 'esoftplay';
import { useEffect } from 'react';

export default function m(): void {
  const user = UseSelector((s) => s.user_class)
  function sendRecord() {
    if (user && (user.id || user.user_id)) {
      new LibCurl('user_active')
      setTimeout(sendRecord, 300000)
    }
  }
  useEffect(sendRecord, [])
}