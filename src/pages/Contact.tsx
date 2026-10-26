import { ConsultationSection } from '../components/ConsultationForm'
import { PageHero } from '../components/PageHero'
import { ContactLines, LocationCards } from '../components/sections'
import { ButtonLink, SectionHeading } from '../components/ui'
import { site, whatsappLink } from '../data/site'

export default function Contact() {
  return (
    <>
      <PageHero
        image="bedroom"
        eyebrow="Contact"
        title="Let’s talk about your home."
        intro={`Call or WhatsApp ${site.phoneDisplay}, or send a consultation enquiry below. We serve homeowners in Guwahati, Nagaon and Tezpur.`}
      >
        <ButtonLink to={`tel:${site.phoneE164}`} variant="gold" icon="phone">Call the Studio</ButtonLink>
        <ButtonLink to={whatsappLink()} variant="ghost-light" icon="whatsapp">WhatsApp Us</ButtonLink>
      </PageHero>

      <section className="py-24 lg:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Reach us directly"
              title="Speak with the founders."
              intro="For the quickest response, call or message us on WhatsApp. You can also follow our work on Instagram."
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ContactLines />
          </div>
        </div>
      </section>

      <ConsultationSection />

      <section className="py-24 lg:py-32" aria-labelledby="areas-title">
        <div className="wrap">
          <SectionHeading
            eyebrow="Service Locations"
            title={<span id="areas-title">Where we work.</span>}
            intro="We design and execute homes across these cities in Assam. Consultations are arranged by appointment."
          />
          <div className="mt-14">
            <LocationCards />
          </div>
        </div>
      </section>
    </>
  )
}
