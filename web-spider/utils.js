import { join, extname } from 'path';
import { URL } from 'url';
import slug from 'slug';
import { load } from 'cheerio';

function getLinkUrl(currentUrl, element) {
  const parsedLink = new URL(element.attribs.href || '', currentUrl);
  const currentParsedUrl = new URL(currentUrl);
  if (
    parsedLink.hostname !== currentParsedUrl.hostname ||
    !parsedLink.pathname
  ) {
    return null;
  }

  return parsedLink.toString();
}

export function urlToFilename(url) {
  const parsedUrl = new URL(url);
  const urlPath = parsedUrl.pathname
    .split('/')
    .filter((component) => component !== '')
    .map((component) => slug(component, { remove: null }))
    .join('/');

  let filename = join(parsedUrl.hostname, urlPath);
  if (!extname(filename).match(/htm/)) {
    filename += '.html';
  }

  return filename;
}

export function getPageLinks(currentUrl, body) {
  return (
    Array.from(load(body)('a'))
      .map((element) => getLinkUrl(currentUrl, element))
      // remove null
      .filter(Boolean)
  );
}
