export enum Action {
  api,
  delay,
  exe,
  obs,
  spotify,
  twitter
}

export enum SubAction {
  obsLayerHide,
  obsLayerShow,
  obsLayerToggle,
  obsRecordStart,
  obsRecordStop,
  obsRecordToggle,
  obsSceneChange,
  obsStreamStart,
  obsStreamStop,
  obsStreamToggle,
  spotifyNext,
  spotifyPause,
  spotifyPrevious,
  spotifyStart,
  spotifyStop
}

interface actions {
  _id: string;
  order: number;
  action?: Action;
  subAction?: SubAction | undefined;
  seconds?: number;
  url?: string;
  text?: string;
  scene?: string;
  layer?: string;
  path?: string;
}

const actionable = {
  api: () => {},
  delay: () => {},
  exe: () => {},
  obs: () => {},
  spotify: () => {},
  twitter: () => {}
};
