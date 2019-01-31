import ADJS from '../src/index.ts';

describe('Ad', () => {
  ADJS.configure({ network: new ADJS.Networks.Default() });
  const ad = new ADJS.Ad({});

  describe('render()', () => {
    it('should render ad & trigger async hooks', async () => {
      let rendered;
      ad.on('rendered', () => { rendered = true; });
      await ad.render();
      expect(rendered).toEqual(true);
      expect(ad.state.rendering).toEqual(false);
      expect(ad.state.rendered).toEqual(true);
    });
  });

  describe('refresh()', () => {
    it('should refresh ad & trigger async hooks', async () => {
      let refreshed;
      ad.on('refreshed', () => { refreshed = true; });
      await ad.refresh();
      expect(refreshed).toEqual(true);
      expect(ad.state.refreshing).toEqual(false);
      expect(ad.state.refreshed).toEqual(true);
    });
  });

  describe('destroy()', () => {
    it('should destroy ad & trigger async hooks', async () => {
      let destroyed;
      ad.on('destroyed', () => { destroyed = true; });
      await ad.destroy();
      expect(destroyed).toEqual(true);
      expect(ad.state.destroying).toEqual(false);
      expect(ad.state.destroyed).toEqual(true);
    });
  });

  describe('freeze()', () => {
    it('should freeze ad & trigger async hooks', async () => {
      let frozen;
      ad.on('frozen', () => { frozen = true; });
      await ad.freeze();
      expect(frozen).toEqual(true);
      expect(ad.state.freezing).toEqual(false);
      expect(ad.state.frozen).toEqual(true);
    });
  });

  describe('unfreeze()', () => {
    it('should unfreeze ad & trigger async hooks', async () => {
      await ad.onReady(() => {})
      let unfrozen;
      ad.on('unfrozen', () => { unfrozen = true; });
      await ad.unfreeze({ replayEventsWhileFrozen: true });
      expect(unfrozen).toEqual(true);
      expect(ad.state.unfreezing).toEqual(false);
      expect(ad.state.frozen).toEqual(false);
    });

    it('should trigger backlogged events when provided replayEventsWhileFrozen option', async () => {
      let backlogged = true;
      ad.on('refresh', () => { backlogged = false; });
      await ad.freeze();
      await ad.refresh();
      await ad.unfreeze({ replayEventsWhileFrozen: true });
      expect(backlogged).toEqual(false);
    });

    it('should not trigger backlogged events when not provided replayEventsWhileFrozen option', async () => {
      let backlogged = true;
      ad.on('refresh', () => { backlogged = false; });
      await ad.freeze();
      await ad.refresh();
      await ad.unfreeze();
      expect(backlogged).toEqual(true);
    });
  });
});