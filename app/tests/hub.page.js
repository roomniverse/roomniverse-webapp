import { Selector } from 'testcafe';

class HubPage {
  constructor() {
    this.pageId = '#hub-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const hubPage = new HubPage();
