import {Heading} from '@/components/common/elements/heading'

export const SettingsSection = ({heading, description, children}) => {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-3 gap-16">
      <div className="space-y-4">
        <h2><Heading>{heading}</Heading></h2>
        <p>{description}</p>
      </div>
      <div className="xl:col-span-2 space-y-8">
        {children}
      </div>
    </section>
  )
}