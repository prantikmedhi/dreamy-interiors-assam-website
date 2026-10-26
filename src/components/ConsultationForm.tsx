import { useEffect, useId, useRef, useState, type SubmitEvent, type ReactNode } from 'react'
import { budgetRanges, propertyTypes } from '../data/content'
import { services } from '../data/services'
import { site } from '../data/site'
import { buildWhatsappUrl, emptyEnquiry, limits, validateEnquiry, type Enquiry, type EnquiryErrors } from '../lib/enquiry'
import { Icon } from './Icon'

const fieldOrder: (keyof Enquiry)[] = ['name', 'phone', 'email', 'location', 'propertyType', 'services', 'budget', 'description']

// Validates locally and hands a structured message to WhatsApp. Nothing is stored or sent
// by this site: values live only in component memory until the visitor taps Send in WhatsApp.
export function ConsultationForm() {
  const uid = useId()
  const id = (k: string) => `${uid}-${k}`
  const [values, setValues] = useState<Enquiry>(emptyEnquiry)
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [waUrl, setWaUrl] = useState<string | null>(null)
  const confirmRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (waUrl) confirmRef.current?.focus()
  }, [waUrl])

  const update = <K extends keyof Enquiry>(key: K, value: Enquiry[K]) => {
    const next = { ...values, [key]: value }
    setValues(next)
    if (submitted) setErrors(validateEnquiry(next))
  }

  const toggleService = (title: string) =>
    update('services', values.services.includes(title) ? values.services.filter((s) => s !== title) : [...values.services, title])

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const found = validateEnquiry(values)
    setErrors(found)
    const first = fieldOrder.find((k) => found[k])
    if (first) {
      const target = document.getElementById(id(first)) as HTMLElement | null
      ;(target?.matches('fieldset') ? target.querySelector('input') : target)?.focus()
      return
    }
    const url = buildWhatsappUrl(values)
    setWaUrl(url)
    // Opened inside the submit gesture so it is not treated as an unsolicited popup.
    // The confirmation panel always offers a manual link in case the browser blocks it.
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const errorCount = Object.keys(errors).length

  if (waUrl) {
    return (
      <div className="border border-champagne/40 p-7 sm:p-10" role="status" aria-live="polite">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne text-champagne">
          <Icon name="check" size={22} />
        </span>
        <h3 ref={confirmRef} tabIndex={-1} className="display mt-6 text-[2.2rem] text-ivory outline-none">
          Your enquiry is ready.
        </h3>
        <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ivory/75">
          We have prepared your message in WhatsApp. It has not been sent yet: please review it in WhatsApp and tap <strong className="text-ivory">Send</strong> to
          share it with our studio.
        </p>
        <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ivory/70">If WhatsApp did not open, continue with the button below.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            Continue on WhatsApp <Icon name="whatsapp" size={18} />
          </a>
          <button type="button" className="btn btn-ghost-light" onClick={() => setWaUrl(null)}>
            Edit enquiry
          </button>
        </div>
        <p className="mt-8 text-[13px] text-ivory/70">
          Prefer to talk? Call <a href={`tel:${site.phoneE164}`} className="underline underline-offset-4 hover:text-champagne">{site.phoneDisplay}</a>
        </p>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby={`${id('note')}`} className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
      {submitted && errorCount > 0 && (
        <p role="alert" className="border-l-2 border-[#e3a08a] pl-4 text-[14px] text-ivory sm:col-span-2">
          Please check the {errorCount === 1 ? 'highlighted field' : `${errorCount} highlighted fields`} below.
        </p>
      )}

      <Field label="Full Name" htmlFor={id('name')} error={errors.name} errorId={id('name-err')}>
        <input
          id={id('name')}
          className="field"
          autoComplete="name"
          maxLength={limits.name}
          value={values.name}
          onChange={(e) => update('name', e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? id('name-err') : undefined}
          required
        />
      </Field>

      <Field label="Phone" htmlFor={id('phone')} error={errors.phone} errorId={id('phone-err')}>
        <input
          id={id('phone')}
          className="field"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+91"
          maxLength={20}
          value={values.phone}
          onChange={(e) => update('phone', e.target.value)}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? id('phone-err') : undefined}
          required
        />
      </Field>

      <Field label="Email" optional htmlFor={id('email')} error={errors.email} errorId={id('email-err')}>
        <input
          id={id('email')}
          className="field"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={limits.email}
          value={values.email}
          onChange={(e) => update('email', e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? id('email-err') : undefined}
        />
      </Field>

      <Field label="Project Location" htmlFor={id('location')} error={errors.location} errorId={id('location-err')}>
        <input
          id={id('location')}
          className="field"
          list={id('cities')}
          autoComplete="address-level2"
          placeholder="Guwahati, Nagaon, Tezpur…"
          maxLength={limits.location}
          value={values.location}
          onChange={(e) => update('location', e.target.value)}
          aria-invalid={!!errors.location}
          aria-describedby={errors.location ? id('location-err') : undefined}
          required
        />
        <datalist id={id('cities')}>
          {site.cities.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </Field>

      <fieldset id={id('propertyType')} className="sm:col-span-2" aria-describedby={errors.propertyType ? id('propertyType-err') : undefined}>
        <legend className="field-label">Property Type</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {propertyTypes.map((t) => (
            <label key={t} className="relative">
              <input
                type="radio"
                name="propertyType"
                value={t}
                checked={values.propertyType === t}
                onChange={() => update('propertyType', t)}
                className="peer sr-only"
                aria-invalid={!!errors.propertyType}
              />
              <span className="flex h-12 cursor-pointer items-center justify-center border border-ivory/25 text-[13px] font-semibold tracking-[0.12em] text-ivory/80 transition-colors hover:border-ivory/60 peer-checked:border-champagne peer-checked:bg-champagne peer-checked:text-charcoal peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold">
                {t}
              </span>
            </label>
          ))}
        </div>
        <ErrorText id={id('propertyType-err')} error={errors.propertyType} />
      </fieldset>

      <fieldset id={id('services')} className="sm:col-span-2" aria-describedby={errors.services ? id('services-err') : undefined}>
        <legend className="field-label">Required Services</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {[...services.map((s) => s.title), 'Not sure yet'].map((title) => (
            <label key={title} className="relative">
              <input
                type="checkbox"
                checked={values.services.includes(title)}
                onChange={() => toggleService(title)}
                className="peer sr-only"
                aria-invalid={!!errors.services}
              />
              <span className="flex min-h-11 cursor-pointer items-center gap-2 border border-ivory/25 px-4 py-2 text-[13.5px] text-ivory/80 transition-colors hover:border-ivory/60 peer-checked:border-champagne peer-checked:text-ivory peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold [&>svg]:hidden peer-checked:[&>svg]:block">
                <Icon name="check" size={16} className="text-champagne" />
                {title}
              </span>
            </label>
          ))}
        </div>
        <ErrorText id={id('services-err')} error={errors.services} />
      </fieldset>

      <Field label="Estimated Budget" htmlFor={id('budget')} error={errors.budget} errorId={id('budget-err')}>
        <select
          id={id('budget')}
          className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%228%22 fill=%22none%22 stroke=%22%23D8C5A5%22><path d=%22m1 1 6 6 6-6%22/></svg>')] bg-[length:14px_8px] bg-[right_4px_center] bg-no-repeat pr-8 [&>option]:bg-charcoal"
          value={values.budget}
          onChange={(e) => update('budget', e.target.value)}
          aria-invalid={!!errors.budget}
          aria-describedby={errors.budget ? id('budget-err') : undefined}
          required
        >
          <option value="" disabled>
            Select a range
          </option>
          {budgetRanges.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </Field>

      <div className="hidden sm:block" aria-hidden="true" />

      <Field label="Project Description" optional htmlFor={id('description')} error={errors.description} errorId={id('description-err')} wide>
        <textarea
          id={id('description')}
          className="field min-h-28 resize-y"
          rows={4}
          maxLength={limits.description}
          placeholder="Rooms, timelines, style preferences or anything else we should know."
          value={values.description}
          onChange={(e) => update('description', e.target.value)}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? id('description-err') : undefined}
        />
      </Field>

      <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p id={id('note')} className="max-w-sm text-[13px] leading-relaxed text-ivory/70">
          Your details are not stored on this website. Submitting prepares a WhatsApp message you can review before sending.
        </p>
        <button type="submit" className="btn btn-gold">
          Request a Consultation <Icon name="whatsapp" size={18} />
        </button>
      </div>
    </form>
  )
}

function Field(props: { label: string; htmlFor: string; error?: string; errorId: string; optional?: boolean; wide?: boolean; children: ReactNode }) {
  return (
    <div className={props.wide ? 'sm:col-span-2' : ''}>
      <label htmlFor={props.htmlFor} className="field-label">
        {props.label}
        {props.optional && <span className="ml-2 font-normal normal-case tracking-normal text-ivory/70">Optional</span>}
      </label>
      {props.children}
      <ErrorText id={props.errorId} error={props.error} />
    </div>
  )
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  if (!error) return null
  return (
    <p id={id} className="mt-2 text-[13px] text-[#f0b9a6]">
      {error}
    </p>
  )
}

export function ConsultationSection({ id = 'consultation', headingLevel = 'h2' }: { id?: string; headingLevel?: 'h1' | 'h2' }) {
  const H = headingLevel
  return (
    <section id={id} className="scroll-mt-20 bg-charcoal py-24 text-ivory lg:py-36">
      <div className="wrap grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="eyebrow text-champagne">Book a Consultation</p>
          <H className="display mt-6 text-[2.6rem] sm:text-[3.4rem] lg:text-[4.1rem]">Let’s Create a Space You’ll Love Coming Home To.</H>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ivory/75">
            Share a few details about your home and what you have in mind. We will get back to you to plan a consultation around your space, your
            style and your budget.
          </p>
          <div className="mt-12 hidden lg:block">
            <ContactLinesCompact />
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ConsultationForm />
        </div>
        <div className="lg:hidden">
          <ContactLinesCompact />
        </div>
      </div>
    </section>
  )
}

function ContactLinesCompact() {
  return (
    <ul className="space-y-4 border-t border-ivory/15 pt-8 text-[15px] text-ivory/80">
      <li>
        <a href={`tel:${site.phoneE164}`} className="inline-flex items-center gap-3 hover:text-champagne">
          <Icon name="phone" size={18} className="text-champagne" /> {site.phoneDisplay}
        </a>
      </li>
      <li>
        <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-champagne">
          <Icon name="whatsapp" size={18} className="text-champagne" /> WhatsApp the studio
        </a>
      </li>
      <li className="inline-flex items-center gap-3">
        <Icon name="pin" size={18} className="text-champagne" /> {site.cities.join(' · ')}
      </li>
    </ul>
  )
}
