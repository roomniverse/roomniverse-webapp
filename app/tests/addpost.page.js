import { Selector } from 'testcafe';

class AddPostPage {
  constructor() {
    this.pageId = '#addpost-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async submitPost(testController, text, image) {
    await testController.typeText('#addpost-text', text);
    await testController.typeText('#addpost-image', image);
    await testController.click('#addpost-submit');
  }
}

export const addpostPage = new AddPostPage();
