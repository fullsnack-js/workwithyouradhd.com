/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";
import Link from "next/link";
import ImagePortableComponent from "./image-portable-component"
export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      h5: ({ children }) => (
        <h5 className="mb-2 text-sm font-semibold">{children}</h5>
      ),
      h6: ({ children }) => (
        <h6 className="mb-1 text-xs font-semibold">{children}</h6>
      ),
    },
    marks: {
      internalLink: ({value, children}) => {
        const {slug = {}} = value
        const href = `/posts/${slug.current}`
        return <Link className="text-indigo-600 hover:text-indigo-700 text-decoration-underline" href={href}>{children}</Link>
      },
      link: ({ children, value }) => {
        const rel = !value?.href?.startsWith('/') ? 'noreferrer noopener' : undefined
        const targ = !value?.href?.startsWith('/') ? '_blank' : undefined
        return (
          !value?.href?.startsWith('/') ?
            <a href={value.href} rel={rel} target={targ} className="text-indigo-600 hover:text-indigo-700 text-decoration-underline" aria-label={`${children}`}>
              {children}
            </a> : <Link href={value.href} className="text-indigo-600 hover:text-indigo-700 text-decoration-underline">{children}</Link>
        )
    },
  },
  types: {
    image: ({ value }) => (<ImagePortableComponent value={value} />)
  }
}

  return (
    <div className={["prose", className].filter(Boolean).join(" ")}>
      <PortableText components={components} value={value} />
    </div>
  );
}
