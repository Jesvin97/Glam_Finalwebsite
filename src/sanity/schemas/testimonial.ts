import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "username",
      title: "Username (Handle)",
      type: "string",
      description: "e.g. aiswarya.nair (no need to include @)",
    }),
    defineField({
      name: "role",
      title: "Role / Tag",
      type: "string",
      description: "e.g. Bridal Client, Regular Client, Premium Member",
    }),
    defineField({
      name: "avatar",
      title: "Client Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Testimonial text",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
