import { PegawaiPage } from './app.po';

describe('pegawai App', () => {
  let page: PegawaiPage;

  beforeEach(() => {
    page = new PegawaiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
