import formatProxyUrl from './formatProxyUrl';

describe('Utils', () => {
  it('tests formatProxyUrl()', () => {
    let url = formatProxyUrl('/myApp/login');
    expect(url).toEqual(`/myApp/login`);

    url = formatProxyUrl('/def', 'https://abc.com');
    expect(url).toEqual('https://abc.com/def');

    url = formatProxyUrl('', 'http://my-domain.com');
    expect(url).toEqual('http://my-domain.com');

    url = formatProxyUrl('/xyz', undefined);
    expect(url).toEqual(`/xyz`);

    url = formatProxyUrl('/path1', null);
    expect(url).toEqual(`/path1`);

    url = formatProxyUrl('/path2', 6);
    expect(url).toEqual('/path2');

    url = formatProxyUrl('/path3', true);
    expect(url).toEqual('/path3');

    url = formatProxyUrl('/path4', false);
    expect(url).toEqual(`/path4`);
  });
});
