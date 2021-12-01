import { Selector } from 'testcafe';

class AddPostPage {
  constructor() {
    this.pageId = '#addpost-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.click('#addpost-button');
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }
}

export const addpostPage = new AddPostPage();
