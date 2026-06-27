import { Steps, Tabs } from 'nextra/components'

const Tab = Tabs.Tab
import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'

const docsComponents = getDocsMDXComponents()

export function useMDXComponents(components) {
  return {
    ...docsComponents,
    Steps,
    Tabs,
    Tab,
    ...components
  }
}
