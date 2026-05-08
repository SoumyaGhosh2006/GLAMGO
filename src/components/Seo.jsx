import { Helmet } from "react-helmet-async";
import { absoluteUrl, canonicalUrl, siteMeta } from "../config/site";

function Seo({
  title = siteMeta.title,
  description = siteMeta.description,
  path = "/",
  image = siteMeta.image,
  type = "website",
  noindex = false,
  children,
}) {
  const resolvedTitle = title.includes("GLAMGO")
    ? title
    : `${title} | GLAMGO`;
  const resolvedUrl = canonicalUrl(path);
  const resolvedImage = absoluteUrl(image);

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={siteMeta.name} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : null}

      <link rel="canonical" href={resolvedUrl} />

      <meta property="og:site_name" content={siteMeta.name} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={resolvedUrl} />
      <meta property="og:image" content={resolvedImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />

      {children}
    </Helmet>
  );
}

export default Seo;
