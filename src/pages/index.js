import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import "../styles/app.css"
import Layout from "../components/layout"
import SEO from "../components/seo"
import InfluencerStyles from "../styles/influencer.module.css"

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const influencers = data.allAirtable.nodes
  const [visibleInfluencers, setVisibleInfluencers] = useState([...influencers])
  const [allTags, setAllTags] = useState([])

  useEffect(() => {
    const tags = new Set()
    influencers.forEach((influencer) => {
      influencer.data.tags.forEach((tag) => tags.add(tag))
    })
    setAllTags(["all", ...Array.from(tags)])
  }, [influencers])

  const selectTag = (tag) => {
    if (tag === "all") {
      return setVisibleInfluencers([...influencers])
    }
    setVisibleInfluencers(
      influencers.filter((influencer) => influencer.data.tags.includes(tag))
    )
  }
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All Influencers" />

      <h1 className="title">Influencers</h1>
      <p className="subtitle">
        A list of developers on Twitter that you should follow!
      </p>
      {allTags.map((tag, id) => (
        <span
          className={InfluencerStyles.tag}
          key={id}
          onClick={() => selectTag(tag)}
          role="button"
          onKeyDown={() => selectTag(tag)}
          tabIndex={0}
        >
          {tag}
        </span>
      ))}
      <div className={InfluencerStyles.list}>
        {visibleInfluencers.map((node) => {
          return (
            <article
              key={node.recordId}
              className={InfluencerStyles.influencer}
            >
              <header>
                <h3 className={InfluencerStyles.name}>
                  <a
                    href={"https://www.twitter.com/" + node.data.handle}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {node.data.name}
                  </a>
                </h3>
                <p className={InfluencerStyles.handle}>@{node.data.handle}</p>
                <p className={InfluencerStyles.description}>
                  {node.data.description}
                </p>
                {node.data.tags.map((tag, index) => (
                  <small
                    className={InfluencerStyles.tag}
                    key={index}
                    onClick={() => selectTag(tag)}
                    role="button"
                    onKeyDown={() => selectTag(tag)}
                    tabIndex={0}
                  >
                    {tag}
                  </small>
                ))}
              </header>
            </article>
          )
        })}
      </div>
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allAirtable {
      nodes {
        recordId
        data {
          name
          handle
          tags
          description
        }
      }
    }
  }
`
