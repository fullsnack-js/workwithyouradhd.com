import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
  _id,
  _createdAt,
  _updatedAt,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    }
  },
  "slug": slug.current,
  excerpt,
  isSeries,
  coverImage,
  meta_description,
  "tags": tags[]-> {title,slug},
  "series":series -> {title,slug},
  "category": categories[]-> {title,slug},
  "numberOfCharacters": length(pt::text(body)),
  "estimatedWordCount": round(length(pt::text(body)) / 5),
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
  "date": coalesce(date, _updatedAt),
  "author": author->{"name": coalesce(name, "Anonymous"), picture},
`;

export const heroQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
    _id,
    _createdAt,
    _updatedAt,
    "status": select(_originalId in path("drafts.**") => "draft", "published"),
    "title": coalesce(title, "Untitled"),
    body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    }
  },
    "slug": slug.current,
    excerpt,
    isSeries,
    coverImage,
    meta_description,
    "tags": tags[]-> {title,slug},
    "series":series -> {title,slug},
    "category": categories[]-> {title,slug},
    "numberOfCharacters": length(pt::text(body)),
    "estimatedWordCount": round(length(pt::text(body)) / 5),
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
    "date": coalesce(date, _updatedAt),
    "author": author->{"name": coalesce(name, "Anonymous"), picture},
      "mainImageWidth": mainImage.asset->metadata.dimensions.width,
      "mainImageHeight": mainImage.asset->metadata.dimensions.height
    }
`);

export const moreStoriesQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content,
    ${postFields}
  }
`);

export const getRelatedSeriesPostForSinglePostQuery = defineQuery(`
  *[_type == "post" && isSeries == true && series-> slug.current == $slug]{
    _id,
    createdAt,
    title,
    body,
    "date": coalesce(date, _updatedAt),
    "author": author->{"name": coalesce(name, "Anonymous"), picture},
     coverImage,
        slug,
        "tags": tags[]-> {title,slug},
        "category": categories[]-> {title,slug},
        "series":series-> {title,slug},
      
}[0..2]`);

export const getTagsQuery = defineQuery(`*[_type == "tags"]`);

export const getTagRelatedPostQuery = defineQuery(`
  *[_type == "post" && $slug in tags[]->slug.current]{
    _createdAt,
    "date": coalesce(date, _updatedAt),
    title,
    body,
   "author": author->{"name": coalesce(name, "Anonymous"), picture},
    meta_description,
    coverImage,
    slug,
    "tags": tags[]-> {title,slug},
    "category": categories[]-> {title,slug},
    "series":series-> {title,slug},
}`);

export const tagsPathsQuery = defineQuery(`
  *[_type == "tags" && defined(slug.current)][]{
    "params": { "slug": slug.current }
}`);

// ======================== Categories ================================
export const getCategoriesQuery = defineQuery(`*[_type == "category"] {
    _id,
    title,
    slug,
    meta_description,
    "date": coalesce(date, _updatedAt),
    "postCount": count(*[_type == "post" && references(^._id)]),
}`);

export const getCategoryRelatedPostQuery = defineQuery(`
  *[_type == "post" && $slug in categories[]->slug.current]{
      _createdAt,
    title,
    body,
    "author": author->{"name": coalesce(name, "Anonymous"), picture},
    meta_description,
    coverImage,
    slug,
    "tags": tags[]-> {title,slug},
    "category": categories[]-> {title,slug},
    "series":series-> {title,slug},
    "date": coalesce(date, _updatedAt),
}`);
