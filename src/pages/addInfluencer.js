import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function AddInfluencer({ data, location }) {
  const siteTitle = data.site.siteMetadata.title
  const [name, setName] = useState("")
  const [handle, setHandle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const tags = [
    "accessibility",
    "css",
    "gatsby",
    "html",
    "javascript",
    "frontend",
    "backend",
    "node",
    "react",
    "vue",
    "design",
  ]

  const toggleTag = (tag) => {
    const index = selectedTags.indexOf(tag)
    if (index === -1) {
      setSelectedTags((prevTags) => [...prevTags, tag])
    } else {
      setSelectedTags((prevTags) =>
        prevTags.filter((prevTag) => prevTag !== tag)
      )
    }
  }

  const clearInput = () => {
    setName("")
    setHandle("")
    setDescription("")
    setSelectedTags([])
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const postBody = { name, description, handle, tags: selectedTags }
    try {
      const res = await fetch("/.netlify/functions/addInfluencer", {
        method: "post",
        body: JSON.stringify(postBody),
      })
      console.log(res)
      clearInput()
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All Influencers" />
      <div>
        <h3>Add an Influencer</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="ex. James Quick"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="handle">Twitter Handle</label>
          <input
            type="text"
            name="name"
            placeholder="ex. @jamesqquick"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
          />
          <label htmlFor="handle">Description</label>
          <textarea
            name="name"
            placeholder="ex. What's so cool about this person?!"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="handle">Select Tags</label>
          <div className="tags-list">
            {tags.map((tag, index) => (
              <span
                className={
                  "tag" + (selectedTags.includes(tag) ? " selected" : "")
                }
                key={index}
                onClick={() => toggleTag(tag)}
                onKeyDown={() => toggleTag(tag)}
                role="button"
                tabIndex={0}
              >
                {tag}
              </span>
            ))}
          </div>
          <button>Submit</button>
        </form>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
