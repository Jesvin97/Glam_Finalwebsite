import { defineType, defineField } from "sanity";

export default defineType({
  name: "feedbackPhoto",
  title: "Customer Feedback Photo",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Short description, e.g. \"Bridal makeup for Anjali\". Also used as the image alt text.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
  preview: {
    select: { title: "caption", media: "image" },
  },
});
