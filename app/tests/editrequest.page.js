import { Selector } from 'testcafe';

class EditRequestPage {
  constructor() {
    this.pageId = '#editrequest-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that this page is correctly functioning. */
  async submitEditRequest(testController, location, description) {
    // This is where submitRequest writes and submits information into AddRequest Page
    await testController.typeText('#editrequest-location', location);
    await testController.typeText('#editrequest-description', description);
    await testController.typeText('#editrequest-submit', description);
  }
}

export const editRequestPage = new EditRequestPage();
