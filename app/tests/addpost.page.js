import { Selector } from 'testcafe';

class AddPostPage {
  constructor() {
    this.pageId = '#addpost-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.click('#addpost-button');
    await testController.expect(this.pageSelector.exists).ok();
  }

  async submitPost(testController,) {
    await testController.typeText('#addrequest-location', location);
    await testController.typeText('#addrequest-description', description);
    await testController.typeText('#addrequest-submit', description);
  }
}

export const addpostPage = new AddPostPage();
