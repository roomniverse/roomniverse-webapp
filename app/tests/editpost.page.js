import { Selector } from 'testcafe';

class EditPostPage {
  constructor() {
    this.pageId = '#editpost-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async submitPost(testController, text, image) {
    await testController.click('#editpost-text').pressKey('ctrl+a delete');
    await testController.typeText('#editpost-text', text);
    await testController.click('#editpost-image').pressKey('ctrl+a delete');
    await testController.typeText('#editpost-image', image);
    await testController.click('#editpost-submit');
  }
}

export const editpostPage = new EditPostPage();
