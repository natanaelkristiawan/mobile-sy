// useLibs

import { useGlobalState, useGlobalReturn } from 'esoftplay';

const vegetableState = useGlobalState<any>(undefined, { persistKey: "main" })

export default function m(): useGlobalReturn<any> {
  return vegetableState
}