import { AnimationDescription } from './AnimationDescription';
import { AnimationEventType } from './AnimationEventType';

export type CherryAnimation = {
  getState: () => string;
  pause: () => void;
  resume: () => void;
  play: (config: { id: string }) => void;
  stop: () => void;
  getPos: () => number;
  setPos: (val: number) => void;
  addChangeListener: (
    func: (changeEvent: AnimationEventType, progress: number) => void
  ) => void;
  removeChangeListener: () => void;
  animations: AnimationDescription[];
};
