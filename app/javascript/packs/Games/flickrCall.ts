import { RootObject } from "../Types/FlickrResponse";

const flickrCall = async (searchTag: string): Promise<string> => {
  const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.FLICKR_KEY}&format=json&nojsoncallback=1&safe_search=1&tags=${searchTag}&media=photos`;
  const res = await fetch(url);
  const data: RootObject = await res.json();

  return `https://live.staticflickr.com/${data.photos.photo[0].server}/${data.photos.photo[0].id}_${data.photos.photo[0].secret}_w.jpg`;
};

export { flickrCall };
