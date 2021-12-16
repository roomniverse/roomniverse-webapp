import { Selector } from 'testcafe';

class FindRoommatePage {
  constructor() {
    this.pageId = '#find-roommate-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that AddRequest is correctly functioning. */
  async gotoAddRequest(testController) {
    await testController.click('#findroommate-addrequest');
  }

  /** Asserts that AddRequest is correctly functioning. */
  async gotoEditRequest(testController) {
    await testController.click('#findroommate-editrequest');
  }
}

export const findRoommatePage = new FindRoommatePage();
