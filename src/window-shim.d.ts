import OverworldMap from './OverworldMap.ts'

export default {}

declare global {
  interface Window {
    OverworldMaps: OverworldMap
  }
}
