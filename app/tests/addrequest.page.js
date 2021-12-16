import { Selector } from 'testcafe';

class AddRequestPage {
  constructor() {
    this.pageId = '#addrequest-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that this page is currently displayed. */
  async submitRequest(testController, location, description) {
    // This is where submitRequest writes and submits information into AddRequest Page
    await testController.typeText('#addrequest-location', location);
    await testController.typeText('#addrequest-description', description);
    await testController.typeText('#addrequest-submit', description);
  }
}

export const addRequestPage = new AddRequestPage();
