export const redirectionHandler = ({ redirectionMethod, url }) => {
  if (redirectionMethod === "same-tab") {
    window.location.href = url;
  } else {
    window.open(url, "_blank");
  }
};
