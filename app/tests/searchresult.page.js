import { Selector } from 'testcafe';

class SearchresultPage {
  constructor() {
    this.pageId = '#searchresult-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async typeSearchword(testController, searchword) {
    await testController.typeText('#nav-search', searchword);
    await testController.pressKey('enter');
  }

  async isDisplayed(testController) {
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }
}

export const searchresultPage = new SearchresultPage();
