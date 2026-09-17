import {defineField, defineType} from 'sanity'

export const contactInfoType = defineType({
  name: 'contactInfo',
  title: 'Contact Info',
  type: 'document',
  fields: [
    defineField({
      name: 'prefix',
      title: 'Prefix',
      type: 'string',
      description: 'Optional title such as Dr.',
    }),
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'email',
    },
  },
})
