import { LOG_LEVELS } from '../types';
import dispatchEvent from '../utils/dispatchEvent';
import Stickybits from '../utils/stickybits';
import GenericPlugin from './GenericPlugin';

class Sticky extends GenericPlugin {
  public stickybit?: Stickybits;

  public onCreate() {
    const { container } = this.ad;

    this.stickybit = new Stickybits(container);
    dispatchEvent(this.ad.id, LOG_LEVELS.INFO, 'Sticky Plugin', `Sticky container added to ad.`);
  }

  public onDestroy() {
    if (this.stickybit) {
      dispatchEvent(this.ad.id, LOG_LEVELS.INFO, 'Sticky Plugin', `Removed sticky container from ad.`);
      this.stickybit.cleanup();
    }

    this.stickybit = undefined;
  }
}

export default Sticky;
