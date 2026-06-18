import { Steps } from 'nextra/components'
import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'

const docsComponents = getDocsMDXComponents()

export function useMDXComponents(components) {
  return {
    ...docsComponents,
    Steps,
    ...components
  }
}
