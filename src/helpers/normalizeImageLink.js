const normalizeImageLink = (imageLink) => {
  if (imageLink.match("base64")) {
    return imageLink;
  }
  return `https://api-factory.simbirsoft1.com${imageLink}`;
};

export default normalizeImageLink;