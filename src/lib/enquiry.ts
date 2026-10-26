import { site } from '../data/site'

export interface Enquiry {
  name: string
  phone: string
  email: string
  location: string
  propertyType: string
  services: string[]
  budget: string
  description: string
}

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>

export const emptyEnquiry: Enquiry = {
  name: '',
  phone: '',
  email: '',
  location: '',
  propertyType: '',
  services: [],
  budget: '',
  description: '',
}

export const limits = { name: 80, email: 120, location: 80, description: 1000 } as const

export function normalisePhone(raw: string) {
  return raw.replace(/[\s\-().]/g, '')
}

export function validateEnquiry(e: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {}
  const name = e.name.trim()
  if (name.length < 2) errors.name = 'Please enter your full name.'
  else if (name.length > limits.name) errors.name = `Please keep your name under ${limits.name} characters.`

  const phone = normalisePhone(e.phone)
  const indian = /^(\+?91|0)?[6-9]\d{9}$/.test(phone)
  const intl = /^\+[1-9]\d{7,14}$/.test(phone)
  if (!phone) errors.phone = 'Please enter a phone number so we can reach you.'
  else if (!indian && !intl) errors.phone = 'Please enter a valid 10 digit mobile number.'

  const email = e.email.trim()
  if (email && (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > limits.email)) {
    errors.email = 'Please enter a valid email address, or leave it blank.'
  }

  if (e.location.trim().length < 2) errors.location = 'Please tell us where the project is.'
  else if (e.location.trim().length > limits.location) errors.location = 'Please shorten the location.'

  if (!e.propertyType) errors.propertyType = 'Please choose a property type.'
  if (e.services.length === 0) errors.services = 'Please choose at least one service.'
  if (!e.budget) errors.budget = 'Please choose an estimated budget.'
  if (e.description.trim().length > limits.description) {
    errors.description = `Please keep the description under ${limits.description} characters.`
  }
  return errors
}

export function buildEnquiryMessage(e: Enquiry) {
  const lines = [
    `Hello ${site.name}, I would like to book a consultation.`,
    '',
    `Name: ${e.name.trim()}`,
    `Phone: ${e.phone.trim()}`,
    e.email.trim() ? `Email: ${e.email.trim()}` : null,
    `Project location: ${e.location.trim()}`,
    `Property type: ${e.propertyType}`,
    `Required services: ${e.services.join(', ')}`,
    `Estimated budget: ${e.budget}`,
    e.description.trim() ? `Project details: ${e.description.trim()}` : null,
  ]
  return lines.filter((l) => l !== null).join('\n')
}

export function buildWhatsappUrl(e: Enquiry) {
  return `${site.whatsappUrl}?text=${encodeURIComponent(buildEnquiryMessage(e))}`
}
