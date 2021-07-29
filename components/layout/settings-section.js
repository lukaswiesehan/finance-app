import {Heading} from '@/components/elements/heading'

export const SettingsSection = ({heading, description, children}) => {
  return (
    <section className="grid grid-cols-4 gap-16">
      <div className="space-y-4">
        <h2><Heading>{heading}</Heading></h2>
        <p>{description}</p>
      </div>
      <div className="col-span-3 space-y-8">
        {children}
      </div>
    </section>
  )
}