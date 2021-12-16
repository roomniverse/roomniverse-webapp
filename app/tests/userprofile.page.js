import { Selector } from 'testcafe';

class UserProfilePage {
  constructor() {
    this.pageId = '#userprofile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(5000).expect(this.pageSelector.exists).ok();
  }

  async gotoEditProfile(testController) {
    await testController.click('#editprofile-link');
  }

  async gotoAddPost(testController) {
    await testController.click('#addpost-button-profile');
  }

  async gotoEditPost(testController) {
    await testController.click('#edit-post-dropdown');
    await testController.click('#edit-post-link');
  }

  async deletePost(testController) {
    await testController.click('#edit-post-dropdown');
    await testController.click('#delete-post');
  }
}

export const userprofilePage = new UserProfilePage();
