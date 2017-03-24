import { EnginneringThesisPage } from './app.po';

describe('enginnering-thesis App', function() {
  let page: EnginneringThesisPage;

  beforeEach(() => {
    page = new EnginneringThesisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
