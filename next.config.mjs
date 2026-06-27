import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true
})

export default withNextra({
  turbopack: {
    resolveAlias: {
      // Required: lets Turbopack resolve Nextra's virtual MDX module.
      'next-mdx-import-source-file': './mdx-components.jsx'
    }
  }
})
