import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

type SEOProps = {
  title: string
  description?: string
  image?: string
  og_title?: string
  og_description?: string
  og_image?: string
}

const SEO: FC<SEOProps> = ({
  title,
  description,
  image,
  og_title,
  og_description,
  og_image,
  children
}) => {
  return (
    <>
      <Helmet title={title} titleTemplate="%s">
        <meta name="description" content={description} />
        {image && <meta name="image" content={image} />}
        {og_title && <meta property="og:title" content={og_title} />}
        {og_description && (
          <meta property="og:description" content={og_description} />
        )}
        {og_image && <meta property="og:image" content={og_image} />}
        <meta name="twitter:card" content="summary_large_image" />
        {og_title && <meta name="twitter:title" content={og_title} />}
        {og_description && (
          <meta name="twitter:description" content={og_description} />
        )}
        {og_image && <meta name="twitter:image" content={og_image} />}
        {children}
      </Helmet>
    </>
  )
}

export default SEO
